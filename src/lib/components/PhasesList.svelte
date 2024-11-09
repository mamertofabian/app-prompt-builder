<script lang="ts">
  import { createEventDispatcher } from 'svelte';
  import { ChevronDown, ChevronRight, Copy } from 'lucide-svelte';
  import type { Phase } from '../../components/storyDrivenTypes';

  export let phases: Phase[];
  export let expandedPhases: string[];
  export let formatPrompt: (prompt: string) => string;
  export let onCopy: (text: string) => void;

  const dispatch = createEventDispatcher<{
    phaseToggle: string;
    copy: string;
  }>();

  function handlePhaseToggle(phaseTitle: string) {
    dispatch('phaseToggle', phaseTitle);
  }

  function handleCopy(text: string) {
    dispatch('copy', text);
  }
</script>

<div class="space-y-4">
  {#each phases as phase, index}
    <div class="border border-gray-200 rounded-lg overflow-hidden">
      <button
        on:click={() => handlePhaseToggle(phase.title)}
        class="w-full px-4 py-3 flex items-center justify-between bg-gray-50 hover:bg-gray-100"
      >
        <div class="flex flex-col items-start">
          <span class="font-medium text-gray-900">{phase.title}</span>
          <span class="text-sm text-gray-500">{phase.description}</span>
        </div>
        {#if expandedPhases.includes(phase.title)}
          <ChevronDown class="h-5 w-5 text-gray-500" />
        {:else}
          <ChevronRight class="h-5 w-5 text-gray-500" />
        {/if}
      </button>

      {#if expandedPhases.includes(phase.title)}
        <div class="p-4">
          <div class="relative">
            <pre class="bg-gray-900 text-gray-100 rounded-lg p-4 overflow-x-auto">
              <code>{formatPrompt(phase.prompt)}</code>
            </pre>
            <button
              on:click={() => handleCopy(formatPrompt(phase.prompt))}
              class="absolute top-2 right-2 p-2 text-gray-400 hover:text-white"
              title="Copy to clipboard"
            >
              <Copy class="h-5 w-5" />
            </button>
          </div>
        </div>
      {/if}
    </div>
  {/each}
</div>