import { Plus } from "lucide-react";
import { UserStory } from "../storyDrivenTypes";

interface StorySelectorProps {
  selectedStoryIndex: number;
  userStories: string[];
  onStorySelect: (index: number) => void;
  onAddStory: () => void;
  parseUserStory: (story: string) => UserStory;
}

function StorySelector({
  selectedStoryIndex,
  userStories,
  onStorySelect,
  onAddStory,
  parseUserStory,
}: StorySelectorProps) {
  return (
    <div className="flex justify-between items-start">
      <div className="space-y-1">
        <label
          htmlFor="story-select"
          className="block text-sm font-medium text-gray-700"
        >
          Select User Story
        </label>
        <select
          id="story-select"
          value={selectedStoryIndex}
          onChange={(e) => onStorySelect(Number(e.target.value))}
          className="mt-1 block w-96 rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
        >
          <option value={-1}>Select a user story to implement</option>
          {userStories.map((story, index) => {
            const parsed = parseUserStory(story);
            return (
              <option key={index} value={index}>
                {parsed.title}
              </option>
            );
          })}
        </select>
      </div>
      <button
        onClick={onAddStory}
        className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-indigo-600 bg-indigo-50 hover:bg-indigo-100"
      >
        <Plus className="h-4 w-4 mr-2" />
        Add Story
      </button>
    </div>
  );
}

export default StorySelector;
