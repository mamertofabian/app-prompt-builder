<script lang="ts">
  import { onMount } from 'svelte';
  import { phases } from "../data/phases";
  import ProjectForm from "../components/ProjectForm.svelte";
  import WizardNavigation from "../components/WizardNavigation.svelte";
  import PhaseAccordion from "../components/PhaseAccordion.svelte";
  import ProjectTypeSelector from "../components/ProjectTypeSelector.svelte";
  import GuidelinesSection from "../components/GuidelinesSection.svelte";
  import StoryDrivenPrompts from "../components/StoryDrivenPrompts.svelte";
  import { projectBlueprints } from "../data/projectBlueprints";

  type ProjectType = keyof typeof projectBlueprints;

  interface ProjectConfig {
    type: ProjectType;
    needsBackend: boolean;
    needsDatabase: boolean;
    needsAuthentication: boolean;
  }

  let currentStep = 0;
  let projectConfig: ProjectConfig = {
    type: "static",
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

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
  };

  const steps = [
    {
      title: "Project Type",
      component: ProjectTypeSelector,
    },
    {
      title: "Project Details",
      component: ProjectForm,
    },
    {
      title: "Development Guide",
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

  $: filteredPhases = phases.filter((phase) => {
    if (phase.title === "Project Definition") return true;
    if (phase.title === "Backend Development") {
      return projectConfig.needsBackend;
    }
    return false;
  });

  $: deploymentPhases = phases.filter((phase) => {
    if (
      phase.title === "Testing & Deployment" ||
      phase.title === "Debugging & Optimization"
    )
      return true;
    return false;
  });
</script>

<div class="min-h-screen bg-gradient-to-br from-indigo-50 to-blue-50">
  <header class="bg-white shadow-sm border-b border-indigo-100">
    <div class="max-w-7xl mx-auto px-4 py-6">
      <h1 class="text-3xl font-bold text-gray-900">
        AI Prompt Architect
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
          <ProjectTypeSelector
            bind:projectConfig
          />
        {:else if currentStep === 1}
          <ProjectForm
            bind:projectDetails
            {projectConfig}
          />
        {:else}
          <div class="space-y-8">
            <GuidelinesSection />

            <div class="space-y-6">
              <div>
                <h2 class="text-lg font-medium text-gray-900">
                  Project Setup & Structure
                </h2>
                <p class="mt-1 text-sm text-gray-500">
                  Initial project setup and architecture guidelines
                </p>
              </div>

              <PhaseAccordion
                phases={filteredPhases}
                {projectDetails}
                {projectConfig}
                onCopy={copyToClipboard}
                expandAll={true}
              />
            </div>

            <div class="space-y-6">
              <div>
                <h2 class="text-lg font-medium text-gray-900">
                  Story-Driven Development
                </h2>
                <p class="mt-1 text-sm text-gray-500">
                  Select a user story to get phase-specific development prompts
                </p>
              </div>

              <StoryDrivenPrompts
                {projectDetails}
                {projectConfig}
              />
            </div>

            <div class="space-y-6">
              <div>
                <h2 class="text-lg font-medium text-gray-900">
                  Deployment & Operations
                </h2>
                <p class="mt-1 text-sm text-gray-500">
                  Guidelines for deploying and maintaining your application
                </p>
              </div>

              <PhaseAccordion
                phases={deploymentPhases}
                {projectDetails}
                {projectConfig}
                onCopy={copyToClipboard}
                expandAll={true}
              />
            </div>
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
