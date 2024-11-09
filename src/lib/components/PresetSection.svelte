<script lang="ts">
  import type { ProjectFeature, TechStackItem } from '../../data/projectBlueprints';

  export let items: (ProjectFeature | TechStackItem)[] = [];
  export let category: string;
  export let onSelect: (value: string) => void;
</script>

{#if items.length > 0}
  <div>
    <h4 class="text-sm font-medium text-gray-700 capitalize mb-2">
      {category}
    </h4>
    <div class="grid grid-cols-1 sm:grid-cols-2 gap-2">
      {#each items as item (item.id)}
        <button
          on:click={() => onSelect(item.name)}
          class="text-left p-3 rounded-lg border border-gray-200 hover:border-indigo-500 hover:bg-indigo-50 transition-colors"
        >
          <div class="font-medium text-gray-900">{item.name}</div>
          <div class="text-sm text-gray-500">{item.description}</div>
        </button>
      {/each}
    </div>
  </div>
{/if}
