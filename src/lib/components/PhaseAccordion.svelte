<script lang="ts">
  import { onMount } from 'svelte';
  import { ChevronDown, ChevronRight, Copy } from 'lucide-svelte';
  
  type ProjectType = 'static' | 'fullstack' | 'backend' | 'mobile';
  
  interface SubPhase {
    title: string;
    description: string;
    tool: string;
    prompt: string;
  }

  interface Phase {
    title: string;
    description: string;
    subPhases: SubPhase[];
  }

  export let phases: Phase[];
  export let projectDetails: {
    name: string;
    description: string;
    features: string[];
    techStack: string[];
    userStories: string[];
  };
  export let projectConfig: {
    type: ProjectType;
    needsBackend: boolean;
    needsDatabase: boolean;
    needsAuthentication: boolean;
  };
  export let onCopy: (text: string) => void;
  export let expandAll = false;

  let expandedPhases: number[] = [];
  let expandedSubPhases: string[] = [];

  $: if (expandAll) {
    expandedPhases = phases.map((_, index) => index);
    expandedSubPhases = phases.flatMap((_, phaseIndex) => 
      phases[phaseIndex].subPhases.map((_, subIndex) => `${phaseIndex}-${subIndex}`)
    );
  }

  function togglePhase(phaseIndex: number) {
    expandedPhases = expandedPhases.includes(phaseIndex)
      ? expandedPhases.filter(i => i !== phaseIndex)
      : [...expandedPhases, phaseIndex];
  }

  function toggleSubPhase(phaseIndex: number, subIndex: number) {
    const key = `${phaseIndex}-${subIndex}`;
    expandedSubPhases = expandedSubPhases.includes(key)
      ? expandedSubPhases.filter(k => k !== key)
      : [...expandedSubPhases, key];
  }

  function formatPrompt(prompt: string): string {
    let formattedPrompt = prompt
      .replace(/\[PROJECT_NAME\]/g, projectDetails.name)
      .replace(/\[PROJECT_DESCRIPTION\]/g, projectDetails.description)
      .replace(/\[FEATURES\]/g, projectDetails.features.join('\n- '))
      .replace(/\[TECH_STACK\]/g, projectDetails.techStack.join('\n- '))
      .replace(/\[USER_STORIES\]/g, projectDetails.userStories.join('\n\n'));

    formattedPrompt = `Project Type: ${projectConfig.type.toUpperCase()}\n${
      projectConfig.needsAuthentication ? 'Authentication Required\n' : ''
    }${
      projectConfig.needsDatabase ? 'Database Required\n' : ''
    }\n${formattedPrompt}`;

    return formattedPrompt;
  }
</script>

<div class="space-y-4">
  {#each phases as phase, phaseIndex}
    <div class="bg-white rounded-xl shadow-lg overflow-hidden">
      <button
        on:click={() => togglePhase(phaseIndex)}
        class="w-full px-6 py-4 flex items-center justify-between bg-white hover:bg-gray-50"
      >
        <div class="flex flex-col items-start">
          <span class="font-semibold text-lg text-gray-900">{phase.title}</span>
          <span class="text-sm text-gray-500">{phase.description}</span>
        </div>
        {#if expandedPhases.includes(phaseIndex)}
          <ChevronDown class="h-5 w-5 text-gray-500" />
        {:else}
          <ChevronRight class="h-5 w-5 text-gray-500" />
        {/if}
      </button>

      {#if expandedPhases.includes(phaseIndex)}
        <div class="border-t border-gray-200">
          <div class="p-4 space-y-3">
            {#each phase.subPhases as subPhase, subIndex}
              <div class="border border-gray-200 rounded-lg overflow-hidden">
                <button
                  on:click={() => toggleSubPhase(phaseIndex, subIndex)}
                  class="w-full px-4 py-3 flex items-center justify-between bg-gray-50 hover:bg-gray-100"
                >
                  <div class="flex flex-col items-start">
                    <span class="font-medium text-gray-900">{subPhase.title}</span>
                    <div class="text-sm">
                      <span class="text-gray-500">{subPhase.description}</span>
                      <span class="text-indigo-600 ml-2">• {subPhase.tool}</span>
                    </div>
                  </div>
                  {#if expandedSubPhases.includes(`${phaseIndex}-${subIndex}`)}
                    <ChevronDown class="h-5 w-5 text-gray-500" />
                  {:else}
                    <ChevronRight class="h-5 w-5 text-gray-500" />
                  {/if}
                </button>

                {#if expandedSubPhases.includes(`${phaseIndex}-${subIndex}`)}
                  <div class="p-4">
                    <div class="relative">
                      <pre class="bg-gray-900 text-gray-100 rounded-lg p-4 overflow-x-auto">
                        <code>{formatPrompt(subPhase.prompt)}</code>
                      </pre>
                      <button
                        on:click={() => onCopy(formatPrompt(subPhase.prompt))}
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
        </div>
      {/if}
    </div>
  {/each}
</div>
