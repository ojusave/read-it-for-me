<script lang="ts">
  /** Single digest item card with read/skim/skip badge and source link. */
  import type { ItemAnalysis } from "../lib/api";
  import { isHttpUrl, urlHostname } from "../lib/urls";

  let { card }: { card: ItemAnalysis } = $props();

  const sourceUrl = $derived(isHttpUrl(card.sourceLabel) ? card.sourceLabel : null);
  const sourceDisplay = $derived(
    sourceUrl ? urlHostname(sourceUrl) : card.sourceLabel
  );

  const badgeClass = $derived(
    card.worthReading === "read"
      ? "badge badge-read"
      : card.worthReading === "skim"
        ? "badge badge-skim"
        : "badge badge-skip"
  );
</script>

<article class="card">
  <span class={badgeClass}>{card.worthReading}</span>
  <h3>
    {#if sourceUrl}
      <a class="card-link" href={sourceUrl} target="_blank" rel="noopener noreferrer">
        {card.title}
      </a>
    {:else}
      {card.title}
    {/if}
  </h3>
  <p class="source">
    {#if sourceUrl}
      <a class="card-link muted" href={sourceUrl} target="_blank" rel="noopener noreferrer">
        {sourceDisplay}
      </a>
    {:else}
      {card.sourceLabel}
    {/if}
  </p>
  <dl>
    <div>
      <dt>What changed?</dt>
      <dd>{card.whatChanged}</dd>
    </div>
    <div>
      <dt>Why care?</dt>
      <dd>{card.whyCare}</dd>
    </div>
    <div>
      <dt>What to do</dt>
      <dd>{card.whatToDo}</dd>
    </div>
    <div>
      <dt>Worth reading?</dt>
      <dd>{card.worthReason}</dd>
    </div>
  </dl>
</article>
