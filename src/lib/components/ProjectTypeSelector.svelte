<script lang="ts">
  import type { ProjectType } from '../App';
  import { projectBlueprints } from '../data/projectBlueprints';

  export let projectConfig: {
    type: ProjectType;
    needsBackend: boolean;
    needsDatabase: boolean;
    needsAuthentication: boolean;
  };

  export let setProjectConfig: (value: typeof projectConfig) => void;

  function handleTypeSelect(type: ProjectType) {
    const blueprint = projectBlueprints[type];
    setProjectConfig({
      ...projectConfig,
      type,
      needsBackend: !!blueprint.structure.backend?.required,
      needsDatabase: !!blueprint.structure.database?.required,
      needsAuthentication: blueprint.defaultFeatures.some(f => f.id === 'auth' && f.isDefault),
    });
  }
</script>

<div class="space-y-6">
  <div>
    <h2 class="text-lg font-medium text-gray-900">Select Project Type</h2>
    <p class="mt-1 text-sm text-gray-500">
      Choose the type of project you want to create
    </p>
  </div>

  <div class="grid grid-cols-1 gap-4 sm:grid-cols-2">
    {#each Object.values(projectBlueprints) as blueprint}
      {@const Icon = blueprint.icon}
      <button
        on:click={() => handleTypeSelect(blueprint.type as ProjectType)}
        class="relative rounded-lg border p-4 flex flex-col h-full text-left"
        class:border-indigo-600={projectConfig.type === blueprint.type}
        class:ring-2={projectConfig.type === blueprint.type}
        class:ring-indigo-600={projectConfig.type === blueprint.type}
        class:border-gray-200={projectConfig.type !== blueprint.type}
        class:hover:border-indigo-400={projectConfig.type !== blueprint.type}
      >
        <!-- Header Section -->
        <div class="flex items-start space-x-4 mb-4">
          <div class="shrink-0" class:text-indigo-600={projectConfig.type === blueprint.type} class:text-gray-600={projectConfig.type !== blueprint.type}>
            <svelte:component this={Icon} class="h-6 w-6" />
          </div>
          <div class="min-w-0 flex-1">
            <h3 class="font-medium truncate" class:text-indigo-600={projectConfig.type === blueprint.type} class:text-gray-900={projectConfig.type !== blueprint.type}>
              {blueprint.label}
            </h3>
            <p class="mt-1 text-sm text-gray-500 line-clamp-2">{blueprint.description}</p>
          </div>
        </div>

        <!-- Features Section -->
        <div class="mt-auto pt-4 border-t border-gray-100">
          <h4 class="text-xs font-medium text-gray-700 uppercase tracking-wide mb-2">
            Includes:
          </h4>
          <ul class="space-y-1">
            {#if blueprint.structure.frontend}
              <li class="text-sm text-gray-600 flex items-center">
                <span class="w-2 h-2 bg-indigo-400 rounded-full mr-2"></span>
                Frontend Development
                {#if blueprint.structure.frontend.required}
                  <span class="ml-1 text-xs text-gray-400">(Required)</span>
                {/if}
              </li>
            {/if}
            {#if blueprint.structure.backend}
              <li class="text-sm text-gray-600 flex items-center">
                <span class="w-2 h-2 bg-indigo-400 rounded-full mr-2"></span>
                Backend Services
                {#if blueprint.structure.backend.required}
                  <span class="ml-1 text-xs text-gray-400">(Required)</span>
                {/if}
              </li>
            {/if}
            {#if blueprint.structure.database}
              <li class="text-sm text-gray-600 flex items-center">
                <span class="w-2 h-2 bg-indigo-400 rounded-full mr-2"></span>
                Database Integration
                {#if blueprint.structure.database.required}
                  <span class="ml-1 text-xs text-gray-400">(Required)</span>
                {/if}
              </li>
            {/if}
          </ul>
        </div>
      </button>
    {/each}
  </div>

  {#if projectConfig.type !== 'static'}
    <div class="space-y-4 border-t pt-6">
      <h3 class="text-lg font-medium text-gray-900">Additional Features</h3>
      
      {#if !projectBlueprints[projectConfig.type].structure.backend?.required}
        <div class="flex items-center space-x-3">
          <input
            type="checkbox"
            id="backend"
            checked={projectConfig.needsBackend}
            on:change={(e) => setProjectConfig({
              ...projectConfig,
              needsBackend: e.currentTarget.checked,
              needsDatabase: e.currentTarget.checked && projectConfig.needsDatabase
            })}
            class="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-600"
          />
          <label for="backend" class="text-sm text-gray-700">
            Backend Services Required
          </label>
        </div>
      {/if}

      {#if projectConfig.needsBackend && !projectBlueprints[projectConfig.type].structure.database?.required}
        <div class="flex items-center space-x-3">
          <input
            type="checkbox"
            id="database"
            checked={projectConfig.needsDatabase}
            on:change={(e) => setProjectConfig({
              ...projectConfig,
              needsDatabase: e.currentTarget.checked
            })}
            class="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-600"
          />
          <label for="database" class="text-sm text-gray-700">
            Database Required
          </label>
        </div>
      {/if}

      {#if projectConfig.needsBackend}
        <div class="flex items-center space-x-3">
          <input
            type="checkbox"
            id="authentication"
            checked={projectConfig.needsAuthentication}
            on:change={(e) => setProjectConfig({
              ...projectConfig,
              needsAuthentication: e.currentTarget.checked
            })}
            class="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-600"
          />
          <label for="authentication" class="text-sm text-gray-700">
            User Authentication Required
          </label>
        </div>
      {/if}
    </div>
  {/if}
</div>
