/** URL helpers for linking digest cards and summary lines to sources. */
import type { ItemAnalysis } from "./api";

export function isHttpUrl(value: string): boolean {
  return /^https?:\/\//i.test(value.trim());
}

export function urlHostname(url: string): string {
  try {
    return new URL(url).hostname.replace(/^www\./, "");
  } catch {
    return url;
  }
}

/** Match a summary line to an item's source URL when possible. */
export function findItemUrl(items: ItemAnalysis[], label: string): string | null {
  const normalized = label.trim().toLowerCase();
  if (!normalized) return null;

  for (const item of items) {
    if (!isHttpUrl(item.sourceLabel)) continue;
    const title = item.title.trim().toLowerCase();
    if (title === normalized || normalized.includes(title) || title.includes(normalized)) {
      return item.sourceLabel;
    }
  }

  return null;
}
