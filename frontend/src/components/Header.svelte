<script lang="ts">
  import DeployToRenderButton from "./DeployToRenderButton.svelte";

  let {
    signupUrl,
    deployUrl,
  }: {
    signupUrl: string;
    deployUrl: string;
  } = $props();
</script>

<header class="site-header shell">
  <a href="/" class="brand">
    <img src="https://render.com/icon.svg" alt="" width="22" height="22" />
    <span>Read It For Me</span>
  </a>

  <nav class="nav">
    <DeployToRenderButton {deployUrl} />
    <a class="nav-link" href={signupUrl} target="_blank" rel="noopener noreferrer">
      Sign up on Render
    </a>
  </nav>
</header>
