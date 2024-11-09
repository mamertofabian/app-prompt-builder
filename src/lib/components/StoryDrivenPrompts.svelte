<script lang="ts">
  import type { UserStory, ProjectType } from '../storyDrivenTypes';
  import { developmentPhases } from '../storyDrivenTypes';
  import NoStoriesPlaceholder from './NoStoriesPlaceholder.svelte';
  import PhasesList from './PhasesList.svelte';
  import StoryDetails from './StoryDetails.svelte';
  import StorySelector from './StorySelector.svelte';
  import { ArrowLeft } from 'lucide-svelte';

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
  };

  export let onNavigateToStep: (step: number) => void;

  let selectedStoryIndex = -1;
  let expandedPhases: string[] = [];

  function parseUserStory(story: string): UserStory {
    const lines = story.split('\n').filter(line => line.trim());
    const titleMatch = lines[0]?.match(/As a (.*?), I want to (.*?) so that (.*?)$/i) || [];
    
    const title = titleMatch[0] || '';
    const description = lines.slice(1, lines.findIndex(line => 
      line.toLowerCase().includes('acceptance criteria:')
    )).join('\n');

    const acceptanceCriteria = lines
      .slice(lines.findIndex(line => 
        line.toLowerCase().includes('acceptance criteria:')
      ) + 1)
      .map(line => line.replace(/^[-*]\s*/, ''))
      .filter(line => line);

    return { title, description, acceptanceCriteria };
  }

  function handlePhaseToggle(phaseTitle: string) {
    expandedPhases = expandedPhases.includes(phaseTitle)
      ? expandedPhases.filter((t) => t !== phaseTitle)
      : [...expandedPhases, phaseTitle];
  }

  function formatPrompt(prompt: string): string {
    const selectedStory = selectedStoryIndex >= 0
      ? parseUserStory(projectDetails.userStories[selectedStoryIndex])
      : null;

    return prompt
      .replace(/\[PROJECT_TYPE\]/g, projectConfig.type)
      .replace(/\[TECH_STACK\]/g, projectDetails.techStack.join("\n- "))
      .replace(
        /\[SELECTED_STORY\]/g,
        selectedStory ? `${selectedStory.title}\n${selectedStory.description}` : ""
      )
      .replace(
        /\[ACCEPTANCE_CRITERIA\]/g,
        selectedStory
          ? selectedStory.acceptanceCriteria.map((ac) => `- ${ac}`).join("\n")
          : ""
      );
  }

  async function copyToClipboard(text: string) {
    await navigator.clipboard.writeText(text);
  }

  $: filteredPhases = developmentPhases.filter((phase) => {
    if (phase.requiresBackend && !projectConfig.needsBackend) return false;
    if (phase.applicableTo && !phase.applicableTo.includes(projectConfig.type))
      return false;
    return true;
  });
</script>

<div class="space-y-6">
  {#if projectDetails.userStories.length === 0}
    <div class="text-center py-12">
      <h3 class="text-lg font-medium text-gray-900">
        No User Stories Found
      </h3>
      <p class="mt-2 text-sm text-gray-500">
        Go back to step 2 to add user stories first.
      </p>
      <button
        on:click={() => onNavigateToStep(1)}
        class="mt-4 inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700"
      >
        <ArrowLeft class="h-4 w-4 mr-2" />
        Go to User Stories
      </button>
    </div>
  {:else}
    <div class="space-y-6">
      <div class="flex justify-between items-center">
        <StorySelector
          {selectedStoryIndex}
          userStories={projectDetails.userStories}
          on:storySelect={(e) => selectedStoryIndex = e.detail}
          {parseUserStory}
        />
        <button
          on:click={() => onNavigateToStep(1)}
          class="inline-flex items-center px-4 py-2 text-sm font-medium text-indigo-600 hover:text-indigo-700"
        >
          <ArrowLeft class="h-4 w-4 mr-2" />
          Edit Stories
        </button>
      </div>

      {#if selectedStoryIndex >= 0}
        <StoryDetails
          story={parseUserStory(projectDetails.userStories[selectedStoryIndex])}
          readOnly={true}
        />

        <PhasesList
          phases={filteredPhases}
          {expandedPhases}
          {formatPrompt}
          on:phaseToggle={e => handlePhaseToggle(e.detail)}
          on:copy={e => copyToClipboard(e.detail)}
        />
      {/if}
    </div>
  {/if}
</div>