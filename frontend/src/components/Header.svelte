<script lang="ts">
  let {
    signupUrl,
    deployUrl,
  }: {
    signupUrl: string;
    deployUrl: string;
  } = $props();
</script>

<header class="shell" style="padding: 1rem 0; border-bottom: 1px solid rgba(255,255,255,0.08);">
  <div style="display:flex; align-items:center; justify-content:space-between; gap:1rem; flex-wrap:wrap;">
    <div style="display:flex; align-items:center; gap:0.625rem;">
      <img src="https://render.com/icon.svg" alt="" width="24" height="24" />
      <strong>Read It For Me</strong>
    </div>
    <nav style="display:flex; gap:0.875rem; flex-wrap:wrap; font-size:0.875rem;">
      <a href={deployUrl} target="_blank" rel="noopener noreferrer">Deploy</a>
      <a href={signupUrl} target="_blank" rel="noopener noreferrer">Sign up on Render</a>
    </nav>
  </div>
</header>
