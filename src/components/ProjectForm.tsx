import React, { useEffect, useState } from 'react';
import { projectBlueprints } from '../data/projectBlueprints';
import type { ProjectType } from '../App';
import ProjectBasicInfo from './forms/ProjectBasicInfo';
import FeatureSection from './forms/FeatureSection';
import TechStackSection from './forms/TechStackSection';
import UserStoriesSection from './forms/UserStoriesSection';
import { useProjectTypeStorage } from '../hooks/useProjectTypeStorage';

interface ProjectFormProps {
  projectDetails: {
    name: string;
    description: string;
    features: string[];
    techStack: string[];
    userStories: string[];
  };
  setProjectDetails: React.Dispatch<React.SetStateAction<{
    name: string;
    description: string;
    features: string[];
    techStack: string[];
    userStories: string[];
  }>>;
  projectConfig: {
    type: ProjectType;
    needsBackend: boolean;
    needsDatabase: boolean;
    needsAuthentication: boolean;
  };
}

function ProjectForm({ projectDetails, setProjectDetails, projectConfig }: ProjectFormProps) {
  const blueprint = projectBlueprints[projectConfig.type];
  const [isInitialLoad, setIsInitialLoad] = useState(true);

  // Use the storage hook to handle per-project type data persistence
  useProjectTypeStorage(
    projectConfig.type,
    {
      features: projectDetails.features,
      techStack: projectDetails.techStack,
      userStories: projectDetails.userStories
    },
    (storedData) => {
      setProjectDetails(prev => ({
        ...prev,
        ...storedData
      }));
    },
    isInitialLoad
  );

  // Initialize with default features and tech stack when project type changes
  useEffect(() => {
    setIsInitialLoad(true);

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

    // Try to load stored data for this project type
    const storageKey = `project_type_${projectConfig.type}`;
    const storedData = localStorage.getItem(storageKey);

    if (!storedData) {
      // If no stored data exists, apply defaults
      setProjectDetails(prev => ({
        ...prev,
        features: [...new Set([...defaultFeatures])],
        techStack: [...new Set([...defaultTechStack])],
        userStories: []
      }));
    } else {
      // If stored data exists, merge with defaults
      try {
        const parsedData = JSON.parse(storedData);
        setProjectDetails(prev => ({
          ...prev,
          features: [...new Set([...parsedData.features, ...defaultFeatures])],
          techStack: [...new Set([...parsedData.techStack, ...defaultTechStack])],
          userStories: parsedData.userStories || []
        }));
      } catch (error) {
        console.error('Failed to parse stored data:', error);
        setProjectDetails(prev => ({
          ...prev,
          features: [...new Set([...defaultFeatures])],
          techStack: [...new Set([...defaultTechStack])],
          userStories: []
        }));
      }
    }

    setIsInitialLoad(false);
  }, [projectConfig.type, projectConfig.needsBackend, projectConfig.needsDatabase]);

  return (
    <div className="space-y-6">
      <ProjectBasicInfo
        name={projectDetails.name}
        description={projectDetails.description}
        onNameChange={(name) => setProjectDetails(prev => ({ ...prev, name }))}
        onDescriptionChange={(description) => setProjectDetails(prev => ({ ...prev, description }))}
      />

      <FeatureSection
        features={projectDetails.features}
        onFeaturesChange={(features) => setProjectDetails(prev => ({ ...prev, features }))}
        availableFeatures={[...blueprint.defaultFeatures, ...blueprint.suggestedFeatures]}
        projectConfig={projectConfig}
      />

      <TechStackSection
        techStack={projectDetails.techStack}
        onTechStackChange={(techStack) => setProjectDetails(prev => ({ ...prev, techStack }))}
        availableTech={blueprint.recommendedTechStack}
        projectConfig={projectConfig}
      />

      <UserStoriesSection
        projectName={projectDetails.name}
        features={projectDetails.features}
        userStories={projectDetails.userStories}
        onUserStoriesChange={(userStories) => setProjectDetails(prev => ({ ...prev, userStories }))}
      />
    </div>
  );
}

export default ProjectForm;