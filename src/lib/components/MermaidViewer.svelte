<script lang="ts">
  import { onMount } from 'svelte';
  import mermaid from 'mermaid';

  export let diagram: string;
  export let darkMode = false;

  let container: HTMLDivElement;
  let error: string | null = null;

  mermaid.initialize({
    startOnLoad: false,
    theme: darkMode ? 'dark' : 'default',
    securityLevel: 'loose',
    fontFamily: 'ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, "Noto Sans", sans-serif',
  });

  async function renderDiagram() {
    if (!diagram) return;
    
    try {
      const { svg } = await mermaid.render('diagram', diagram);
      container.innerHTML = svg;
      error = null;
    } catch (e) {
      error = 'Failed to render diagram. Please check the Mermaid syntax.';
      console.error('Mermaid render error:', e);
    }
  }

  $: if (diagram) {
    renderDiagram();
  }

  $: if (darkMode) {
    mermaid.initialize({ theme: 'dark' });
    renderDiagram();
  }

  onMount(() => {
    renderDiagram();
  });
</script>

<div class="w-full overflow-x-auto">
  {#if error}
    <div class="p-4 bg-red-50 border border-red-200 rounded-md">
      <p class="text-sm text-red-600">{error}</p>
    </div>
  {:else}
    <div bind:this={container} class="mermaid-diagram"></div>
  {/if}
</div>

<style>
  :global(.mermaid-diagram svg) {
    max-width: 100%;
    height: auto;
  }
</style>