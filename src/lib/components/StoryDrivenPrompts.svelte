<script lang="ts">
  import type { UserStory, ProjectType } from '../storyDrivenTypes';
  import { developmentPhases } from '../storyDrivenTypes';
  import UserStoryEditor from './UserStoryEditor.svelte';
  import NoStoriesPlaceholder from './prompts/NoStoriesPlaceholder.svelte';
  import PhasesList from './prompts/PhasesList.svelte';
  import StoryDetails from './prompts/StoryDetails.svelte';
  import StorySelector from './prompts/StorySelector.svelte';

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

  let selectedStoryIndex = -1;
  let expandedPhases: string[] = [];
  let isEditing = false;
  let editingStory: UserStory = {
    title: "",
    description: "",
    acceptanceCriteria: [""]
  };

  function parseUserStory(story: string): UserStory {
    const lines = story.split("\n").filter((line) => line.trim());
    const title = lines[0] || "";
    const acStart = lines.findIndex((line) =>
      line.toLowerCase().includes("acceptance criteria:")
    );

    const description = acStart > 0
      ? lines.slice(1, acStart).join("\n")
      : lines.slice(1).join("\n");

    const acceptanceCriteria = acStart > 0
      ? lines.slice(acStart + 1)
          .map((ac) => ac.replace(/^[-*]\s*/, "").trim())
      : [];

    return { title, description, acceptanceCriteria };
  }

  function formatUserStory(story: UserStory): string {
    return `${story.title}\n${story.description}\n\nAcceptance Criteria:\n${
      story.acceptanceCriteria.map((ac) => `- ${ac}`).join("\n")
    }`;
  }

  function togglePhase(phaseTitle: string) {
    expandedPhases = expandedPhases.includes(phaseTitle)
      ? expandedPhases.filter((t) => t !== phaseTitle)
      : [...expandedPhases, phaseTitle];
  }

  function formatPrompt(prompt: string) {
    const selectedStory = selectedStoryIndex >= 0
      ? parseUserStory(projectDetails.userStories[selectedStoryIndex])
      : null;

    return prompt
      .replace(/\[PROJECT_TYPE\]/g, projectConfig.type)
      .replace(/\[TECH_STACK\]/g, projectDetails.techStack.join("\n- "))
      .replace(
        /\[SELECTED_STORY\]/g,
        selectedStory
          ? `${selectedStory.title}\n${selectedStory.description}`
          : ""
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

  function handleEditStory(index: number) {
    selectedStoryIndex = index;
    editingStory = parseUserStory(projectDetails.userStories[index]);
    isEditing = true;
  }

  function handleSaveStory() {
    const formattedStory = formatUserStory(editingStory);
    const updatedStories = [...projectDetails.userStories];

    if (selectedStoryIndex >= 0) {
      updatedStories[selectedStoryIndex] = formattedStory;
    } else {
      updatedStories.push(formattedStory);
    }

    // Update project details (you'll need to implement this)
    console.log("Updated stories:", updatedStories);

    isEditing = false;
    editingStory = { title: "", description: "", acceptanceCriteria: [""] };
  }
</script>

{#if projectDetails.userStories.length === 0 && !isEditing}
  <NoStoriesPlaceholder on:addStory={() => isEditing = true} />
{:else if isEditing}
  <UserStoryEditor
    bind:editingStory
    on:save={handleSaveStory}
    on:cancel={() => isEditing = false}
  />
{:else}
  <div class="space-y-6">
    <StorySelector
      {selectedStoryIndex}
      userStories={projectDetails.userStories}
      on:storySelect={(e) => selectedStoryIndex = e.detail}
      on:addStory={() => isEditing = true}
      {parseUserStory}
    />

    {#if selectedStoryIndex >= 0}
      <StoryDetails
        story={parseUserStory(projectDetails.userStories[selectedStoryIndex])}
        on:edit={() => handleEditStory(selectedStoryIndex)}
      />

      <PhasesList
        phases={filteredPhases}
        {expandedPhases}
        on:phaseToggle={(e) => togglePhase(e.detail)}
        {formatPrompt}
        on:copy={(e) => copyToClipboard(e.detail)}
      />
    {/if}
  </div>
{/if}

<style>
  .space-y-6 {
    display: flex;
    flex-direction: column;
    gap: 1.5rem;
  }
</style>
