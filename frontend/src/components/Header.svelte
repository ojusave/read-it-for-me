<script lang="ts">
  import DeployToRenderButton from "./DeployToRenderButton.svelte";

  let {
    signupUrl,
    deployUrl,
    githubRepo,
  }: {
    signupUrl: string;
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
      <a class="nav-link" href={signupUrl} target="_blank" rel="noopener noreferrer">
        Sign up on Render
      </a>
      <a
        class="nav-icon"
        href={githubRepo}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="GitHub repository"
      >
        <svg width="20" height="20" viewBox="0 0 15 15" fill="currentColor" aria-hidden="true">
          <path
            d="M7.49933 0.25C3.49635 0.25 0.25 3.49593 0.25 7.50024C0.25 10.703 2.32715 13.4206 5.2081 14.3797C5.57084 14.459 5.70302 14.2082 5.70302 13.9926C5.70302 13.7869 5.69625 13.093 5.69323 12.5403C3.67651 13.027 3.25112 11.7188 3.25112 11.7188C2.92221 10.8984 2.42303 10.6688 2.42303 10.6688C1.69637 10.1681 2.47842 10.1778 2.47842 10.1778C3.28153 10.2172 3.70403 10.9905 3.70403 10.9905C4.41552 12.145 5.51397 11.8118 5.71665 11.6163C5.98209 11.163 6.49268 10.6471 7.49933 10.6471C8.50598 10.6471 9.01757 11.163 9.28101 11.6163C9.48369 11.8118 10.5821 12.145 11.2936 10.9905C11.2936 10.9905 11.7161 10.2172 12.5192 10.1778C12.5192 10.1778 13.3013 10.1681 12.5746 10.6688C12.5746 10.6688 12.0754 10.8984 11.7465 11.7188C11.7465 11.7188 11.3211 13.027 9.30441 12.5403C9.30139 13.093 9.29462 13.7869 9.29462 13.9926C9.29462 14.2082 9.4268 14.459 9.78954 14.3797C12.6705 13.4206 14.7477 10.703 14.7477 7.50024C14.7477 3.49593 11.5023 0.25 7.49933 0.25Z"
          />
        </svg>
      </a>
    </nav>
  </div>
</header>
