import React from 'react';
import { ProjectType } from '../App';
import { Code, Globe, Database, Smartphone } from 'lucide-react';

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
  const projectTypes = [
    {
      type: 'static' as ProjectType,
      label: 'Static Website',
      description: 'Simple website without backend requirements',
      icon: Globe,
    },
    {
      type: 'fullstack' as ProjectType,
      label: 'Full Stack Application',
      description: 'Complete application with frontend and backend',
      icon: Code,
    },
    {
      type: 'backend' as ProjectType,
      label: 'Backend Service',
      description: 'API or service without a frontend',
      icon: Database,
    },
    {
      type: 'mobile' as ProjectType,
      label: 'Mobile Application',
      description: 'Native or hybrid mobile app',
      icon: Smartphone,
    },
  ];

  const handleTypeSelect = (type: ProjectType) => {
    setProjectConfig(prev => ({
      ...prev,
      type,
      needsBackend: type !== 'static',
      needsDatabase: type === 'fullstack' || type === 'backend',
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
        {projectTypes.map(({ type, label, description, icon: Icon }) => (
          <button
            key={type}
            onClick={() => handleTypeSelect(type)}
            className={`relative rounded-lg border p-4 flex items-start space-x-4 ${
              projectConfig.type === type
                ? 'border-indigo-600 ring-2 ring-indigo-600'
                : 'border-gray-200 hover:border-indigo-400'
            }`}
          >
            <div className={`shrink-0 ${
              projectConfig.type === type ? 'text-indigo-600' : 'text-gray-600'
            }`}>
              <Icon className="h-6 w-6" />
            </div>
            <div className="text-left">
              <h3 className={`font-medium ${
                projectConfig.type === type ? 'text-indigo-600' : 'text-gray-900'
              }`}>
                {label}
              </h3>
              <p className="mt-1 text-sm text-gray-500">{description}</p>
            </div>
          </button>
        ))}
      </div>

      {projectConfig.type !== 'static' && (
        <div className="space-y-4 border-t pt-6">
          <h3 className="text-lg font-medium text-gray-900">Additional Features</h3>
          
          {projectConfig.type !== 'backend' && (
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

          {(projectConfig.type === 'fullstack' || projectConfig.type === 'backend') && (
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
        </div>
      )}
    </div>
  );
}

export default ProjectTypeSelector;