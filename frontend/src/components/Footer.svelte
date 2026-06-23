<script lang="ts">
  let {
    githubRepo,
    signupUrl,
  }: {
    githubRepo: string;
    signupUrl: string;
  } = $props();
</script>

<footer class="shell">
  <a href={githubRepo} target="_blank" rel="noopener noreferrer">GitHub repository</a>
  <a href={signupUrl} target="_blank" rel="noopener noreferrer">Sign up on Render</a>
  <a href="https://render.com/docs" target="_blank" rel="noopener noreferrer">Docs</a>
</footer>
