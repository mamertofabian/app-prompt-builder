import React, { useState } from 'react';
import { ChevronDown, ChevronRight, Copy } from 'lucide-react';
import type { ProjectType } from '../App';

interface Phase {
  title: string;
  description: string;
  prompt: string;
  applicableTo?: ('static' | 'fullstack' | 'backend' | 'mobile')[];
  requiresBackend?: boolean;
}

const developmentPhases: Phase[] = [
  {
    title: "UI Implementation",
    description: "Design and implement the user interface for this story",
    prompt: `Implement the UI components for the following user story:

[SELECTED_STORY]

Technical Requirements:
- Project Type: [PROJECT_TYPE]
- Tech Stack: [TECH_STACK]

Please provide:
1. Component structure
2. UI implementation details
3. State management approach
4. Required styling
5. Any necessary validations`,
    applicableTo: ['static', 'fullstack', 'mobile']
  },
  {
    title: "Backend Implementation",
    description: "Implement the backend functionality for this story",
    prompt: `Implement the backend functionality for the following user story:

[SELECTED_STORY]

Technical Context:
- Project Type: [PROJECT_TYPE]
- Tech Stack: [TECH_STACK]

Please provide:
1. API endpoint design
2. Data model updates
3. Business logic implementation
4. Error handling
5. Security considerations`,
    requiresBackend: true
  },
  {
    title: "Testing",
    description: "Create tests for this user story implementation",
    prompt: `Create tests for the following user story:

[SELECTED_STORY]

Project Context:
- Project Type: [PROJECT_TYPE]
- Tech Stack: [TECH_STACK]

Please provide:
1. Unit tests
2. Integration tests
3. UI tests (if applicable)
4. Test data setup
5. Edge cases to consider`
  }
];

interface StoryDrivenPromptsProps {
  projectDetails: {
    name: string;
    description: string;
    features: string[];
    techStack: string[];
    userStories: string[];
  };
  projectConfig: {
    type: ProjectType;
    needsBackend: boolean;
    needsDatabase: boolean;
    needsAuthentication: boolean;
  };
}

function StoryDrivenPrompts({ projectDetails, projectConfig }: StoryDrivenPromptsProps) {
  const [selectedStory, setSelectedStory] = useState<string>('');
  const [expandedPhases, setExpandedPhases] = useState<string[]>([]);

  const togglePhase = (phaseTitle: string) => {
    setExpandedPhases(prev =>
      prev.includes(phaseTitle)
        ? prev.filter(t => t !== phaseTitle)
        : [...prev, phaseTitle]
    );
  };

  const formatPrompt = (prompt: string) => {
    return prompt
      .replace(/\[PROJECT_TYPE\]/g, projectConfig.type)
      .replace(/\[TECH_STACK\]/g, projectDetails.techStack.join('\n- '))
      .replace(/\[SELECTED_STORY\]/g, selectedStory);
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
  };

  const filteredPhases = developmentPhases.filter(phase => {
    if (phase.requiresBackend && !projectConfig.needsBackend) return false;
    if (phase.applicableTo && !phase.applicableTo.includes(projectConfig.type)) return false;
    return true;
  });

  if (projectDetails.userStories.length === 0) {
    return (
      <div className="text-center py-12">
        <h3 className="text-lg font-medium text-gray-900">No User Stories Found</h3>
        <p className="mt-2 text-sm text-gray-500">
          Please add user stories in the previous step to generate development prompts.
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div>
        <label htmlFor="story-select" className="block text-sm font-medium text-gray-700">
          Select User Story
        </label>
        <select
          id="story-select"
          value={selectedStory}
          onChange={(e) => setSelectedStory(e.target.value)}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
        >
          <option value="">Select a user story to implement</option>
          {projectDetails.userStories.map((story, index) => (
            <option key={index} value={story}>
              {story.length > 100 ? `${story.substring(0, 100)}...` : story}
            </option>
          ))}
        </select>
      </div>

      {selectedStory && (
        <div className="space-y-4">
          {filteredPhases.map((phase, index) => (
            <div key={index} className="border border-gray-200 rounded-lg overflow-hidden">
              <button
                onClick={() => togglePhase(phase.title)}
                className="w-full px-4 py-3 flex items-center justify-between bg-gray-50 hover:bg-gray-100"
              >
                <div className="flex flex-col items-start">
                  <span className="font-medium text-gray-900">{phase.title}</span>
                  <span className="text-sm text-gray-500">{phase.description}</span>
                </div>
                {expandedPhases.includes(phase.title) ? (
                  <ChevronDown className="h-5 w-5 text-gray-500" />
                ) : (
                  <ChevronRight className="h-5 w-5 text-gray-500" />
                )}
              </button>

              {expandedPhases.includes(phase.title) && (
                <div className="p-4">
                  <div className="relative">
                    <pre className="bg-gray-900 text-gray-100 rounded-lg p-4 overflow-x-auto">
                      <code>{formatPrompt(phase.prompt)}</code>
                    </pre>
                    <button
                      onClick={() => copyToClipboard(formatPrompt(phase.prompt))}
                      className="absolute top-2 right-2 p-2 text-gray-400 hover:text-white"
                      title="Copy to clipboard"
                    >
                      <Copy className="h-5 w-5" />
                    </button>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default StoryDrivenPrompts;