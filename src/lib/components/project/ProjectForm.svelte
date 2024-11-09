<script lang="ts">
  import { createEventDispatcher } from 'svelte';
  import { AlertCircle } from 'lucide-svelte';
  import type { Project } from '../../types/project';
  import ProjectTypeSelector from '../ProjectTypeSelector.svelte';
  import type { ProjectType } from '../../types/project';
  import { projectBlueprints } from '../../../data/projectBlueprints';

  export let show = false;
  export let project: Project | null = null;
  export let error: string | null = null;

  const dispatch = createEventDispatcher<{
    save: {
      name: string;
      description: string;
      type: ProjectType;
      needsBackend: boolean;
      needsDatabase: boolean;
      needsAuthentication: boolean;
    };
    cancel: void;
  }>();

  let form = {
    name: '',
    description: ''
  };

  let projectConfig = {
    type: 'static' as ProjectType,
    needsBackend: false,
    needsDatabase: false,
    needsAuthentication: false,
  };

  $: if (project) {
    form = {
      name: project.name,
      description: project.description
    };
    projectConfig = {
      type: project.type as ProjectType,
      needsBackend: project.features.some(f => 
        projectBlueprints[project.type].defaultFeatures.some(df => 
          df.name === f && df.requiresBackend
        )
      ),
      needsDatabase: project.features.some(f => 
        projectBlueprints[project.type].defaultFeatures.some(df => 
          df.name === f && df.requiresDatabase
        )
      ),
      needsAuthentication: project.features.some(f => f.includes('authentication')),
    };
  }

  function handleSubmit() {
    dispatch('save', {
      name: form.name.trim(),
      description: form.description.trim(),
      ...projectConfig
    });
  }

  function handleProjectConfigUpdate(newConfig: typeof projectConfig) {
    projectConfig = newConfig;
  }
</script>

{#if show}
  <div class="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
  <div class="fixed inset-0 z-10 overflow-y-auto">
    <div class="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
      <div class="relative transform overflow-hidden rounded-lg bg-white px-4 pb-4 pt-5 text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-4xl sm:p-6">
        <div class="space-y-4">
          <h3 class="text-lg font-medium text-gray-900">
            {project ? 'Edit Project' : 'Create New Project'}
          </h3>

          {#if error}
            <div class="rounded-md bg-red-50 p-4">
              <div class="flex">
                <AlertCircle class="h-5 w-5 text-red-400" />
                <div class="ml-3">
                  <p class="text-sm text-red-700">{error}</p>
                </div>
              </div>
            </div>
          {/if}

          <div class="space-y-6">
            <div class="space-y-4">
              <div>
                <label for="project-name" class="block text-sm font-medium text-gray-700">
                  Project Name
                </label>
                <input
                  type="text"
                  id="project-name"
                  bind:value={form.name}
                  class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                  placeholder="Enter project name"
                />
              </div>

              <div>
                <label for="project-description" class="block text-sm font-medium text-gray-700">
                  Description
                </label>
                <textarea
                  id="project-description"
                  bind:value={form.description}
                  rows="3"
                  class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                  placeholder="Enter project description"
                />
              </div>
            </div>

            <div class="border-t pt-6">
              <ProjectTypeSelector
                projectConfig={projectConfig}
                onProjectConfigUpdate={handleProjectConfigUpdate}
              />
            </div>
          </div>
        </div>

        <div class="mt-6 sm:grid sm:grid-flow-row-dense sm:grid-cols-2 sm:gap-3">
          <button
            type="button"
            on:click={handleSubmit}
            class="inline-flex w-full justify-center rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 sm:col-start-2"
          >
            {project ? 'Save Changes' : 'Create Project'}
          </button>
          <button
            type="button"
            on:click={() => dispatch('cancel')}
            class="mt-3 inline-flex w-full justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 sm:col-start-1 sm:mt-0"
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  </div>
{/if}