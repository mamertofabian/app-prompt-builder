<script lang="ts">
  import ListEditor from './ListEditor.svelte';
  import PresetSection from './PresetSection.svelte';
  import type { TechStackItem } from '../../data/projectBlueprints';

  export let techStack: string[];
  export let onTechStackChange: (techStack: string[]) => void;
  export let availableTech: TechStackItem[];
  export let projectConfig: {
    needsBackend: boolean;
    needsDatabase: boolean;
  };

  let showPresets = false;

  function addTech(): void {
    onTechStackChange([...techStack, '']);
  }

  function removeTech(index: number): void {
    onTechStackChange(techStack.filter((_, i) => i !== index));
  }

  function updateTech(index: number, value: string): void {
    onTechStackChange(techStack.map((item, i) => i === index ? value : item));
  }

  function addPresetTech(value: string): void {
    if (!techStack.includes(value)) {
      onTechStackChange([...techStack.filter(t => t !== ''), value]);
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
      onAdd={addTech}
      onRemove={removeTech}
      onChange={updateTech}
      placeholder="Enter technology"
    />
  </div>
</div>
