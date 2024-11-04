import React, { useState } from 'react';
import { ChevronDown, ChevronRight, Copy, Plus, Edit } from 'lucide-react';
import ListEditor from './ListEditor';

interface UserStory {
  title: string;
  description: string;
  acceptanceCriteria: string[];
}

interface UserStoriesSectionProps {
  projectName: string;
  features: string[];
  userStories: string[];
  onUserStoriesChange: (stories: string[]) => void;
}

function UserStoriesSection({
  projectName,
  features,
  userStories,
  onUserStoriesChange
}: UserStoriesSectionProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [editingStory, setEditingStory] = useState<UserStory>({
    title: '',
    description: '',
    acceptanceCriteria: ['']
  });
  const [selectedStoryIndex, setSelectedStoryIndex] = useState<number>(-1);
  const [isCollapsed, setIsCollapsed] = useState(true);

  const parseUserStory = (story: string): UserStory => {
    const lines = story.split('\n').filter(line => line.trim());
    const title = lines[0] || '';
    const acStart = lines.findIndex(line => line.toLowerCase().includes('acceptance criteria:'));
    
    const description = acStart > 0 
      ? lines.slice(1, acStart).join('\n')
      : lines.slice(1).join('\n');
    
    const acceptanceCriteria = acStart > 0
      ? lines.slice(acStart + 1).map(ac => ac.replace(/^[-*]\s*/, '').trim())
      : [];

    return { title, description, acceptanceCriteria };
  };

  const formatUserStory = (story: UserStory): string => {
    return `${story.title}\n${story.description}\n\nAcceptance Criteria:\n${
      story.acceptanceCriteria.map(ac => `- ${ac}`).join('\n')
    }`;
  };

  const addAcceptanceCriteria = () => {
    setEditingStory(prev => ({
      ...prev,
      acceptanceCriteria: [...prev.acceptanceCriteria, '']
    }));
  };

  const removeAcceptanceCriteria = (index: number) => {
    setEditingStory(prev => ({
      ...prev,
      acceptanceCriteria: prev.acceptanceCriteria.filter((_, i) => i !== index)
    }));
  };

  const updateAcceptanceCriteria = (index: number, value: string) => {
    setEditingStory(prev => ({
      ...prev,
      acceptanceCriteria: prev.acceptanceCriteria.map((ac, i) => i === index ? value : ac)
    }));
  };

  const handleEditStory = (index: number) => {
    setSelectedStoryIndex(index);
    setEditingStory(parseUserStory(userStories[index]));
    setIsEditing(true);
  };

  const handleSaveStory = () => {
    const formattedStory = formatUserStory(editingStory);
    const updatedStories = [...userStories];
    
    if (selectedStoryIndex >= 0) {
      updatedStories[selectedStoryIndex] = formattedStory;
    } else {
      updatedStories.push(formattedStory);
    }
    
    onUserStoriesChange(updatedStories);
    setIsEditing(false);
    setEditingStory({ title: '', description: '', acceptanceCriteria: [''] });
    setSelectedStoryIndex(-1);
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
  };

  const getAllStoriesFormatted = () => {
    return userStories.map((story, index) => {
      const parsed = parseUserStory(story);
      return `## User Story ${index + 1}

${parsed.title}

${parsed.description}

### Acceptance Criteria:
${parsed.acceptanceCriteria.map(ac => `- ${ac}`).join('\n')}
`;
    }).join('\n\n');
  };

  if (isEditing) {
    return (
      <div className="space-y-6">
        <div className="bg-white rounded-lg border border-gray-200 p-6">
          <div className="space-y-4">
            <div>
              <label htmlFor="story-title" className="block text-sm font-medium text-gray-700">
                User Story Title
              </label>
              <input
                type="text"
                id="story-title"
                value={editingStory.title}
                onChange={(e) => setEditingStory(prev => ({ ...prev, title: e.target.value }))}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                placeholder="As a [user], I want to [action] so that [benefit]"
              />
            </div>

            <div>
              <label htmlFor="story-description" className="block text-sm font-medium text-gray-700">
                Description
              </label>
              <textarea
                id="story-description"
                value={editingStory.description}
                onChange={(e) => setEditingStory(prev => ({ ...prev, description: e.target.value }))}
                rows={3}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                placeholder="Additional context and details about the user story"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">
                Acceptance Criteria
              </label>
              <div className="mt-2 space-y-2">
                <ListEditor
                  items={editingStory.acceptanceCriteria}
                  onAdd={addAcceptanceCriteria}
                  onRemove={removeAcceptanceCriteria}
                  onChange={updateAcceptanceCriteria}
                  placeholder="Given [context], when [action], then [result]"
                />
              </div>
            </div>
          </div>

          <div className="mt-6 flex justify-end space-x-3">
            <button
              onClick={() => setIsEditing(false)}
              className="px-4 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-50"
            >
              Cancel
            </button>
            <button
              onClick={handleSaveStory}
              className="px-4 py-2 bg-indigo-600 text-white rounded-md text-sm font-medium hover:bg-indigo-700"
            >
              Save Story
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="border rounded-lg overflow-hidden">
      <div className="bg-gray-50 px-4 py-3 border-b">
        <div className="flex justify-between items-center">
          <div>
            <h3 className="text-sm font-medium text-gray-900">User Stories</h3>
            <p className="text-xs text-gray-500 mt-1">
              Define user stories with acceptance criteria
            </p>
          </div>
          <div className="flex items-center space-x-2">
            <button
              onClick={() => setIsCollapsed(!isCollapsed)}
              className="p-2 text-gray-400 hover:text-gray-600"
            >
              {isCollapsed ? (
                <ChevronRight className="h-5 w-5" />
              ) : (
                <ChevronDown className="h-5 w-5" />
              )}
            </button>
            <button
              onClick={() => {
                setSelectedStoryIndex(-1);
                setIsEditing(true);
              }}
              className="inline-flex items-center px-3 py-1.5 border border-transparent text-sm font-medium rounded-md text-indigo-600 bg-indigo-50 hover:bg-indigo-100"
            >
              <Plus className="h-4 w-4 mr-1" />
              Add Story
            </button>
          </div>
        </div>
      </div>

      {!isCollapsed && (
        <div className="p-4 space-y-4">
          {userStories.length === 0 ? (
            <p className="text-center text-sm text-gray-500 py-4">
              No user stories added yet. Click "Add Story" to create one.
            </p>
          ) : (
            <>
              {userStories.map((story, index) => {
                const parsed = parseUserStory(story);
                return (
                  <div key={index} className="bg-white rounded-lg border border-gray-200 p-4">
                    <div className="flex justify-between items-start">
                      <div className="space-y-3 flex-1">
                        <div>
                          <h4 className="text-sm font-medium text-gray-900">{parsed.title}</h4>
                          <p className="mt-1 text-sm text-gray-500">{parsed.description}</p>
                        </div>
                        <div>
                          <h5 className="text-xs font-medium text-gray-700">Acceptance Criteria:</h5>
                          <ul className="mt-1 space-y-1">
                            {parsed.acceptanceCriteria.map((ac, acIndex) => (
                              <li key={acIndex} className="flex items-start">
                                <span className="w-1.5 h-1.5 bg-indigo-400 rounded-full mt-1.5 mr-2"></span>
                                <span className="text-sm text-gray-600">{ac}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                      </div>
                      <button
                        onClick={() => handleEditStory(index)}
                        className="ml-4 p-2 text-gray-400 hover:text-indigo-600"
                        title="Edit story"
                      >
                        <Edit className="h-5 w-5" />
                      </button>
                    </div>
                  </div>
                );
              })}

              <div className="mt-4 border-t pt-4">
                <div className="flex justify-between items-start">
                  <div className="text-sm text-gray-500">
                    Copy all stories in Markdown format
                  </div>
                  <button
                    onClick={() => copyToClipboard(getAllStoriesFormatted())}
                    className="p-2 text-gray-400 hover:text-indigo-600"
                    title="Copy all stories"
                  >
                    <Copy className="h-5 w-5" />
                  </button>
                </div>
              </div>
            </>
          )}
        </div>
      )}
    </div>
  );
}

export default UserStoriesSection;