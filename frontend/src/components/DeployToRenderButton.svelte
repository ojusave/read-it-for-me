<script lang="ts">
  let { deployUrl }: { deployUrl: string } = $props();
</script>

<a href={deployUrl} target="_blank" rel="noopener noreferrer" class="deploy-btn">
  <img
    src="https://render.com/images/deploy-to-render-button.svg"
    alt="Deploy to Render"
    height="28"
  />
</a>

<style>
  .deploy-btn {
    display: inline-flex;
    line-height: 0;
  }
</style>
