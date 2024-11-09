<script lang="ts">
  import { createEventDispatcher } from 'svelte';
  import ListEditor from './ListEditor.svelte';
  import { Plus, X } from 'lucide-svelte';

  export let story: {
    title: {
      asA: string;
      iWantTo: string;
      soThat: string;
    };
    description: string;
    acceptanceCriteria: Array<{
      given: string;
      when: string;
      then: string;
    }>;
  };

  const dispatch = createEventDispatcher<{
    save: void;
    cancel: void;
  }>();

  function addAcceptanceCriteria() {
    story.acceptanceCriteria = [
      ...story.acceptanceCriteria,
      { given: '', when: '', then: '' }
    ];
  }

  function removeAcceptanceCriteria(index: number) {
    story.acceptanceCriteria = story.acceptanceCriteria.filter((_, i) => i !== index);
  }
</script>

<div class="bg-white rounded-lg border border-gray-200 p-6">
  <div class="space-y-6">
    <div>
      <label class="block text-sm font-medium text-gray-700 mb-4">
        User Story Title
      </label>
      <div class="grid grid-cols-3 gap-4">
        <div>
          <label for="as-a" class="block text-xs text-gray-500">As a</label>
          <input
            type="text"
            id="as-a"
            bind:value={story.title.asA}
            class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
            placeholder="user type/role"
          />
        </div>
        <div>
          <label for="i-want-to" class="block text-xs text-gray-500">I want to</label>
          <input
            type="text"
            id="i-want-to"
            bind:value={story.title.iWantTo}
            class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
            placeholder="action/goal"
          />
        </div>
        <div>
          <label for="so-that" class="block text-xs text-gray-500">So that</label>
          <input
            type="text"
            id="so-that"
            bind:value={story.title.soThat}
            class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
            placeholder="benefit/value"
          />
        </div>
      </div>
    </div>

    <div>
      <label for="story-description" class="block text-sm font-medium text-gray-700">
        Description
      </label>
      <textarea
        id="story-description"
        bind:value={story.description}
        rows="3"
        class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
        placeholder="Additional context and details about the user story"
      />
    </div>

    <div>
      <div class="flex justify-between items-center mb-4">
        <label class="block text-sm font-medium text-gray-700">
          Acceptance Criteria
        </label>
        <button
          on:click={addAcceptanceCriteria}
          class="inline-flex items-center px-3 py-1 text-sm font-medium text-indigo-600 hover:text-indigo-500"
        >
          <Plus class="h-4 w-4 mr-1" />
          Add Criteria
        </button>
      </div>
      
      <div class="space-y-4">
        {#each story.acceptanceCriteria as ac, index}
          <div class="relative border border-gray-200 rounded-lg p-4 pr-12">
            <button
              on:click={() => removeAcceptanceCriteria(index)}
              class="absolute top-2 right-2 p-1 text-gray-400 hover:text-red-500"
            >
              <X class="h-4 w-4" />
            </button>
            <div class="grid grid-cols-3 gap-4">
              <div>
                <label class="block text-xs text-gray-500">Given</label>
                <input
                  type="text"
                  bind:value={ac.given}
                  class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                  placeholder="context/precondition"
                />
              </div>
              <div>
                <label class="block text-xs text-gray-500">When</label>
                <input
                  type="text"
                  bind:value={ac.when}
                  class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                  placeholder="action occurs"
                />
              </div>
              <div>
                <label class="block text-xs text-gray-500">Then</label>
                <input
                  type="text"
                  bind:value={ac.then}
                  class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                  placeholder="expected result"
                />
              </div>
            </div>
          </div>
        {/each}
      </div>
    </div>
  </div>

  <div class="mt-6 flex justify-end space-x-3">
    <button
      on:click={() => dispatch('cancel')}
      class="px-4 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-50"
    >
      Cancel
    </button>
    <button
      on:click={() => dispatch('save')}
      class="px-4 py-2 bg-indigo-600 text-white rounded-md text-sm font-medium hover:bg-indigo-700"
    >
      Save Story
    </button>
  </div>
</div>