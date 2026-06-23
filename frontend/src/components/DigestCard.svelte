<script lang="ts">
  import type { ItemAnalysis } from "../lib/api";

  let { card }: { card: ItemAnalysis } = $props();

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
  <h3>{card.title}</h3>
  <p class="source">{card.sourceLabel}</p>
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
