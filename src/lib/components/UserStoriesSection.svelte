<script lang="ts">
  import { createEventDispatcher, onMount } from 'svelte';
  import { ChevronDown, ChevronRight, Copy, Plus, Edit, Trash2 } from 'lucide-svelte';
  import UserStoryForm from './UserStoryForm.svelte';

  export let projectName: string;
  export let features: string[];
  export let userStories: string[];

  const dispatch = createEventDispatcher<{
    userStoriesChange: string[];
  }>();

  interface UserStoryTitle {
    asA: string;
    iWantTo: string;
    soThat: string;
  }

  interface AcceptanceCriterion {
    given: string;
    when: string;
    then: string;
  }

  interface UserStory {
    title: UserStoryTitle;
    description: string;
    acceptanceCriteria: AcceptanceCriterion[];
  }

  let isEditing = false;
  let editingStory: UserStory = {
    title: {
      asA: '',
      iWantTo: '',
      soThat: ''
    },
    description: '',
    acceptanceCriteria: [{
      given: '',
      when: '',
      then: ''
    }]
  };
  let selectedStoryIndex = -1;
  let isCollapsed = true;

  function parseUserStory(story: string): UserStory {
    const lines = story.split('\n').filter(line => line.trim());
    const titleMatch = lines[0]?.match(/As a (.*?), I want to (.*?) so that (.*?)$/i) || [];
    
    const title = {
      asA: titleMatch[1] || '',
      iWantTo: titleMatch[2] || '',
      soThat: titleMatch[3] || ''
    };

    const acStart = lines.findIndex(line => line.toLowerCase().includes('acceptance criteria:'));
    const description = acStart > 0 ? lines.slice(1, acStart).join('\n') : '';
    
    const acceptanceCriteria = [];
    if (acStart > 0) {
      for (let i = acStart + 1; i < lines.length; i++) {
        const acMatch = lines[i].match(/Given (.*?), when (.*?), then (.*?)$/i);
        if (acMatch) {
          acceptanceCriteria.push({
            given: acMatch[1] || '',
            when: acMatch[2] || '',
            then: acMatch[3] || ''
          });
        }
      }
    }

    return { title, description, acceptanceCriteria };
  }

  function formatUserStory(story: UserStory): string {
    const title = `As a ${story.title.asA}, I want to ${story.title.iWantTo} so that ${story.title.soThat}`;
    const acs = story.acceptanceCriteria
      .map(ac => `Given ${ac.given}, when ${ac.when}, then ${ac.then}`)
      .map(ac => `- ${ac}`)
      .join('\n');

    return `${title}\n${story.description}\n\nAcceptance Criteria:\n${acs}`;
  }

  function handleEditStory(index: number) {
    selectedStoryIndex = index;
    editingStory = parseUserStory(userStories[index]);
    isEditing = true;
  }

  function handleDeleteStory(index: number) {
    const updatedStories = userStories.filter((_, i) => i !== index);
    dispatch('userStoriesChange', updatedStories);
  }

  function handleSaveStory() {
    const formattedStory = formatUserStory(editingStory);
    const updatedStories = [...userStories];
    
    if (selectedStoryIndex >= 0) {
      updatedStories[selectedStoryIndex] = formattedStory;
    } else {
      updatedStories.push(formattedStory);
    }
    
    dispatch('userStoriesChange', updatedStories);
    isEditing = false;
    editingStory = {
      title: { asA: '', iWantTo: '', soThat: '' },
      description: '',
      acceptanceCriteria: [{ given: '', when: '', then: '' }]
    };
    selectedStoryIndex = -1;
  }

  async function copyToClipboard(text: string) {
    await navigator.clipboard.writeText(text);
  }

  function getAllStoriesFormatted(): string {
    return userStories.map((story, index) => {
      const parsed = parseUserStory(story);
      const title = `As a ${parsed.title.asA}, I want to ${parsed.title.iWantTo} so that ${parsed.title.soThat}`;
      const acs = parsed.acceptanceCriteria
        .map(ac => `Given ${ac.given}, when ${ac.when}, then ${ac.then}`)
        .map(ac => `- ${ac}`)
        .join('\n');

      return `## User Story ${index + 1}

${title}

${parsed.description}

### Acceptance Criteria:
${acs}`;
    }).join('\n\n');
  }

  // Generate the user story prompt based on project details
  $: userStoryPrompt = `Help me create detailed user stories for ${projectName}. Consider these core features:
${features.map(feature => `- ${feature}`).join('\n')}

Please format each user story exactly as follows:

As a [user type/role], I want to [action/goal] so that [benefit/value]
[Additional description/context about the story]

Acceptance Criteria:
- Given [context/precondition], when [action occurs], then [expected result]
- Given [context/precondition], when [action occurs], then [expected result]
(add more acceptance criteria as needed)

Please:
1. Focus on user perspective and value
2. Consider edge cases and error scenarios
3. Make acceptance criteria specific and testable
4. Include both happy path and error scenarios

The output should be formatted exactly as shown above to allow easy copying into our user story management system.`;
</script>

