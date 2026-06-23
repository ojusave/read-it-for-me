import { task } from "@renderinc/sdk/workflows";
import { z } from "zod";
import type { DigestSummary, ItemAnalysis } from "../../shared/types.js";
import { chatJson } from "../lib/together.js";

const summarySchema = z.object({
  headline: z.string(),
  doToday: z.array(z.string()),
  readNow: z.array(z.string()),
  skip: z.array(z.string()),
});

const SYSTEM = `You write the top-of-digest summary for a personal reading queue.
Return JSON only: headline, doToday (array), readNow (array), skip (array).
Use short actionable strings. Reference item titles where helpful.`;

/** Synthesize the overall digest summary from per-item analyses. */
export const synthesizeDigest = task(
  {
    name: "synthesize_digest",
    plan: "starter",
    timeoutSeconds: 120,
    retry: { maxRetries: 2, waitDurationMs: 3000, backoffScaling: 2 },
  },
  async function synthesizeDigest(
    items: ItemAnalysis[],
    focus: string
  ): Promise<DigestSummary> {
    const focusLine = focus.trim() ? `User focus: ${focus.trim()}\n` : "";
    const user = `${focusLine}Items:\n${JSON.stringify(items, null, 2)}

Write a headline plus three lists: doToday, readNow, skip.`;

    return chatJson(SYSTEM, user, summarySchema);
  }
);
