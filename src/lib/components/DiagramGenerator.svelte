<script lang="ts">
  import { createEventDispatcher } from 'svelte';
  import { Copy, Loader2, Sun, Moon } from 'lucide-svelte';
  import { generateWithAI } from '../services/openrouter';
  import MermaidViewer from './MermaidViewer.svelte';

  export let title: string;
  export let prompt: string;
  export let systemPrompt: string = '';

  let isGenerating = false;
  let generationError: string | null = null;
  let diagram: string | null = null;
  let darkMode = false;
  let showCode = false;

  const dispatch = createEventDispatcher<{
    generated: string;
  }>();

  async function generateDiagram() {
    isGenerating = true;
    generationError = null;

    try {
      const result = await generateWithAI(prompt, systemPrompt);
      // Extract Mermaid code from the response if it's wrapped in code blocks
      diagram = result.replace(/```mermaid\n([\s\S]*?)```/g, '$1').trim();
      dispatch('generated', diagram);
    } catch (error) {
      generationError = 'Failed to generate diagram. Please try again.';
    } finally {
      isGenerating = false;
    }
  }

  async function copyToClipboard(text: string) {
    await navigator.clipboard.writeText(text);
  }
</script>

<div class="border rounded-lg overflow-hidden">
  <div class="bg-gray-50 px-4 py-3 border-b">
    <div class="flex justify-between items-center">
      <div>
        <h3 class="text-sm font-medium text-gray-900">{title}</h3>
        <p class="text-xs text-gray-500 mt-1">
          Generate a Mermaid diagram or copy the prompt to use with your preferred AI assistant
        </p>
      </div>
      <div class="flex items-center space-x-2">
        <button
          on:click={() => copyToClipboard(prompt)}
          class="inline-flex items-center px-3 py-1.5 text-sm font-medium text-indigo-600 hover:text-indigo-500"
          disabled={isGenerating}
        >
          <Copy class="h-4 w-4 mr-1" />
          Copy Prompt
        </button>
        <button
          on:click={generateDiagram}
          class="inline-flex items-center px-3 py-1.5 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 disabled:opacity-50 disabled:cursor-not-allowed"
          disabled={isGenerating}
        >
          {#if isGenerating}
            <Loader2 class="h-4 w-4 mr-1 animate-spin" />
            Generating...
          {:else}
            Generate Diagram
          {/if}
        </button>
      </div>
    </div>
  </div>
  
  {#if generationError}
    <div class="p-4">
      <div class="mb-4 bg-red-50 border border-red-200 rounded-md p-3 text-sm text-red-600">
        {generationError}
      </div>
    </div>
  {/if}

  {#if diagram}
    <div class="p-4 space-y-4">
      <div class="flex justify-between items-center">
        <div class="flex items-center space-x-4">
          <button
            on:click={() => showCode = !showCode}
            class="text-sm font-medium text-indigo-600 hover:text-indigo-500"
          >
            {showCode ? 'Show Diagram' : 'Show Code'}
          </button>
          <button
            on:click={() => darkMode = !darkMode}
            class="text-sm font-medium text-indigo-600 hover:text-indigo-500"
          >
            {#if darkMode}
              <Sun class="h-4 w-4" />
            {:else}
              <Moon class="h-4 w-4" />
            {/if}
          </button>
        </div>
        <button
          on:click={() => copyToClipboard(diagram)}
          class="inline-flex items-center px-3 py-1.5 text-sm font-medium text-indigo-600 hover:text-indigo-500"
        >
          <Copy class="h-4 w-4 mr-1" />
          Copy Diagram Code
        </button>
      </div>

      {#if showCode}
        <div class="bg-gray-900 rounded-lg p-4">
          <pre class="text-sm text-gray-100 whitespace-pre-wrap overflow-x-auto">{diagram}</pre>
        </div>
      {:else}
        <div class="bg-white dark:bg-gray-900 rounded-lg p-4">
          <MermaidViewer {diagram} {darkMode} />
        </div>
      {/if}
    </div>
  {/if}
</div>