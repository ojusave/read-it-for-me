<script lang="ts">
  /** Footer with GitHub repo link and Sign up on Render (UTM-tagged). */
  let {
    signupUrl,
    githubRepo,
  }: {
    signupUrl: string;
    githubRepo: string;
  } = $props();
</script>

<footer class="site-footer">
  <div class="footer-inner">
    <a class="footer-link" href={githubRepo} target="_blank" rel="noopener noreferrer">
      GitHub repository
    </a>
    <a class="footer-link" href={signupUrl} target="_blank" rel="noopener noreferrer">
      Sign up on Render
    </a>
  </div>
</footer>
