<script lang="ts">
  import { createEventDispatcher } from 'svelte';
  import type { UserStory } from "../storyDrivenTypes";

  export let selectedStoryIndex: number;
  export let userStories: string[];
  export let parseUserStory: (story: string) => UserStory;

  const dispatch = createEventDispatcher<{
    storySelect: number;
  }>();

  function handleStorySelect(event: Event) {
    const select = event.target as HTMLSelectElement;
    dispatch('storySelect', parseInt(select.value, 10));
  }
</script>

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
    on:change={handleStorySelect}
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