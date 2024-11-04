import React from 'react';
import { Copy } from 'lucide-react';
import ListEditor from './ListEditor';

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
  const getUserStoriesPrompt = () => {
    return `Help me create detailed user stories for ${projectName || '[Project Name]'}. Consider these core features:
${features.filter(f => f).map(f => `- ${f}`).join('\n')}

Please format them as "As a [user], I want to [action] so that [benefit]." and include acceptance criteria for each story.`;
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
  };

  const addStory = () => {
    onUserStoriesChange([...userStories, '']);
  };

  const removeStory = (index: number) => {
    onUserStoriesChange(userStories.filter((_, i) => i !== index));
  };

  const updateStory = (index: number, value: string) => {
    onUserStoriesChange(userStories.map((item, i) => i === index ? value : item));
  };

  return (
    <>
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
          <ListEditor
            items={userStories}
            onAdd={addStory}
            onRemove={removeStory}
            onChange={updateStory}
            placeholder="As a [user], I want to [action] so that [benefit]"
            inputType="textarea"
          />
        </div>
      </div>
    </>
  );
}

export default UserStoriesSection;