<script lang="ts">
  import { Plus } from "lucide-svelte";
  import type { UserStory } from "../storyDrivenTypes";

  export let selectedStoryIndex: number;
  export let userStories: string[];
  export let onStorySelect: (index: number) => void;
  export let onAddStory: () => void;
  export let parseUserStory: (story: string) => UserStory;
</script>

<div class="flex justify-between items-start">
  <div class="space-y-1">
    <label
      for="story-select"
      class="block text-sm font-medium text-gray-700"
    >
      Select User Story
    </label>
    <select
      id="story-select"
      value={selectedStoryIndex}
      on:change={(e) => onStorySelect(Number(e.currentTarget.value))}
      class="mt-1 block w-96 rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
    >
      <option value={-1}>Select a user story to implement</option>
      {#each userStories as story, index}
        {@const parsed = parseUserStory(story)}
        <option value={index}>
          {parsed.title}
        </option>
      {/each}
    </select>
  </div>
  <button
    on:click={onAddStory}
    class="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-indigo-600 bg-indigo-50 hover:bg-indigo-100"
  >
    <Plus class="h-4 w-4 mr-2" />
    Add Story
  </button>
</div>
