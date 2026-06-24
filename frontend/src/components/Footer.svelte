<script lang="ts">
  let { signupUrl }: { signupUrl: string } = $props();
</script>

<footer class="site-footer">
  <div class="footer-inner">
    <a class="footer-link" href={signupUrl} target="_blank" rel="noopener noreferrer">
      Sign up on Render
    </a>
  </div>
</footer>
