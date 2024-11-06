<script lang="ts">
  import { Copy, ChevronDown, ChevronRight } from 'lucide-svelte';

  interface SubPhase {
    title: string;
    description: string;
    prompt: string;
  }

  interface Phase {
    title: string;
    description: string;
    subPhases: SubPhase[];
  }

  export let phase: Phase;
  export let projectDetails: {
    name: string;
    description: string;
    features: string[];
    techStack: string[];
  };
  export let onCopy: (text: string) => void;

  let expandedSubPhase: number | null = null;

  function toggleSubPhase(index: number) {
    expandedSubPhase = expandedSubPhase === index ? null : index;
  }

  function formatPrompt(prompt: string): string {
    return prompt
      .replace(/\[PROJECT_NAME\]/g, projectDetails.name)
      .replace(/\[PROJECT_DESCRIPTION\]/g, projectDetails.description)
      .replace(/\[FEATURES\]/g, projectDetails.features.join('\n- '))
      .replace(/\[TECH_STACK\]/g, projectDetails.techStack.join('\n- '));
  }
</script>

<div class="space-y-6">
  <div class="prose max-w-none">
    <h2 class="text-2xl font-bold text-gray-900">{phase.title}</h2>
    <p class="text-gray-600">{phase.description}</p>
  </div>

  <div class="space-y-4">
    {#each phase.subPhases as subPhase, index}
      <div class="border border-gray-200 rounded-lg overflow-hidden">
        <button
          on:click={() => toggleSubPhase(index)}
          class="w-full px-4 py-3 flex items-center justify-between bg-gray-50 hover:bg-gray-100"
        >
          <span class="font-medium text-gray-900">{subPhase.title}</span>
          {#if expandedSubPhase === index}
            <ChevronDown class="h-5 w-5 text-gray-500" />
          {:else}
            <ChevronRight class="h-5 w-5 text-gray-500" />
          {/if}
        </button>

        {#if expandedSubPhase === index}
          <div class="p-4 space-y-4">
            <p class="text-gray-600">{subPhase.description}</p>
            <div class="relative">
              <pre class="bg-gray-900 text-gray-100 rounded-lg p-4 overflow-x-auto">
                <code>{formatPrompt(subPhase.prompt)}</code>
              </pre>
              <button
                on:click={() => onCopy(formatPrompt(subPhase.prompt))}
                class="absolute top-2 right-2 p-2 text-gray-400 hover:text-white"
              >
                <Copy class="h-5 w-5" />
              </button>
            </div>
          </div>
        {/if}
      </div>
    {/each}
  </div>
</div>
