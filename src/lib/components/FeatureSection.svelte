<script lang="ts">
  import ListEditor from './ListEditor.svelte';
  import PresetSection from './PresetSection.svelte';
  import type { ProjectFeature } from '../../data/projectBlueprints';

  export let features: string[];
  export let onFeaturesChange: (features: string[]) => void;
  export let availableFeatures: ProjectFeature[];
  export let projectConfig: {
    needsBackend: boolean;
    needsDatabase: boolean;
  };

  let showPresets = false;

  function addFeature(): void {
    onFeaturesChange([...features, '']);
  }

  function removeFeature(index: number): void {
    onFeaturesChange(features.filter((_, i) => i !== index));
  }

  function updateFeature(index: number, value: string): void {
    onFeaturesChange(features.map((item, i) => i === index ? value : item));
  }

  function addPresetFeature(value: string): void {
    if (!features.includes(value)) {
      onFeaturesChange([...features.filter(f => f !== ''), value]);
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
      onAdd={addFeature}
      onRemove={removeFeature}
      onChange={updateFeature}
      placeholder="Enter feature"
    />
  </div>
</div>
