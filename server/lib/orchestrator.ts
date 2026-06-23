import crypto from "node:crypto";
import { Render } from "@renderinc/sdk";
import type {
  DigestItemInput,
  DigestResult,
  DigestSummary,
  ItemAnalysis,
} from "../../shared/types.js";
import { createRun, getPriorSnapshot, saveRun } from "./db.js";

const WORKFLOW_SLUG = process.env.WORKFLOW_SLUG || "read-it-for-me-workflow";
const POLL_MS = parseInt(process.env.POLL_INTERVAL_MS || "3000", 10);

let render: Render | null = null;

function getRender(): Render {
  if (!render) render = new Render();
  return render;
}

function hashText(text: string): string {
  return crypto.createHash("sha256").update(text).digest("hex");
}

function sourceKeyForItem(item: DigestItemInput, index: number): string {
  if (item.kind === "url") return `url:${item.value}`;
  if (item.kind === "text") return `text:${hashText(item.value).slice(0, 16)}`;
  return `pdf:${item.filename}:${index}`;
}

async function runTask<T>(path: string, args: unknown[]): Promise<T> {
  const started = await getRender().workflows.startTask(`${WORKFLOW_SLUG}/${path}`, args);
  while (true) {
    await new Promise((r) => setTimeout(r, POLL_MS));
    const details = await getRender().workflows.getTaskRun(started.taskRunId);
    if (details.status === "completed") {
      return (details.results?.[0] ?? null) as T;
    }
    if (details.status === "failed" || details.status === "canceled") {
      throw new Error(details.error ?? `Task ${path} failed`);
    }
  }
}

export async function* runDigest(
  items: DigestItemInput[],
  focus: string
): AsyncGenerator<{ event: string; data: unknown }> {
  const runId = await createRun(focus);
  const total = items.length;
  const analyses: ItemAnalysis[] = [];
  const sourceKeys: string[] = [];
  const contentHashes: string[] = [];

  yield {
    event: "status",
    data: { phase: "start", message: `Processing ${total} item(s)...`, total },
  };

  for (let i = 0; i < items.length; i++) {
    const item = items[i];
    const sourceKey = sourceKeyForItem(item, i);
    sourceKeys.push(sourceKey);

    yield {
      event: "status",
      data: {
        phase: "fetch",
        message: `Fetching item ${i + 1} of ${total}...`,
        index: i,
        total,
      },
    };

    const fetched = await runTask<{ title: string; text: string; sourceLabel: string }>(
      "fetch_item",
      [item]
    );
    const contentHash = hashText(fetched.text);
    contentHashes.push(contentHash);

    const prior = await getPriorSnapshot(sourceKey);

    yield {
      event: "status",
      data: {
        phase: "analyze",
        message: `Analyzing item ${i + 1}...`,
        index: i,
        total,
      },
    };

    const analyzed = await runTask<ItemAnalysis>("analyze_item", [
      fetched.title,
      fetched.sourceLabel,
      fetched.text,
      focus,
      prior?.summary ?? null,
      prior ? contentHash !== prior.contentHash : false,
    ]);

    analyses.push(analyzed);

    yield { event: "card", data: { ...analyzed, index: i } };
  }

  yield {
    event: "status",
    data: { phase: "synthesize", message: "Building your digest summary..." },
  };

  const summary = await runTask<DigestSummary>("synthesize_digest", [analyses, focus]);

  await saveRun(runId, analyses, sourceKeys, contentHashes, summary);

  const result: DigestResult = { runId, focus, items: analyses, summary };
  yield { event: "done", data: result };
}
