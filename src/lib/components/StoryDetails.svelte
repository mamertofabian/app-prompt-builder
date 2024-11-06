<script lang="ts">
  import { Edit } from "lucide-svelte";
  import type { UserStory } from "../storyDrivenTypes";

  export let story: UserStory;
  export let onEdit: () => void;
</script>

<div class="bg-white rounded-lg border border-gray-200 p-6">
  <div class="flex justify-between items-start">
    <div class="space-y-4 flex-1">
      <div>
        <h3 class="text-lg font-medium text-gray-900">{story.title}</h3>
        <p class="mt-1 text-sm text-gray-500">{story.description}</p>
      </div>
      <div>
        <h4 class="text-sm font-medium text-gray-700">
          Acceptance Criteria:
        </h4>
        <ul class="mt-2 space-y-2">
          {#each story.acceptanceCriteria as ac, index (index)}
            <li class="flex items-start">
              <span class="w-1.5 h-1.5 bg-indigo-400 rounded-full mt-1.5 mr-2"></span>
              <span class="text-sm text-gray-600">{ac}</span>
            </li>
          {/each}
        </ul>
      </div>
    </div>
    <button
      on:click={onEdit}
      class="ml-4 p-2 text-gray-400 hover:text-indigo-600"
      title="Edit story"
    >
      <Edit class="h-5 w-5" />
    </button>
  </div>
</div>
