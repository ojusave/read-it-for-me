<script lang="ts">
  import type { AppConfig, DigestResult, ItemAnalysis } from "./lib/api";
  import { loadConfig, runDigestStream } from "./lib/api";
  import DigestCard from "./components/DigestCard.svelte";
  import DigestSummary from "./components/DigestSummary.svelte";
  import Footer from "./components/Footer.svelte";
  import Header from "./components/Header.svelte";

  let config = $state<AppConfig | null>(null);
  let urls = $state("");
  let text = $state("");
  let focus = $state("");
  let files = $state<FileList | null>(null);
  let running = $state(false);
  let status = $state("");
  let error = $state("");
  let cards = $state<ItemAnalysis[]>([]);
  let result = $state<DigestResult | null>(null);

  $effect(() => {
    loadConfig()
      .then((c) => (config = c))
      .catch(() => (error = "Could not load app config"));
  });

  async function submit() {
    if (!config || running) return;
    running = true;
    error = "";
    cards = [];
    result = null;
    status = "Starting digest...";

    const form = new FormData();
    form.set("urls", urls);
    form.set("text", text);
    form.set("focus", focus);
    if (files) {
      for (const file of files) form.append("pdfs", file);
    }

    await runDigestStream(form, {
      onStatus: (p) => {
        status = p.message;
      },
      onCard: (p) => {
        cards = [...cards, p];
      },
      onDone: (p) => {
        result = p;
        status = "Done";
        running = false;
      },
      onError: (p) => {
        error = p.message;
        running = false;
      },
    });

    if (running) running = false;
  }
</script>

<div class="page">
  {#if config}
    <Header signupUrl={config.signupNavbar} deployUrl={config.deployUrl} />

    <main class="shell">
      <section class="hero">
        <h1>Your daily digest, not a generic summary</h1>
        <p>
          Drop in links, pasted text, or PDFs. Each item answers what changed, why it
          matters, what to do, and whether it is worth reading fully.
        </p>
        <div class="hero-actions">
          <a class="btn" href={config.deployUrl} target="_blank" rel="noopener noreferrer">
            Deploy to Render
          </a>
          <a class="btn" href={config.signupHero} target="_blank" rel="noopener noreferrer">
            Sign up on Render
          </a>
        </div>
      </section>

      <section class="panel">
        <label for="urls">URLs (one per line)</label>
        <textarea id="urls" bind:value={urls} placeholder="https://example.com/newsletter"></textarea>

        <label for="text">Pasted text (one block per line)</label>
        <textarea id="text" bind:value={text} placeholder="Paste newsletter excerpt..."></textarea>

        <label for="focus">Focus this week (optional)</label>
        <textarea id="focus" bind:value={focus} rows="2" placeholder="e.g. AI infra, hiring, product launches"></textarea>

        <label for="pdfs">PDFs (optional)</label>
        <input id="pdfs" type="file" accept=".pdf" multiple bind:files />

        <button class="btn btn-primary" onclick={submit} disabled={running}>
          {running ? "Running..." : "Build digest"}
        </button>

        {#if status}
          <p class="status">{status}</p>
        {/if}
        {#if error}
          <p class="error">{error}</p>
        {/if}
      </section>

      {#if cards.length}
        <div class="cards">
          {#each cards as card}
            <DigestCard {card} />
          {/each}
        </div>
      {/if}

      {#if result}
        <DigestSummary {result} />
      {/if}
    </main>

    <Footer githubRepo={config.githubRepo} signupUrl={config.signupFooter} />
  {:else if error}
    <main class="shell"><p class="error">{error}</p></main>
  {:else}
    <main class="shell"><p class="status">Loading…</p></main>
  {/if}
</div>
