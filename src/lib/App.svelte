<script lang="ts">
  import { onMount } from 'svelte';
  import { projectBlueprints } from "../data/projectBlueprints";
  import ProjectForm from "./components/ProjectForm.svelte";
  import WizardNavigation from "./components/WizardNavigation.svelte";
  import PhaseAccordion from "./components/PhaseAccordion.svelte";
  import ProjectTypeSelector from "./components/ProjectTypeSelector.svelte";
  import GuidelinesSection from "./components/GuidelinesSection.svelte";
  import StoryDrivenPrompts from "./components/StoryDrivenPrompts.svelte";
  import ProjectManager from "./components/project/ProjectManager.svelte";
  import type { Project } from "./types/project";

  type ProjectType = keyof typeof projectBlueprints;

  let currentStep = 0;
  let projectConfig = {
    type: "static" as ProjectType,
    needsBackend: false,
    needsDatabase: false,
    needsAuthentication: false,
  };

  let projectDetails = {
    name: "",
    description: "",
    features: [""],
    techStack: [""],
    userStories: [""],
  };

  // Project management state
  let projects: Project[] = [];
  let loadingProjects = false;
  let projectError: string | null = null;
  let selectedProject: Project | null = null;

  const steps = [
    {
      title: "Project Selection",
      component: ProjectManager,
    },
    {
      title: "Project Details",
      component: ProjectForm,
    },
    {
      title: "Project Prompts",
      component: "guide",
    },
  ];

  function handleNext() {
    if (currentStep < steps.length - 1) {
      currentStep += 1;
    }
  }

  function handleBack() {
    if (currentStep > 0) {
      currentStep -= 1;
    }
  }

  function handleStepClick(index: number) {
    currentStep = index;
  }

  function handleProjectConfigUpdate(newConfig: typeof projectConfig) {
    projectConfig = newConfig;
  }

  function handleProjectSelect(event: CustomEvent<Project>) {
    selectedProject = event.detail;
    projectDetails = {
      name: selectedProject.name,
      description: selectedProject.description,
      features: selectedProject.features,
      techStack: selectedProject.techStack,
      userStories: selectedProject.userStories
    };
    projectConfig.type = selectedProject.type as ProjectType;
    handleNext();
  }

  function handleProjectCreate(event: CustomEvent<Project>) {
    projects = [...projects, event.detail];
    selectedProject = event.detail;
    handleProjectSelect(event);
  }

  function handleProjectUpdate(event: CustomEvent<Project>) {
    projects = projects.map(p => p.id === event.detail.id ? event.detail : p);
    selectedProject = event.detail;
    handleProjectSelect(event);
  }

  function handleProjectDelete(event: CustomEvent<{ id: string }>) {
    projects = projects.filter(p => p.id !== event.detail.id);
    if (selectedProject?.id === event.detail.id) {
      selectedProject = null;
      projectDetails = {
        name: "",
        description: "",
        features: [""],
        techStack: [""],
        userStories: [""],
      };
    }
  }

  // Load projects on mount
  onMount(async () => {
    loadingProjects = true;
    try {
      // Simulated API call - replace with actual API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      const storedProjects = localStorage.getItem('projects');
      if (storedProjects) {
        projects = JSON.parse(storedProjects, (key, value) => {
          if (key === 'createdAt' || key === 'updatedAt') {
            return new Date(value);
          }
          return value;
        });
      }
    } catch (error) {
      projectError = 'Failed to load projects';
    } finally {
      loadingProjects = false;
    }
  });

  // Save projects to localStorage whenever they change
  $: {
    if (projects.length > 0) {
      localStorage.setItem('projects', JSON.stringify(projects));
    }
  }
</script>

<div class="min-h-screen bg-gradient-to-br from-indigo-50 to-blue-50">
  <header class="bg-white shadow-sm border-b border-indigo-100">
    <div class="max-w-7xl mx-auto px-4 py-6">
      <h1 class="text-3xl font-bold text-gray-900">
        DevGuide Generator
      </h1>
      <p class="mt-2 text-gray-600">
        Create structured development guides and prompts for your projects
      </p>
    </div>
  </header>

  <main class="max-w-7xl mx-auto px-4 py-8">
    <div class="space-y-8">
      <WizardNavigation
        {steps}
        {currentStep}
        onStepClick={handleStepClick}
      />

      <div class="bg-white rounded-xl shadow-lg p-6">
        {#if currentStep === 0}
          <ProjectManager
            projects={projects}
            loading={loadingProjects}
            error={projectError}
            on:select={handleProjectSelect}
            on:create={handleProjectCreate}
            on:update={handleProjectUpdate}
            on:delete={handleProjectDelete}
          />
        {:else if currentStep === 1}
          <ProjectForm
            bind:projectDetails
            {projectConfig}
          />
        {:else}
          <div class="space-y-8">
            <!-- <GuidelinesSection /> -->
            <StoryDrivenPrompts
              {projectDetails}
              {projectConfig}
              onNavigateToStep={handleStepClick}
            />
          </div>
        {/if}
      </div>

      <div class="flex justify-between">
        <button
          on:click={handleBack}
          disabled={currentStep === 0}
          class="px-4 py-2 rounded-md {currentStep === 0
            ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
            : 'bg-white text-gray-600 hover:bg-gray-50'}"
        >
          Back
        </button>
        {#if currentStep < steps.length - 1}
          <button
            on:click={handleNext}
            class="px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700"
          >
            Next
          </button>
        {/if}
      </div>
    </div>
  </main>
</div>