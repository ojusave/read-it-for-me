import Together from "together-ai";
import { z } from "zod";

const model = process.env.TOGETHER_MODEL || "meta-llama/Llama-3.3-70B-Instruct-Turbo";

let client: Together | null = null;

function getClient(): Together {
  const key = process.env.TOGETHER_API_KEY?.trim();
  if (!key) throw new Error("TOGETHER_API_KEY is not set");
  if (!client) client = new Together({ apiKey: key });
  return client;
}

export async function chatJson<T>(system: string, user: string, schema: z.ZodType<T>): Promise<T> {
  const response = await getClient().chat.completions.create({
    model,
    messages: [
      { role: "system", content: system },
      { role: "user", content: user },
    ],
    response_format: { type: "json_object" },
    temperature: 0.2,
    max_tokens: 1200,
  });

  const raw = response.choices[0]?.message?.content ?? "{}";
  let parsed: unknown;
  try {
    parsed = JSON.parse(raw);
  } catch {
    throw new Error("Together AI returned invalid JSON");
  }
  return schema.parse(parsed);
}

export function excerpt(text: string, max = 12000): string {
  if (text.length <= max) return text;
  return `${text.slice(0, max)}\n\n[truncated]`;
}
