<script lang="ts">
  import '../app.css';
  import { onMount } from 'svelte';
  import { validateEnv } from '$lib/config/env';
  import ErrorBanner from '$lib/components/ErrorBanner.svelte';

  let envErrors: string[] = [];
  let showErrors = true;

  onMount(() => {
    envErrors = validateEnv();
  });
</script>

{#if showErrors && envErrors.length > 0}
  <div class="fixed top-0 left-0 right-0 z-50 p-4">
    {#each envErrors as error}
      <div class="mb-2">
        <ErrorBanner
          message={error}
          onDismiss={() => showErrors = false}
        />
      </div>
    {/each}
  </div>
{/if}

<slot />