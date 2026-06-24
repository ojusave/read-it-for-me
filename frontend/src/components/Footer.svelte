<script lang="ts">
  let { githubRepo }: { githubRepo: string } = $props();
</script>

<footer class="site-footer shell">
  <a href={githubRepo} target="_blank" rel="noopener noreferrer">GitHub repository</a>
  <span class="credit">
    Powered by
    <a href="https://together.ai" target="_blank" rel="noopener noreferrer">Together AI</a>
  </span>
</footer>