<div class="space-y-6">
  <!-- User Story Generator Prompt -->
  <div class="border rounded-lg overflow-hidden">
    <div class="bg-gray-50 px-4 py-3 border-b">
      <div class="flex justify-between items-center">
        <div>
          <h3 class="text-sm font-medium text-gray-900">User Story Generator</h3>
          <p class="text-xs text-gray-500 mt-1">
            Use this prompt with an AI assistant to generate user stories
          </p>
        </div>
        <button
          on:click={() => copyToClipboard(userStoryPrompt)}
          class="inline-flex items-center px-3 py-1.5 text-sm font-medium text-indigo-600 hover:text-indigo-500"
        >
          <Copy class="h-4 w-4 mr-1" />
          Copy Prompt
        </button>
      </div>
    </div>
    <div class="p-4">
      <pre class="text-sm text-gray-600 whitespace-pre-wrap">{userStoryPrompt}</pre>
    </div>
  </div>

  {#if isEditing}
    <UserStoryForm
      bind:story={editingStory}
      on:save={handleSaveStory}
      on:cancel={() => isEditing = false}
    />
  {:else}
    <div class="border rounded-lg overflow-hidden">
      <div class="bg-gray-50 px-4 py-3 border-b">
        <div class="flex justify-between items-center">
          <div>
            <h3 class="text-sm font-medium text-gray-900">User Stories</h3>
            <p class="text-xs text-gray-500 mt-1">
              Add the generated user stories below
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
                      <h4 class="text-sm font-medium text-gray-900">
                        As a {parsed.title.asA}, I want to {parsed.title.iWantTo} so that {parsed.title.soThat}
                      </h4>
                      <p class="mt-1 text-sm text-gray-500">{parsed.description}</p>
                    </div>
                    <div>
                      <h5 class="text-xs font-medium text-gray-700">Acceptance Criteria:</h5>
                      <ul class="mt-1 space-y-1">
                        {#each parsed.acceptanceCriteria as ac}
                          <li class="flex items-start">
                            <span class="w-1.5 h-1.5 bg-indigo-400 rounded-full mt-1.5 mr-2"></span>
                            <span class="text-sm text-gray-600">
                              Given {ac.given}, when {ac.when}, then {ac.then}
                            </span>
                          </li>
                        {/each}
                      </ul>
                    </div>
                  </div>
                  <div class="flex items-start space-x-2 ml-4">
                    <button
                      on:click={() => handleEditStory(index)}
                      class="p-2 text-gray-400 hover:text-indigo-600"
                      title="Edit story"
                    >
                      <Edit class="h-5 w-5" />
                    </button>
                    <button
                      on:click={() => handleDeleteStory(index)}
                      class="p-2 text-gray-400 hover:text-red-600"
                      title="Delete story"
                    >
                      <Trash2 class="h-5 w-5" />
                    </button>
                  </div>
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
</div>