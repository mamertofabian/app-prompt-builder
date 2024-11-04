import React, { useState, useEffect } from 'react';
import { Plus, X, Copy } from 'lucide-react';
import { projectBlueprints } from '../data/projectBlueprints';
import type { ProjectType } from '../App';

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
  const [showTechPresets, setShowTechPresets] = useState(false);
  const [showFeaturePresets, setShowFeaturePresets] = useState(false);

  const blueprint = projectBlueprints[projectConfig.type];

  // Initialize with default features and tech stack when project type changes
  useEffect(() => {
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

    setProjectDetails(prev => ({
      ...prev,
      features: [...defaultFeatures, ...prev.features.filter(f => f !== '')],
      techStack: [...defaultTechStack, ...prev.techStack.filter(t => t !== '')]
    }));
  }, [projectConfig.type]);

  const addListItem = (field: 'features' | 'techStack' | 'userStories') => {
    setProjectDetails(prev => ({
      ...prev,
      [field]: [...prev[field], '']
    }));
  };

  const removeListItem = (field: 'features' | 'techStack' | 'userStories', index: number) => {
    setProjectDetails(prev => ({
      ...prev,
      [field]: prev[field].filter((_, i) => i !== index)
    }));
  };

  const updateListItem = (field: 'features' | 'techStack' | 'userStories', index: number, value: string) => {
    setProjectDetails(prev => ({
      ...prev,
      [field]: prev[field].map((item, i) => i === index ? value : item)
    }));
  };

  const addPresetOption = (field: 'features' | 'techStack', value: string) => {
    if (!projectDetails[field].includes(value)) {
      setProjectDetails(prev => ({
        ...prev,
        [field]: [...prev[field].filter(item => item !== ''), value]
      }));
    }
  };

  const getUserStoriesPrompt = () => {
    return `Help me create detailed user stories for ${projectDetails.name || '[Project Name]'}. Consider these core features:
${projectDetails.features.filter(f => f).map(f => `- ${f}`).join('\n')}

Please format them as "As a [user], I want to [action] so that [benefit]." and include acceptance criteria for each story.`;
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
  };

  return (
    <div className="space-y-6">
      <div>
        <label htmlFor="name" className="block text-sm font-medium text-gray-700">
          Project Name
        </label>
        <input
          type="text"
          id="name"
          value={projectDetails.name}
          onChange={(e) => setProjectDetails(prev => ({ ...prev, name: e.target.value }))}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
          placeholder="Enter your project name"
        />
      </div>

      <div>
        <label htmlFor="description" className="block text-sm font-medium text-gray-700">
          Project Description
        </label>
        <textarea
          id="description"
          rows={3}
          value={projectDetails.description}
          onChange={(e) => setProjectDetails(prev => ({ ...prev, description: e.target.value }))}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
          placeholder="Describe your project's purpose and goals"
        />
      </div>

      <div className="space-y-4">
        <div className="border rounded-lg overflow-hidden">
          <div className="bg-gray-50 px-4 py-3 border-b">
            <div className="flex justify-between items-center">
              <div>
                <h3 className="text-sm font-medium text-gray-900">Features</h3>
                <p className="text-xs text-gray-500 mt-1">
                  Select from recommended features or add custom ones
                </p>
              </div>
              <button
                type="button"
                onClick={() => setShowFeaturePresets(!showFeaturePresets)}
                className="text-sm text-indigo-600 hover:text-indigo-700"
              >
                {showFeaturePresets ? 'Hide presets' : 'Show presets'}
              </button>
            </div>
          </div>
          
          <div className="p-4">
            {showFeaturePresets && (
              <div className="space-y-4">
                {['core', 'optional', 'advanced'].map(category => {
                  const features = [...blueprint.defaultFeatures, ...blueprint.suggestedFeatures]
                    .filter(f => f.category === category)
                    .filter(f => {
                      if (f.requiresBackend && !projectConfig.needsBackend) return false;
                      if (f.requiresDatabase && !projectConfig.needsDatabase) return false;
                      return true;
                    });

                  if (features.length === 0) return null;

                  return (
                    <div key={category}>
                      <h4 className="text-sm font-medium text-gray-700 capitalize mb-2">
                        {category} Features
                      </h4>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                        {features.map(feature => (
                          <button
                            key={feature.id}
                            onClick={() => addPresetOption('features', feature.name)}
                            className="text-left p-3 rounded-lg border border-gray-200 hover:border-indigo-500 hover:bg-indigo-50 transition-colors"
                          >
                            <div className="font-medium text-gray-900">{feature.name}</div>
                            <div className="text-sm text-gray-500">{feature.description}</div>
                          </button>
                        ))}
                      </div>
                    </div>
                  );
                })}
              </div>
            )}

            <div className="space-y-2">
              {projectDetails.features.map((feature, index) => (
                <div key={index} className="flex gap-2">
                  <input
                    type="text"
                    value={feature}
                    onChange={(e) => updateListItem('features', index, e.target.value)}
                    className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                    placeholder="Enter feature"
                  />
                  <button
                    onClick={() => removeListItem('features', index)}
                    className="p-2 text-gray-400 hover:text-red-500"
                  >
                    <X className="h-5 w-5" />
                  </button>
                </div>
              ))}
              <button
                onClick={() => addListItem('features')}
                className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-indigo-600 bg-indigo-50 hover:bg-indigo-100"
              >
                <Plus className="h-4 w-4 mr-1" />
                Add Feature
              </button>
            </div>
          </div>
        </div>

        <div className="border rounded-lg overflow-hidden">
          <div className="bg-gray-50 px-4 py-3 border-b">
            <div className="flex justify-between items-center">
              <div>
                <h3 className="text-sm font-medium text-gray-900">Tech Stack</h3>
                <p className="text-xs text-gray-500 mt-1">
                  Choose recommended technologies or add your own
                </p>
              </div>
              <button
                type="button"
                onClick={() => setShowTechPresets(!showTechPresets)}
                className="text-sm text-indigo-600 hover:text-indigo-700"
              >
                {showTechPresets ? 'Hide presets' : 'Show presets'}
              </button>
            </div>
          </div>

          <div className="p-4">
            {showTechPresets && (
              <div className="space-y-4">
                {['frontend', 'backend', 'database', 'deployment', 'testing'].map(category => {
                  const technologies = blueprint.recommendedTechStack
                    .filter(t => t.category === category)
                    .filter(t => {
                      if (t.requiresBackend && !projectConfig.needsBackend) return false;
                      if (t.requiresDatabase && !projectConfig.needsDatabase) return false;
                      return true;
                    });

                  if (technologies.length === 0) return null;

                  return (
                    <div key={category}>
                      <h4 className="text-sm font-medium text-gray-700 capitalize mb-2">
                        {category} Technologies
                      </h4>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                        {technologies.map(tech => (
                          <button
                            key={tech.id}
                            onClick={() => addPresetOption('techStack', tech.name)}
                            className="text-left p-3 rounded-lg border border-gray-200 hover:border-indigo-500 hover:bg-indigo-50 transition-colors"
                          >
                            <div className="font-medium text-gray-900">{tech.name}</div>
                            <div className="text-sm text-gray-500">{tech.description}</div>
                          </button>
                        ))}
                      </div>
                    </div>
                  );
                })}
              </div>
            )}

            <div className="space-y-2">
              {projectDetails.techStack.map((tech, index) => (
                <div key={index} className="flex gap-2">
                  <input
                    type="text"
                    value={tech}
                    onChange={(e) => updateListItem('techStack', index, e.target.value)}
                    className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                    placeholder="Enter technology"
                  />
                  <button
                    onClick={() => removeListItem('techStack', index)}
                    className="p-2 text-gray-400 hover:text-red-500"
                  >
                    <X className="h-5 w-5" />
                  </button>
                </div>
              ))}
              <button
                onClick={() => addListItem('techStack')}
                className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-indigo-600 bg-indigo-50 hover:bg-indigo-100"
              >
                <Plus className="h-4 w-4 mr-1" />
                Add Technology
              </button>
            </div>
          </div>
        </div>

        <div className="border rounded-lg overflow-hidden">
          <div className="bg-gray-50 px-4 py-3 border-b">
            <div>
              <h3 className="text-sm font-medium text-gray-900">User Stories Generator</h3>
              <p className="text-xs text-gray-500 mt-1">
                Use this prompt to generate user stories based on your features
              </p>
            </div>
          </div>
          <div className="p-4">
            <div className="relative">
              <pre className="bg-gray-900 text-gray-100 rounded-lg p-4 overflow-x-auto text-sm">
                <code>{getUserStoriesPrompt()}</code>
              </pre>
              <button
                onClick={() => copyToClipboard(getUserStoriesPrompt())}
                className="absolute top-2 right-2 p-2 text-gray-400 hover:text-white"
                title="Copy to clipboard"
              >
                <Copy className="h-5 w-5" />
              </button>
            </div>
          </div>
        </div>

        <div className="border rounded-lg overflow-hidden">
          <div className="bg-gray-50 px-4 py-3 border-b">
            <div>
              <h3 className="text-sm font-medium text-gray-900">User Stories</h3>
              <p className="text-xs text-gray-500 mt-1">
                Add the generated user stories here
              </p>
            </div>
          </div>

          <div className="p-4">
            <div className="space-y-2">
              {projectDetails.userStories.map((story, index) => (
                <div key={index} className="flex gap-2">
                  <textarea
                    value={story}
                    onChange={(e) => updateListItem('userStories', index, e.target.value)}
                    className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                    placeholder="As a [user], I want to [action] so that [benefit]"
                    rows={2}
                  />
                  <button
                    onClick={() => removeListItem('userStories', index)}
                    className="p-2 text-gray-400 hover:text-red-500"
                  >
                    <X className="h-5 w-5" />
                  </button>
                </div>
              ))}
              <button
                onClick={() => addListItem('userStories')}
                className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-indigo-600 bg-indigo-50 hover:bg-indigo-100"
              >
                <Plus className="h-4 w-4 mr-1" />
                Add User Story
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProjectForm;