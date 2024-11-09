<script lang="ts">
  import { createEventDispatcher } from 'svelte';
  import ListEditor from './ListEditor.svelte';
  import PresetSection from './PresetSection.svelte';
  import type { TechStackItem } from '../../data/projectBlueprints';

  export let techStack: string[];
  export let availableTech: TechStackItem[];
  export let projectConfig: {
    needsBackend: boolean;
    needsDatabase: boolean;
  };

  const dispatch = createEventDispatcher<{
    techStackChange: string[];
  }>();

  let showPresets = false;

  function handleListChange(event: CustomEvent<{
    type: 'add' | 'remove' | 'update';
    index?: number;
    value?: string;
  }>) {
    const { type, index, value } = event.detail;
    let updatedTechStack: string[];

    switch (type) {
      case 'add':
        updatedTechStack = [...techStack, ''];
        break;
      case 'remove':
        updatedTechStack = techStack.filter((_, i) => i !== index);
        break;
      case 'update':
        updatedTechStack = techStack.map((item, i) => i === index ? value! : item);
        break;
      default:
        return;
    }

    dispatch('techStackChange', updatedTechStack);
  }

  function addPresetTech(value: string): void {
    if (!techStack.includes(value)) {
      dispatch('techStackChange', [...techStack.filter(t => t !== ''), value]);
    }
  }
</script>

<div class="border rounded-lg overflow-hidden">
  <div class="bg-gray-50 px-4 py-3 border-b">
    <div class="flex justify-between items-center">
      <div>
        <h3 class="text-sm font-medium text-gray-900">Tech Stack</h3>
        <p class="text-xs text-gray-500 mt-1">
          Choose recommended technologies or add your own
        </p>
      </div>
      <button
        type="button"
        on:click={() => showPresets = !showPresets}
        class="text-sm text-indigo-600 hover:text-indigo-700"
      >
        {showPresets ? 'Hide presets' : 'Show presets'}
      </button>
    </div>
  </div>

  <div class="p-4">
    {#if showPresets}
      <div class="space-y-4 mb-4">
        {#each ['frontend', 'backend', 'database', 'deployment', 'testing'] as category}
          <PresetSection
            category="{category} Technologies"
            items={availableTech.filter(t => 
              t.category === category &&
              (!t.requiresBackend || projectConfig.needsBackend) &&
              (!t.requiresDatabase || projectConfig.needsDatabase)
            )}
            onSelect={addPresetTech}
          />
        {/each}
      </div>
    {/if}

    <ListEditor
      items={techStack}
      on:listChange={handleListChange}
      placeholder="Enter technology"
    />
  </div>
</div>