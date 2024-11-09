<script lang="ts">
  import { AlertCircle, X } from 'lucide-svelte';
  
  export let message: string;
  export let onDismiss: () => void;
</script>

<div class="rounded-md bg-red-50 p-4">
  <div class="flex">
    <div class="flex-shrink-0">
      <AlertCircle class="h-5 w-5 text-red-400" />
    </div>
    <div class="ml-3">
      <p class="text-sm font-medium text-red-800">
        {message}
      </p>
    </div>
    <div class="ml-auto pl-3">
      <div class="-mx-1.5 -my-1.5">
        <button
          type="button"
          on:click={onDismiss}
          class="inline-flex rounded-md bg-red-50 p-1.5 text-red-500 hover:bg-red-100"
        >
          <span class="sr-only">Dismiss</span>
          <X class="h-5 w-5" />
        </button>
      </div>
    </div>
  </div>
</div>