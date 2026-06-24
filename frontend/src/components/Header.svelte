<script lang="ts">
  import DeployToRenderButton from "./DeployToRenderButton.svelte";
  import GitHubIcon from "./GitHubIcon.svelte";

  let {
    deployUrl,
    githubRepo,
  }: {
    deployUrl: string;
    githubRepo: string;
  } = $props();
</script>

<header class="site-header">
  <div class="header-inner">
    <a href="/" class="brand">
      <img src="https://render.com/icon.svg" alt="" width="20" height="20" />
      <span>Read It For Me</span>
    </a>

    <nav class="nav">
      <DeployToRenderButton {deployUrl} />
      <a
        class="github-link"
        href={githubRepo}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="GitHub repository"
      >
        <GitHubIcon size={22} />
      </a>
    </nav>
  </div>
</header>
