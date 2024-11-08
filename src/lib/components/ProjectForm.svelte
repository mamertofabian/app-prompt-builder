<script lang="ts">
  import { createEventDispatcher } from 'svelte';
  import ListEditor from './ListEditor.svelte';
  import FeatureSection from './FeatureSection.svelte';
  import TechStackSection from './TechStackSection.svelte';
  import UserStoriesSection from './UserStoriesSection.svelte';
  import ProjectBasicInfo from './ProjectBasicInfo.svelte';
  import { projectBlueprints } from '../../data/projectBlueprints';

  // Props
  export let projectDetails: {
    id: string;
    name: string;
    description: string;
    features: string[];
    techStack: string[];
    userStories: string[];
  };
  export let projectConfig: {
    type: keyof typeof projectBlueprints;
    needsBackend: boolean;
    needsDatabase: boolean;
    needsAuthentication: boolean;
  };

  let isInitialLoad = true;
  const blueprint = projectBlueprints[projectConfig.type];

  // Reactive statements to handle project type changes
  $: if (projectConfig.type) {
    const defaultFeatures = blueprint.defaultFeatures
      .filter(f => f.isDefault)
      .filter(f => {
        if (f.requiresBackend && !projectConfig.needsBackend) return false;
        if (f.requiresDatabase && !projectConfig.needsDatabase) return false;
        return true;
      })
      .map(f => f.name);

    const defaultTechStack = blueprint.recommendedTechStack
      .filter(t => t.isDefault)
      .filter(t => {
        if (t.requiresBackend && !projectConfig.needsBackend) return false;
        if (t.requiresDatabase && !projectConfig.needsDatabase) return false;
        return true;
      })
      .map(t => t.name);

    if (isInitialLoad) {
      const storageKey = `project_${projectDetails.id}`;
      const storedData = localStorage.getItem(storageKey);

      if (!storedData) {
        projectDetails = {
          ...projectDetails,
          features: [...new Set([...defaultFeatures])],
          techStack: [...new Set([...defaultTechStack])],
          userStories: []
        };
      } else {
        try {
          const parsedData = JSON.parse(storedData);
          projectDetails = {
            ...projectDetails,
            features: [...new Set([...parsedData.features, ...defaultFeatures])],
            techStack: [...new Set([...parsedData.techStack, ...defaultTechStack])],
            userStories: parsedData.userStories || []
          };
        } catch (error) {
          console.error('Failed to parse stored data:', error);
          projectDetails = {
            ...projectDetails,
            features: [...new Set([...defaultFeatures])],
            techStack: [...new Set([...defaultTechStack])],
            userStories: []
          };
        }
      }
      isInitialLoad = false;
    }
  }

  // Storage handling
  $: {
    if (!isInitialLoad) {
      const storageKey = `project_${projectDetails.id}`;
      const dataToStore = {
        features: projectDetails.features,
        techStack: projectDetails.techStack,
        userStories: projectDetails.userStories
      };
      localStorage.setItem(storageKey, JSON.stringify(dataToStore));
    }
  }

  function handleNameChange(event: CustomEvent<string>) {
    projectDetails.name = event.detail;
  }

  function handleDescriptionChange(event: CustomEvent<string>) {
    projectDetails.description = event.detail;
  }
</script>

<div class="space-y-6">
  <ProjectBasicInfo
    name={projectDetails.name}
    description={projectDetails.description}
    on:nameChange={handleNameChange}
    on:descriptionChange={handleDescriptionChange}
  />

  <FeatureSection
    features={projectDetails.features}
    on:featuresChange={(e) => projectDetails.features = e.detail}
    availableFeatures={[...blueprint.defaultFeatures, ...blueprint.suggestedFeatures]}
    {projectConfig}
  />

  <TechStackSection
    techStack={projectDetails.techStack}
    on:techStackChange={(e) => projectDetails.techStack = e.detail}
    availableTech={blueprint.recommendedTechStack}
    {projectConfig}
  />

  <UserStoriesSection
    projectName={projectDetails.name}
    features={projectDetails.features}
    userStories={projectDetails.userStories}
    on:userStoriesChange={(e) => projectDetails.userStories = e.detail}
  />
</div>