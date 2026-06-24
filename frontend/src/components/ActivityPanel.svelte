<script lang="ts">
  import type { SseActivityPayload, SseProgressPayload } from "../../../shared/types";

  let {
    activities,
    progress,
    headline,
  }: {
    activities: SseActivityPayload[];
    progress: SseProgressPayload | null;
    headline: string;
  } = $props();

  let logEl = $state<HTMLElement | null>(null);

  $effect(() => {
    activities.length;
    progress;
    logEl?.scrollTo({ top: logEl.scrollHeight, behavior: "smooth" });
  });
</script>

<section class="activity-panel" aria-live="polite">
  <div class="activity-head">
    <span class="pulse" aria-hidden="true"></span>
    <strong>{headline || "Working…"}</strong>
    {#if progress}
      <span class="elapsed">{progress.elapsedSec}s</span>
    {/if}
  </div>

  {#if progress}
    <p class="activity-progress">{progress.message}</p>
  {/if}

  <ol class="activity-log" bind:this={logEl}>
    {#each activities as entry (entry.id)}
      <li class="activity-line" class:success={entry.kind === "success"} class:wait={entry.kind === "wait"}>
        {entry.message}
      </li>
    {/each}
  </ol>
</section>
