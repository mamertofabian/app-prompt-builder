import React from 'react';
import { ProjectType } from '../App';
import { projectBlueprints } from '../data/projectBlueprints';

interface ProjectTypeSelectorProps {
  projectConfig: {
    type: ProjectType;
    needsBackend: boolean;
    needsDatabase: boolean;
    needsAuthentication: boolean;
  };
  setProjectConfig: React.Dispatch<React.SetStateAction<{
    type: ProjectType;
    needsBackend: boolean;
    needsDatabase: boolean;
    needsAuthentication: boolean;
  }>>;
}

function ProjectTypeSelector({ projectConfig, setProjectConfig }: ProjectTypeSelectorProps) {
  const handleTypeSelect = (type: ProjectType) => {
    const blueprint = projectBlueprints[type];
    setProjectConfig(prev => ({
      ...prev,
      type,
      needsBackend: !!blueprint.structure.backend?.required,
      needsDatabase: !!blueprint.structure.database?.required,
      needsAuthentication: blueprint.defaultFeatures.some(f => f.id === 'auth' && f.isDefault),
    }));
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-lg font-medium text-gray-900">Select Project Type</h2>
        <p className="mt-1 text-sm text-gray-500">
          Choose the type of project you want to create
        </p>
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        {Object.values(projectBlueprints).map(blueprint => {
          const Icon = blueprint.icon;
          return (
            <button
              key={blueprint.type}
              onClick={() => handleTypeSelect(blueprint.type as ProjectType)}
              className={`relative rounded-lg border p-4 flex flex-col h-full text-left ${
                projectConfig.type === blueprint.type
                  ? 'border-indigo-600 ring-2 ring-indigo-600'
                  : 'border-gray-200 hover:border-indigo-400'
              }`}
            >
              {/* Header Section */}
              <div className="flex items-start space-x-4 mb-4">
                <div className={`shrink-0 ${
                  projectConfig.type === blueprint.type ? 'text-indigo-600' : 'text-gray-600'
                }`}>
                  <Icon className="h-6 w-6" />
                </div>
                <div className="min-w-0 flex-1">
                  <h3 className={`font-medium truncate ${
                    projectConfig.type === blueprint.type ? 'text-indigo-600' : 'text-gray-900'
                  }`}>
                    {blueprint.label}
                  </h3>
                  <p className="mt-1 text-sm text-gray-500 line-clamp-2">{blueprint.description}</p>
                </div>
              </div>

              {/* Features Section */}
              <div className="mt-auto pt-4 border-t border-gray-100">
                <h4 className="text-xs font-medium text-gray-700 uppercase tracking-wide mb-2">
                  Includes:
                </h4>
                <ul className="space-y-1">
                  {blueprint.structure.frontend && (
                    <li className="text-sm text-gray-600 flex items-center">
                      <span className="w-2 h-2 bg-indigo-400 rounded-full mr-2"></span>
                      Frontend Development
                      {blueprint.structure.frontend.required && (
                        <span className="ml-1 text-xs text-gray-400">(Required)</span>
                      )}
                    </li>
                  )}
                  {blueprint.structure.backend && (
                    <li className="text-sm text-gray-600 flex items-center">
                      <span className="w-2 h-2 bg-indigo-400 rounded-full mr-2"></span>
                      Backend Services
                      {blueprint.structure.backend.required && (
                        <span className="ml-1 text-xs text-gray-400">(Required)</span>
                      )}
                    </li>
                  )}
                  {blueprint.structure.database && (
                    <li className="text-sm text-gray-600 flex items-center">
                      <span className="w-2 h-2 bg-indigo-400 rounded-full mr-2"></span>
                      Database Integration
                      {blueprint.structure.database.required && (
                        <span className="ml-1 text-xs text-gray-400">(Required)</span>
                      )}
                    </li>
                  )}
                </ul>
              </div>
            </button>
          );
        })}
      </div>

      {projectConfig.type !== 'static' && (
        <div className="space-y-4 border-t pt-6">
          <h3 className="text-lg font-medium text-gray-900">Additional Features</h3>
          
          {!projectBlueprints[projectConfig.type].structure.backend?.required && (
            <div className="flex items-center space-x-3">
              <input
                type="checkbox"
                id="backend"
                checked={projectConfig.needsBackend}
                onChange={(e) => setProjectConfig(prev => ({
                  ...prev,
                  needsBackend: e.target.checked,
                  needsDatabase: e.target.checked && prev.needsDatabase
                }))}
                className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-600"
              />
              <label htmlFor="backend" className="text-sm text-gray-700">
                Backend Services Required
              </label>
            </div>
          )}

          {projectConfig.needsBackend && !projectBlueprints[projectConfig.type].structure.database?.required && (
            <div className="flex items-center space-x-3">
              <input
                type="checkbox"
                id="database"
                checked={projectConfig.needsDatabase}
                onChange={(e) => setProjectConfig(prev => ({
                  ...prev,
                  needsDatabase: e.target.checked
                }))}
                className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-600"
              />
              <label htmlFor="database" className="text-sm text-gray-700">
                Database Required
              </label>
            </div>
          )}

          {projectConfig.needsBackend && (
            <div className="flex items-center space-x-3">
              <input
                type="checkbox"
                id="authentication"
                checked={projectConfig.needsAuthentication}
                onChange={(e) => setProjectConfig(prev => ({
                  ...prev,
                  needsAuthentication: e.target.checked
                }))}
                className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-600"
              />
              <label htmlFor="authentication" className="text-sm text-gray-700">
                User Authentication Required
              </label>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

export default ProjectTypeSelector;