import { Plus } from "lucide-react";

interface NoStoriesPlaceholderProps {
  onAddStory: () => void;
}

function NoStoriesPlaceholder({ onAddStory }: NoStoriesPlaceholderProps) {
  return (
    <div className="text-center py-12">
      <h3 className="text-lg font-medium text-gray-900">
        No User Stories Found
      </h3>
      <p className="mt-2 text-sm text-gray-500">
        Add your first user story to start generating development prompts.
      </p>
      <button
        onClick={onAddStory}
        className="mt-4 inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700"
      >
        <Plus className="h-4 w-4 mr-2" />
        Add User Story
      </button>
    </div>
  );
}

export default NoStoriesPlaceholder;
