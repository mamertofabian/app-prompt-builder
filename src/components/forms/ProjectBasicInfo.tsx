import React from 'react';

interface ProjectBasicInfoProps {
  name: string;
  description: string;
  onNameChange: (name: string) => void;
  onDescriptionChange: (description: string) => void;
}

function ProjectBasicInfo({ 
  name, 
  description, 
  onNameChange, 
  onDescriptionChange 
}: ProjectBasicInfoProps) {
  return (
    <div className="space-y-6">
      <div>
        <label htmlFor="name" className="block text-sm font-medium text-gray-700">
          Project Name
        </label>
        <input
          type="text"
          id="name"
          value={name}
          onChange={(e) => onNameChange(e.target.value)}
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
          value={description}
          onChange={(e) => onDescriptionChange(e.target.value)}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
          placeholder="Describe your project's purpose and goals"
        />
      </div>
    </div>
  );
}

export default ProjectBasicInfo;