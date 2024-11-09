<script lang="ts">
  import { createEventDispatcher } from 'svelte';
  import ListEditor from './ListEditor.svelte';
  import PresetSection from './PresetSection.svelte';
  import type { ProjectFeature } from '../../data/projectBlueprints';

  export let features: string[];
  export let availableFeatures: ProjectFeature[];
  export let projectConfig: {
    needsBackend: boolean;
    needsDatabase: boolean;
  };

  const dispatch = createEventDispatcher<{
    featuresChange: string[];
  }>();

  let showPresets = false;

  function handleListChange(event: CustomEvent<{
    type: 'add' | 'remove' | 'update';
    index?: number;
    value?: string;
  }>) {
    const { type, index, value } = event.detail;
    let updatedFeatures: string[];

    switch (type) {
      case 'add':
        updatedFeatures = [...features, ''];
        break;
      case 'remove':
        updatedFeatures = features.filter((_, i) => i !== index);
        break;
      case 'update':
        updatedFeatures = features.map((item, i) => i === index ? value! : item);
        break;
      default:
        return;
    }

    dispatch('featuresChange', updatedFeatures);
  }

  function addPresetFeature(value: string): void {
    if (!features.includes(value)) {
      dispatch('featuresChange', [...features.filter(f => f !== ''), value]);
    }
  }
</script>

<div class="border rounded-lg overflow-hidden">
  <div class="bg-gray-50 px-4 py-3 border-b">
    <div class="flex justify-between items-center">
      <div>
        <h3 class="text-sm font-medium text-gray-900">Features</h3>
        <p class="text-xs text-gray-500 mt-1">
          Select from recommended features or add custom ones
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
        {#each ['core', 'optional', 'advanced'] as category}
          <PresetSection
            category="{category} Features"
            items={availableFeatures.filter(f => 
              f.category === category &&
              (!f.requiresBackend || projectConfig.needsBackend) &&
              (!f.requiresDatabase || projectConfig.needsDatabase)
            )}
            onSelect={addPresetFeature}
          />
        {/each}
      </div>
    {/if}

    <ListEditor
      items={features}
      on:listChange={handleListChange}
      placeholder="Enter feature"
    />
  </div>
</div>