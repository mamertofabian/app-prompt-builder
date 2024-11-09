<script lang="ts">
  import { Plus, Edit2, Trash2, AlertCircle } from 'lucide-svelte';
  import type { Project } from '../../types/project';

  export let projects: Project[] = [];
  export let loading = false;
  export let error: string | null = null;
  export let selectedProjectId: string | null = null;

  export let onCreateClick: () => void;
  export let onEditClick: (project: Project) => void;
  export let onDeleteClick: (project: Project) => void;
  export let onProjectSelect: (project: Project) => void;
  export let onRetry: () => void;

  function formatDate(date: Date): string {
    return new Intl.DateTimeFormat('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    }).format(date);
  }
</script>

<div class="space-y-6">
  <div class="flex justify-between items-center">
    <h2 class="text-2xl font-bold text-gray-900">Projects</h2>
    <button
      on:click={onCreateClick}
      class="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
    >
      <Plus class="h-4 w-4 mr-2" />
      New Project
    </button>
  </div>

  {#if loading}
    <div class="text-center py-12">
      <div class="inline-block animate-spin rounded-full h-8 w-8 border-4 border-indigo-600 border-r-transparent"></div>
      <p class="mt-2 text-sm text-gray-500">Loading projects...</p>
    </div>
  {:else if error}
    <div class="bg-red-50 border border-red-200 rounded-lg p-4">
      <div class="flex items-start">
        <AlertCircle class="h-5 w-5 text-red-500 mt-0.5" />
        <div class="ml-3">
          <h3 class="text-sm font-medium text-red-800">Error loading projects</h3>
          <p class="mt-1 text-sm text-red-700">{error}</p>
          <button
            on:click={onRetry}
            class="mt-2 text-sm font-medium text-red-600 hover:text-red-500"
          >
            Retry
          </button>
        </div>
      </div>
    </div>
  {:else if projects.length === 0}
    <div class="text-center py-12 bg-gray-50 rounded-lg">
      <h3 class="text-lg font-medium text-gray-900">No projects yet</h3>
      <p class="mt-2 text-sm text-gray-500">Create your first project to get started</p>
      <button
        on:click={onCreateClick}
        class="mt-4 inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700"
      >
        <Plus class="h-4 w-4 mr-2" />
        Create Project
      </button>
    </div>
  {:else}
    <div class="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
      {#each projects as project (project.id)}
        <div 
          class="bg-white rounded-lg border cursor-pointer transition-all duration-200 {
            selectedProjectId === project.id 
              ? 'border-indigo-600 ring-2 ring-indigo-600 shadow-md' 
              : 'border-gray-200 hover:border-indigo-300 hover:shadow-md'
          }"
          on:click={() => onProjectSelect(project)}
          on:keydown={(e) => e.key === 'Enter' && onProjectSelect(project)}
          role="button"
          tabindex="0"
        >
          <div class="p-6">
            <div class="flex justify-between items-start">
              <div>
                <h3 class="text-lg font-medium text-gray-900">{project.name}</h3>
                <p class="mt-1 text-sm text-gray-500">{project.description}</p>
              </div>
              <div class="flex space-x-2">
                <button
                  on:click={(e) => {
                    e.stopPropagation();
                    onEditClick(project);
                  }}
                  class="p-2 text-gray-400 hover:text-indigo-600"
                  title="Edit project"
                >
                  <Edit2 class="h-5 w-5" />
                </button>
                <button
                  on:click={(e) => {
                    e.stopPropagation();
                    onDeleteClick(project);
                  }}
                  class="p-2 text-gray-400 hover:text-red-600"
                  title="Delete project"
                >
                  <Trash2 class="h-5 w-5" />
                </button>
              </div>
            </div>
            <div class="mt-4 text-xs text-gray-500">
              <p>Created: {formatDate(project.createdAt)}</p>
              <p>Updated: {formatDate(project.updatedAt)}</p>
            </div>
          </div>
        </div>
      {/each}
    </div>
  {/if}
</div>