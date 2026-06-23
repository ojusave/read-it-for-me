<script lang="ts">
  import type { DigestResult } from "../lib/api";

  let { result }: { result: DigestResult } = $props();
</script>

<section class="panel summary">
  <h2>{result.summary.headline}</h2>

  {#if result.summary.doToday.length}
    <h3 style="font-size:0.875rem; margin:0 0 0.375rem;">Do today</h3>
    <ul>
      {#each result.summary.doToday as item}
        <li>{item}</li>
      {/each}
    </ul>
  {/if}

  {#if result.summary.readNow.length}
    <h3 style="font-size:0.875rem; margin:0 0 0.375rem;">Read now</h3>
    <ul>
      {#each result.summary.readNow as item}
        <li>{item}</li>
      {/each}
    </ul>
  {/if}

  {#if result.summary.skip.length}
    <h3 style="font-size:0.875rem; margin:0 0 0.375rem;">Skip</h3>
    <ul>
      {#each result.summary.skip as item}
        <li>{item}</li>
      {/each}
    </ul>
  {/if}
</section>
