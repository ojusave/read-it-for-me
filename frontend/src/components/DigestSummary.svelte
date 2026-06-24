<script lang="ts">
  import type { DigestResult } from "../lib/api";

  let { result }: { result: DigestResult } = $props();
</script>

<section class="summary">
  <h2>{result.summary.headline}</h2>

  {#if result.summary.doToday.length}
    <h3>Do today</h3>
    <ul>
      {#each result.summary.doToday as item}
        <li>{item}</li>
      {/each}
    </ul>
  {/if}

  {#if result.summary.readNow.length}
    <h3>Read now</h3>
    <ul>
      {#each result.summary.readNow as item}
        <li>{item}</li>
      {/each}
    </ul>
  {/if}

  {#if result.summary.skip.length}
    <h3>Skip</h3>
    <ul>
      {#each result.summary.skip as item}
        <li>{item}</li>
      {/each}
    </ul>
  {/if}
</section>
