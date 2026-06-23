/** Shared digest types used by server, workflow, and frontend. */

export type DigestItemInput =
  | { kind: "url"; value: string }
  | { kind: "text"; value: string }
  | { kind: "pdf"; filename: string; base64: string };

export type ItemAnalysis = {
  title: string;
  sourceLabel: string;
  whatChanged: string;
  whyCare: string;
  whatToDo: string;
  worthReading: "read" | "skim" | "skip";
  worthReason: string;
};

export type DigestSummary = {
  headline: string;
  doToday: string[];
  readNow: string[];
  skip: string[];
};

export type DigestResult = {
  runId: number;
  focus: string;
  items: ItemAnalysis[];
  summary: DigestSummary;
};

export type SseStatusPayload = {
  phase: string;
  message: string;
  index?: number;
  total?: number;
};

export type SseCardPayload = ItemAnalysis & { index: number };

export type SseDonePayload = DigestResult;

export type SseErrorPayload = { message: string };
