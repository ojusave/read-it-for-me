import { task } from "@renderinc/sdk/workflows";
import { z } from "zod";
import type { ItemAnalysis } from "../../shared/types.js";
import { chatJson, excerpt } from "../lib/together.js";

const analysisSchema = z.object({
  title: z.string(),
  whatChanged: z.string(),
  whyCare: z.string(),
  whatToDo: z.string(),
  worthReading: z.enum(["read", "skim", "skip"]),
  worthReason: z.string(),
});

const SYSTEM = `You analyze one reading item for a personal daily digest.
Return JSON only with keys: title, whatChanged, whyCare, whatToDo, worthReading, worthReason.
worthReading must be "read", "skim", or "skip".
Be specific and practical. No hype.`;

/** Analyze one item with Together AI (four digest questions). */
export const analyzeItem = task(
  {
    name: "analyze_item",
    plan: "standard",
    timeoutSeconds: 180,
    retry: { maxRetries: 2, waitDurationMs: 5000, backoffScaling: 2 },
  },
  async function analyzeItem(
    title: string,
    sourceLabel: string,
    text: string,
    focus: string,
    priorSummary: ItemAnalysis | null,
    contentChanged: boolean
  ): Promise<ItemAnalysis> {
    const priorBlock = priorSummary
      ? `\nPrior digest for this source:\n${JSON.stringify(priorSummary, null, 2)}\nContent changed since last run: ${contentChanged}`
      : "\nNo prior digest for this source.";

    const focusBlock = focus.trim()
      ? `\nUser focus this week: ${focus.trim()}`
      : "";

    const user = `Title: ${title}
Source: ${sourceLabel}
${focusBlock}
${priorBlock}

Content:
${excerpt(text, 8000)}

Answer:
1) What changed? (say "First time seeing this" if no prior)
2) Why should I care?
3) What should I do with this?
4) Is this worth reading fully? (read / skim / skip + brief reason)`;

    const parsed = await chatJson(SYSTEM, user, analysisSchema);

    return {
      title: parsed.title || title,
      sourceLabel,
      whatChanged: parsed.whatChanged,
      whyCare: parsed.whyCare,
      whatToDo: parsed.whatToDo,
      worthReading: parsed.worthReading,
      worthReason: parsed.worthReason,
    };
  }
);
