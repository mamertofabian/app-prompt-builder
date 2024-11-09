<script lang="ts">
  import type { PresetOption } from '../../data/presets';

  export let options: PresetOption[];
  export let onSelect: (option: PresetOption) => void;

  $: categories = [...new Set(options.map(option => option.category))];
</script>

{#each categories as category}
  <div class="space-y-2">
    <h3 class="text-sm font-medium text-gray-500">{category}</h3>
    <div class="grid grid-cols-1 sm:grid-cols-2 gap-2">
      {#each options.filter(option => option.category === category) as option}
        <button
          on:click={() => onSelect(option)}
          class="text-left p-3 rounded-lg border border-gray-200 hover:border-indigo-500 hover:bg-indigo-50 transition-colors"
        >
          <div class="font-medium text-gray-900">{option.label}</div>
          <div class="text-sm text-gray-500">{option.description}</div>
        </button>
      {/each}
    </div>
  </div>
{/each}

<style>
  div :global(.grid) {
    display: grid;
    gap: 1rem;
    margin-top: 0.5rem;
  }
</style>
