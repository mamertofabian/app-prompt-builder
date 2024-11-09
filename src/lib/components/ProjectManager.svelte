<script lang="ts">
  import { createEventDispatcher } from 'svelte';
  import { Plus, Edit2, Trash2, AlertCircle } from 'lucide-svelte';

  interface Project {
    id: string;
    name: string;
    description: string;
    createdAt: Date;
    updatedAt: Date;
    userId: string;
  }

  export let projects: Project[] = [];
  export let loading = false;
  export let error: string | null = null;

  let showCreateForm = false;
  let showEditForm = false;
  let showDeleteDialog = false;
  let editingProject: Project | null = null;
  let deletingProject: Project | null = null;
  let formError: string | null = null;

  const dispatch = createEventDispatcher<{
    create: { name: string; description: string };
    update: { id: string; name: string; description: string };
    delete: { id: string };
    retry: void;
  }>();

  let projectForm = {
    name: '',
    description: ''
  };

  function handleCreateClick() {
    projectForm = { name: '', description: '' };
    formError = null;
    showCreateForm = true;
  }

  function handleEditClick(project: Project) {
    editingProject = project;
    projectForm = {
      name: project.name,
      description: project.description
    };
    formError = null;
    showEditForm = true;
  }

  function handleDeleteClick(project: Project) {
    deletingProject = project;
    showDeleteDialog = true;
  }

  function validateForm(): boolean {
    if (!projectForm.name.trim()) {
      formError = 'Project name is required';
      return false;
    }
    
    if (showCreateForm && projects.some(p => p.name === projectForm.name.trim())) {
      formError = 'Project name must be unique';
      return false;
    }
    
    return true;
  }

  function handleSubmit() {
    if (!validateForm()) return;

    if (showCreateForm) {
      dispatch('create', {
        name: projectForm.name.trim(),
        description: projectForm.description.trim()
      });
      showCreateForm = false;
    } else if (showEditForm && editingProject) {
      dispatch('update', {
        id: editingProject.id,
        name: projectForm.name.trim(),
        description: projectForm.description.trim()
      });
      showEditForm = false;
      editingProject = null;
    }
  }

  function handleDeleteConfirm() {
    if (deletingProject) {
      dispatch('delete', { id: deletingProject.id });
      showDeleteDialog = false;
      deletingProject = null;
    }
  }

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

<!-- Project List -->
<div class="space-y-6">
  <div class="flex justify-between items-center">
    <h2 class="text-2xl font-bold text-gray-900">Projects</h2>
    <button
      on:click={handleCreateClick}
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
            on:click={() => dispatch('retry')}
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
        on:click={handleCreateClick}
        class="mt-4 inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700"
      >
        <Plus class="h-4 w-4 mr-2" />
        Create Project
      </button>
    </div>
  {:else}
    <div class="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
      {#each projects as project (project.id)}
        <div class="bg-white rounded-lg border border-gray-200 shadow-sm hover:shadow-md transition-shadow">
          <div class="p-6">
            <div class="flex justify-between items-start">
              <div>
                <h3 class="text-lg font-medium text-gray-900">{project.name}</h3>
                <p class="mt-1 text-sm text-gray-500">{project.description}</p>
              </div>
              <div class="flex space-x-2">
                <button
                  on:click={() => handleEditClick(project)}
                  class="p-2 text-gray-400 hover:text-indigo-600"
                  title="Edit project"
                >
                  <Edit2 class="h-5 w-5" />
                </button>
                <button
                  on:click={() => handleDeleteClick(project)}
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

<!-- Create/Edit Form Modal -->
{#if showCreateForm || showEditForm}
  <div class="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
  <div class="fixed inset-0 z-10 overflow-y-auto">
    <div class="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
      <div class="relative transform overflow-hidden rounded-lg bg-white px-4 pb-4 pt-5 text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg sm:p-6">
        <div class="space-y-4">
          <h3 class="text-lg font-medium text-gray-900">
            {showCreateForm ? 'Create New Project' : 'Edit Project'}
          </h3>

          {#if formError}
            <div class="rounded-md bg-red-50 p-4">
              <div class="flex">
                <AlertCircle class="h-5 w-5 text-red-400" />
                <div class="ml-3">
                  <p class="text-sm text-red-700">{formError}</p>
                </div>
              </div>
            </div>
          {/if}

          <div class="space-y-4">
            <div>
              <label for="project-name" class="block text-sm font-medium text-gray-700">
                Project Name
              </label>
              <input
                type="text"
                id="project-name"
                bind:value={projectForm.name}
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
                bind:value={projectForm.description}
                rows="3"
                class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                placeholder="Enter project description"
              />
            </div>
          </div>
        </div>

        <div class="mt-5 sm:mt-6 sm:grid sm:grid-flow-row-dense sm:grid-cols-2 sm:gap-3">
          <button
            type="button"
            on:click={handleSubmit}
            class="inline-flex w-full justify-center rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 sm:col-start-2"
          >
            {showCreateForm ? 'Create Project' : 'Save Changes'}
          </button>
          <button
            type="button"
            on:click={() => {
              showCreateForm = false;
              showEditForm = false;
              editingProject = null;
              formError = null;
            }}
            class="mt-3 inline-flex w-full justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 sm:col-start-1 sm:mt-0"
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  </div>
{/if}

<!-- Delete Confirmation Dialog -->
{#if showDeleteDialog && deletingProject}
  <div class="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
  <div class="fixed inset-0 z-10 overflow-y-auto">
    <div class="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
      <div class="relative transform overflow-hidden rounded-lg bg-white px-4 pb-4 pt-5 text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg sm:p-6">
        <div class="sm:flex sm:items-start">
          <div class="mx-auto flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full bg-red-100 sm:mx-0 sm:h-10 sm:w-10">
            <AlertCircle class="h-6 w-6 text-red-600" />
          </div>
          <div class="mt-3 text-center sm:ml-4 sm:mt-0 sm:text-left">
            <h3 class="text-lg font-medium text-gray-900">
              Delete Project
            </h3>
            <div class="mt-2">
              <p class="text-sm text-gray-500">
                Are you sure you want to delete "{deletingProject.name}"? This action cannot be undone,
                and all prompts associated with this project will be permanently removed.
              </p>
            </div>
          </div>
        </div>
        <div class="mt-5 sm:mt-4 sm:flex sm:flex-row-reverse">
          <button
            type="button"
            on:click={handleDeleteConfirm}
            class="inline-flex w-full justify-center rounded-md bg-red-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-red-500 sm:ml-3 sm:w-auto"
          >
            Delete
          </button>
          <button
            type="button"
            on:click={() => {
              showDeleteDialog = false;
              deletingProject = null;
            }}
            class="mt-3 inline-flex w-full justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 sm:mt-0 sm:w-auto"
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  </div>
{/if}

<style>
  /* Add any component-specific styles here */
</style>