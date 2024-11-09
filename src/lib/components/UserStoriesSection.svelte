<script lang="ts">
  import { ChevronDown, ChevronRight, Copy, Plus, Edit } from 'lucide-svelte';
  import ListEditor from './ListEditor.svelte';
  import { onMount } from 'svelte';

  export let projectName: string;
  export let features: string[];
  export let userStories: string[];
  export let onUserStoriesChange: (stories: string[]) => void;

  interface UserStory {
    title: string;
    description: string;
    acceptanceCriteria: string[];
  }

  let isEditing = false;
  let editingStory: UserStory = {
    title: '',
    description: '',
    acceptanceCriteria: ['']
  };
  let selectedStoryIndex = -1;
  let isCollapsed = true;

  function parseUserStory(story: string): UserStory {
    const lines = story.split('\n').filter(line => line.trim());
    const title = lines[0] || '';
    const acStart = lines.findIndex(line => line.toLowerCase().includes('acceptance criteria:'));
    
    const description = acStart > 0 
      ? lines.slice(1, acStart).join('\n')
      : lines.slice(1).join('\n');
    
    const acceptanceCriteria = acStart > 0
      ? lines.slice(acStart + 1).map(ac => ac.replace(/^[-*]\s*/, '').trim())
      : [];

    return { title, description, acceptanceCriteria };
  }

  function formatUserStory(story: UserStory): string {
    return `${story.title}\n${story.description}\n\nAcceptance Criteria:\n${
      story.acceptanceCriteria.map(ac => `- ${ac}`).join('\n')
    }`;
  }

  function addAcceptanceCriteria() {
    editingStory = {
      ...editingStory,
      acceptanceCriteria: [...editingStory.acceptanceCriteria, '']
    };
  }

  function removeAcceptanceCriteria(index: number) {
    editingStory = {
      ...editingStory,
      acceptanceCriteria: editingStory.acceptanceCriteria.filter((_, i) => i !== index)
    };
  }

  function updateAcceptanceCriteria(index: number, value: string) {
    editingStory = {
      ...editingStory,
      acceptanceCriteria: editingStory.acceptanceCriteria.map((ac, i) => i === index ? value : ac)
    };
  }

  function handleEditStory(index: number) {
    selectedStoryIndex = index;
    editingStory = parseUserStory(userStories[index]);
    isEditing = true;
  }

  function handleSaveStory() {
    const formattedStory = formatUserStory(editingStory);
    const updatedStories = [...userStories];
    
    if (selectedStoryIndex >= 0) {
      updatedStories[selectedStoryIndex] = formattedStory;
    } else {
      updatedStories.push(formattedStory);
    }
    
    onUserStoriesChange(updatedStories);
    isEditing = false;
    editingStory = { title: '', description: '', acceptanceCriteria: [''] };
    selectedStoryIndex = -1;
  }

  async function copyToClipboard(text: string) {
    await navigator.clipboard.writeText(text);
  }

  function getAllStoriesFormatted(): string {
    return userStories.map((story, index) => {
      const parsed = parseUserStory(story);
      return `## User Story ${index + 1}

${parsed.title}

${parsed.description}

### Acceptance Criteria:
${parsed.acceptanceCriteria.map(ac => `- ${ac}`).join('\n')}
`;
    }).join('\n\n');
  }
</script>

{#if isEditing}
  <div class="space-y-6">
    <div class="bg-white rounded-lg border border-gray-200 p-6">
      <div class="space-y-4">
        <div>
          <label for="story-title" class="block text-sm font-medium text-gray-700">
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
          <label for="story-description" class="block text-sm font-medium text-gray-700">
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
            <ListEditor
              items={editingStory.acceptanceCriteria}
              {addAcceptanceCriteria}
              {removeAcceptanceCriteria}
              {updateAcceptanceCriteria}
              placeholder="Given [context], when [action], then [result]"
            />
          </div>
        </div>
      </div>

      <div class="mt-6 flex justify-end space-x-3">
        <button
          on:click={() => isEditing = false}
          class="px-4 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-50"
        >
          Cancel
        </button>
        <button
          on:click={handleSaveStory}
          class="px-4 py-2 bg-indigo-600 text-white rounded-md text-sm font-medium hover:bg-indigo-700"
        >
          Save Story
        </button>
      </div>
    </div>
  </div>
{:else}
  <div class="border rounded-lg overflow-hidden">
    <div class="bg-gray-50 px-4 py-3 border-b">
      <div class="flex justify-between items-center">
        <div>
          <h3 class="text-sm font-medium text-gray-900">User Stories</h3>
          <p class="text-xs text-gray-500 mt-1">
            Define user stories with acceptance criteria
          </p>
        </div>
        <div class="flex items-center space-x-2">
          <button
            on:click={() => isCollapsed = !isCollapsed}
            class="p-2 text-gray-400 hover:text-gray-600"
          >
            {#if isCollapsed}
              <ChevronRight class="h-5 w-5" />
            {:else}
              <ChevronDown class="h-5 w-5" />
            {/if}
          </button>
          <button
            on:click={() => {
              selectedStoryIndex = -1;
              isEditing = true;
            }}
            class="inline-flex items-center px-3 py-1.5 border border-transparent text-sm font-medium rounded-md text-indigo-600 bg-indigo-50 hover:bg-indigo-100"
          >
            <Plus class="h-4 w-4 mr-1" />
            Add Story
          </button>
        </div>
      </div>
    </div>

    {#if !isCollapsed}
      <div class="p-4 space-y-4">
        {#if userStories.length === 0}
          <p class="text-center text-sm text-gray-500 py-4">
            No user stories added yet. Click "Add Story" to create one.
          </p>
        {:else}
          {#each userStories as story, index}
            {@const parsed = parseUserStory(story)}
            <div class="bg-white rounded-lg border border-gray-200 p-4">
              <div class="flex justify-between items-start">
                <div class="space-y-3 flex-1">
                  <div>
                    <h4 class="text-sm font-medium text-gray-900">{parsed.title}</h4>
                    <p class="mt-1 text-sm text-gray-500">{parsed.description}</p>
                  </div>
                  <div>
                    <h5 class="text-xs font-medium text-gray-700">Acceptance Criteria:</h5>
                    <ul class="mt-1 space-y-1">
                      {#each parsed.acceptanceCriteria as ac, acIndex}
                        <li class="flex items-start">
                          <span class="w-1.5 h-1.5 bg-indigo-400 rounded-full mt-1.5 mr-2"></span>
                          <span class="text-sm text-gray-600">{ac}</span>
                        </li>
                      {/each}
                    </ul>
                  </div>
                </div>
                <button
                  on:click={() => handleEditStory(index)}
                  class="ml-4 p-2 text-gray-400 hover:text-indigo-600"
                  title="Edit story"
                >
                  <Edit class="h-5 w-5" />
                </button>
              </div>
            </div>
          {/each}

          <div class="mt-4 border-t pt-4">
            <div class="flex justify-between items-start">
              <div class="text-sm text-gray-500">
                Copy all stories in Markdown format
              </div>
              <button
                on:click={() => copyToClipboard(getAllStoriesFormatted())}
                class="p-2 text-gray-400 hover:text-indigo-600"
                title="Copy all stories"
              >
                <Copy class="h-5 w-5" />
              </button>
            </div>
          </div>
        {/if}
      </div>
    {/if}
  </div>
{/if}
