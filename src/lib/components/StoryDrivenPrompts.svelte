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
    needsDatabase: boolean;
  };

  export let onNavigateToStep: (step: number) => void;

  let selectedStoryIndex = -1;
  let expandedPhases: string[] = [];
  let generatedContent: Record<string, string> = {};

  // Split phases into project-level and story-level
  $: projectPhases = developmentPhases.filter(phase => 
    phase.title === "Project Definition" &&
    (!phase.applicableTo || phase.applicableTo.includes(projectConfig.type)) &&
    (!phase.requiresBackend || projectConfig.needsBackend)
  );

  $: storyPhases = developmentPhases.filter(phase => 
    phase.title !== "Project Definition" &&
    (!phase.applicableTo || phase.applicableTo.includes(projectConfig.type)) &&
    (!phase.requiresBackend || projectConfig.needsBackend)
  );

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

    let formattedPrompt = prompt
      .replace(/\[PROJECT_TYPE\]/g, projectConfig.type)
      .replace(/\[PROJECT_NAME\]/g, projectDetails.name)
      .replace(/\[PROJECT_DESCRIPTION\]/g, projectDetails.description)
      .replace(/\[FEATURES\]/g, projectDetails.features.map(f => `- ${f}`).join('\n'))
      .replace(/\[TECH_STACK\]/g, projectDetails.techStack.map(t => `- ${t}`).join('\n'));

    if (selectedStory) {
      formattedPrompt = formattedPrompt
        .replace(/\[SELECTED_STORY\]/g, `${selectedStory.title}\n${selectedStory.description}`)
        .replace(
          /\[ACCEPTANCE_CRITERIA\]/g,
          selectedStory.acceptanceCriteria.map((ac) => `- ${ac}`).join('\n')
        );
    }

    return formattedPrompt;
  }

  async function copyToClipboard(text: string) {
    await navigator.clipboard.writeText(text);
  }

  function handleGenerated(event: CustomEvent<{ phase: string; content: string }>) {
    const { phase, content } = event.detail;
    generatedContent[phase] = content;
  }
</script>

<div class="space-y-8">
  <!-- Project Definition Section -->
  <div>
    <h2 class="text-xl font-semibold text-gray-900 mb-4">Project Definition</h2>
    <PhasesList
      phases={projectPhases}
      {expandedPhases}
      {formatPrompt}
      on:phaseToggle={e => handlePhaseToggle(e.detail)}
      on:copy={e => copyToClipboard(e.detail)}
      on:generated={handleGenerated}
    />
    {#if generatedContent['Project Definition']}
      <div class="mt-4 p-4 bg-gray-50 rounded-lg">
        <h3 class="text-sm font-medium text-gray-900 mb-2">Generated Architecture & Structure</h3>
        <pre class="text-sm text-gray-600 whitespace-pre-wrap">{generatedContent['Project Definition']}</pre>
      </div>
    {/if}
  </div>

  <!-- User Stories Implementation Section -->
  <div>
    <h2 class="text-xl font-semibold text-gray-900 mb-4">Implementation Guide</h2>
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
            phases={storyPhases}
            {expandedPhases}
            {formatPrompt}
            on:phaseToggle={e => handlePhaseToggle(e.detail)}
            on:copy={e => copyToClipboard(e.detail)}
            on:generated={handleGenerated}
          />

          {#each storyPhases as phase}
            {#if generatedContent[phase.title]}
              <div class="mt-4 p-4 bg-gray-50 rounded-lg">
                <h3 class="text-sm font-medium text-gray-900 mb-2">Generated {phase.title}</h3>
                <pre class="text-sm text-gray-600 whitespace-pre-wrap">{generatedContent[phase.title]}</pre>
              </div>
            {/if}
          {/each}
        {/if}
      </div>
    {/if}
  </div>
</div>