<script lang="ts">
  import { createEventDispatcher } from 'svelte';
  import type { Project } from '../../types/project';
  import ProjectList from './ProjectList.svelte';
  import ProjectForm from './ProjectForm.svelte';
  import DeleteDialog from './DeleteDialog.svelte';
  import { projectBlueprints } from '../../../data/projectBlueprints';

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
    create: Project;
    update: Project;
    delete: { id: string };
    retry: void;
    select: Project;
  }>();

  function handleCreateClick() {
    formError = null;
    showCreateForm = true;
  }

  function handleEditClick(project: Project) {
    editingProject = project;
    formError = null;
    showEditForm = true;
  }

  function handleDeleteClick(project: Project) {
    deletingProject = project;
    showDeleteDialog = true;
  }

  function handleFormSave(event: CustomEvent<{
    name: string;
    description: string;
    type: string;
    needsBackend: boolean;
    needsDatabase: boolean;
    needsAuthentication: boolean;
  }>) {
    const { name, description, type, needsBackend, needsDatabase, needsAuthentication } = event.detail;

    if (!name.trim()) {
      formError = 'Project name is required';
      return;
    }

    if (showCreateForm && projects.some(p => p.name === name.trim())) {
      formError = 'Project name must be unique';
      return;
    }

    const blueprint = projectBlueprints[type];
    const defaultFeatures = blueprint.defaultFeatures
      .filter(f => f.isDefault)
      .filter(f => {
        if (f.requiresBackend && !needsBackend) return false;
        if (f.requiresDatabase && !needsDatabase) return false;
        return true;
      })
      .map(f => f.name);

    const defaultTechStack = blueprint.recommendedTechStack
      .filter(t => t.isDefault)
      .filter(t => {
        if (t.requiresBackend && !needsBackend) return false;
        if (t.requiresDatabase && !needsDatabase) return false;
        return true;
      })
      .map(t => t.name);

    if (showCreateForm) {
      const newProject: Project = {
        id: crypto.randomUUID(),
        name: name.trim(),
        description: description.trim(),
        type,
        features: defaultFeatures,
        techStack: defaultTechStack,
        userStories: [],
        createdAt: new Date(),
        updatedAt: new Date(),
        userId: '1', // Replace with actual user ID
      };
      dispatch('create', newProject);
      showCreateForm = false;
    } else if (showEditForm && editingProject) {
      const updatedProject: Project = {
        ...editingProject,
        name: name.trim(),
        description: description.trim(),
        type,
        features: defaultFeatures,
        techStack: defaultTechStack,
        updatedAt: new Date(),
      };
      dispatch('update', updatedProject);
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

  function handleProjectClick(project: Project) {
    dispatch('select', project);
  }
</script>

<ProjectList
  {projects}
  {loading}
  {error}
  onCreateClick={handleCreateClick}
  onEditClick={handleEditClick}
  onDeleteClick={handleDeleteClick}
  onRetry={() => dispatch('retry')}
/>

<ProjectForm
  show={showCreateForm || showEditForm}
  project={editingProject}
  error={formError}
  on:save={handleFormSave}
  on:cancel={() => {
    showCreateForm = false;
    showEditForm = false;
    editingProject = null;
    formError = null;
  }}
/>

<DeleteDialog
  show={showDeleteDialog}
  project={deletingProject}
  on:confirm={handleDeleteConfirm}
  on:cancel={() => {
    showDeleteDialog = false;
    deletingProject = null;
  }}
/>