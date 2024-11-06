<script lang="ts">
  import { Plus, X } from 'lucide-svelte'
  import type { UserStory } from '../types/storyDrivenTypes'

  export let editingStory: UserStory
  export let onSave: () => void
  export let onCancel: () => void

  function addAcceptanceCriteria() {
    editingStory = {
      ...editingStory,
      acceptanceCriteria: [...editingStory.acceptanceCriteria, ""]
    }
  }

  function removeAcceptanceCriteria(index: number) {
    editingStory = {
      ...editingStory,
      acceptanceCriteria: editingStory.acceptanceCriteria.filter(
        (_, i) => i !== index
      )
    }
  }

  function updateAcceptanceCriteria(index: number, value: string) {
    editingStory = {
      ...editingStory,
      acceptanceCriteria: editingStory.acceptanceCriteria.map((ac, i) =>
        i === index ? value : ac
      )
    }
  }
</script>

<div class="space-y-6">
  <div class="bg-white rounded-lg border border-gray-200 p-6">
    <div class="space-y-4">
      <div>
        <label
          for="story-title"
          class="block text-sm font-medium text-gray-700"
        >
          User Story Title
        </label>
        <input
          type="text"
          id="story-title"
          bind:value={editingStory.title}
          class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
          placeholder="As a [user], I want to [action] so that [benefit]"
        />
      </div>

      <div>
        <label
          for="story-description"
          class="block text-sm font-medium text-gray-700"
        >
          Description
        </label>
        <textarea
          id="story-description"
          bind:value={editingStory.description}
          rows="3"
          class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
          placeholder="Additional context and details about the user story"
        />
      </div>

      <div>
        <label class="block text-sm font-medium text-gray-700">
          Acceptance Criteria
        </label>
        <div class="mt-2 space-y-2">
          {#each editingStory.acceptanceCriteria as ac, index}
            <div class="flex gap-2">
              <input
                type="text"
                value={ac}
                on:input={(e) => updateAcceptanceCriteria(index, e.currentTarget.value)}
                class="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                placeholder="Given [context], when [action], then [result]"
              />
              <button
                on:click={() => removeAcceptanceCriteria(index)}
                class="p-2 text-gray-400 hover:text-red-500"
              >
                <X class="h-5 w-5" />
              </button>
            </div>
          {/each}
          <button
            on:click={addAcceptanceCriteria}
            class="inline-flex items-center px-3 py-1 border border-transparent text-sm font-medium rounded-md text-indigo-600 bg-indigo-50 hover:bg-indigo-100"
          >
            <Plus class="h-4 w-4 mr-1" />
            Add Criteria
          </button>
        </div>
      </div>
    </div>

    <div class="mt-6 flex justify-end space-x-3">
      <button
        on:click={onCancel}
        class="px-4 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-50"
      >
        Cancel
      </button>
      <button
        on:click={onSave}
        class="px-4 py-2 bg-indigo-600 text-white rounded-md text-sm font-medium hover:bg-indigo-700"
      >
        Save Story
      </button>
    </div>
  </div>
</div>
