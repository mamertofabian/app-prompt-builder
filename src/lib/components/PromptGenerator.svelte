<script lang="ts">
  import { createEventDispatcher } from 'svelte';
  import { Copy, Loader2 } from 'lucide-svelte';
  import { generateWithAI } from '../services/openrouter';

  export let title: string;
  export let prompt: string;
  export let systemPrompt: string = '';
  export let isCollapsed = true;

  let isGenerating = false;
  let generationError: string | null = null;

  const dispatch = createEventDispatcher<{
    generated: string;
  }>();

  async function generateContent() {
    isGenerating = true;
    generationError = null;

    try {
      const result = await generateWithAI(prompt, systemPrompt);
      dispatch('generated', result);
    } catch (error) {
      generationError = 'Failed to generate content. Please try again.';
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
          Generate content using AI or copy the prompt to use with your preferred AI assistant
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
          on:click={generateContent}
          class="inline-flex items-center px-3 py-1.5 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 disabled:opacity-50 disabled:cursor-not-allowed"
          disabled={isGenerating}
        >
          {#if isGenerating}
            <Loader2 class="h-4 w-4 mr-1 animate-spin" />
            Generating...
          {:else}
            Generate with AI
          {/if}
        </button>
      </div>
    </div>
  </div>
  
  {#if !isCollapsed}
    <div class="p-4">
      {#if generationError}
        <div class="mb-4 bg-red-50 border border-red-200 rounded-md p-3 text-sm text-red-600">
          {generationError}
        </div>
      {/if}
      <pre class="text-sm text-gray-600 whitespace-pre-wrap">{prompt}</pre>
    </div>
  {/if}
</div>