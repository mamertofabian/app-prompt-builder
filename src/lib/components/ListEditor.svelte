<script lang="ts">
  import { createEventDispatcher } from 'svelte';
  import { Plus, X } from 'lucide-svelte';

  export let items: string[] = [];
  export let placeholder: string = '';
  export let inputType: 'input' | 'textarea' = 'input';
  export let rows: number = 2;

  const dispatch = createEventDispatcher<{
    listChange: {
      type: 'add' | 'remove' | 'update';
      index?: number;
      value?: string;
    };
  }>();

  function handleAdd() {
    dispatch('listChange', { type: 'add' });
  }

  function handleRemove(index: number) {
    dispatch('listChange', { type: 'remove', index });
  }

  function handleChange(index: number, value: string) {
    dispatch('listChange', { type: 'update', index, value });
  }
</script>

<div class="space-y-2">
  {#each items as item, index}
    <div class="flex gap-2">
      {#if inputType === 'textarea'}
        <textarea
          value={item}
          on:input={(e) => handleChange(index, e.currentTarget.value)}
          class="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
          {placeholder}
          {rows}
        />
      {:else}
        <input
          type="text"
          value={item}
          on:input={(e) => handleChange(index, e.currentTarget.value)}
          class="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
          {placeholder}
        />
      {/if}
      <button
        on:click={() => handleRemove(index)}
        class="p-2 text-gray-400 hover:text-red-500"
      >
        <X class="h-5 w-5" />
      </button>
    </div>
  {/each}
  <button
    on:click={handleAdd}
    class="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-indigo-600 bg-indigo-50 hover:bg-indigo-100"
  >
    <Plus class="h-4 w-4 mr-1" />
    Add Item
  </button>
</div>