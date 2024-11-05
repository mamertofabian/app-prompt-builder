import { Edit } from "lucide-react";
import { UserStory } from "../storyDrivenTypes";

interface StoryDetailsProps {
  story: UserStory;
  onEdit: () => void;
}

function StoryDetails({ story, onEdit }: StoryDetailsProps) {
  return (
    <div className="bg-white rounded-lg border border-gray-200 p-6">
      <div className="flex justify-between items-start">
        <div className="space-y-4 flex-1">
          <div>
            <h3 className="text-lg font-medium text-gray-900">{story.title}</h3>
            <p className="mt-1 text-sm text-gray-500">{story.description}</p>
          </div>
          <div>
            <h4 className="text-sm font-medium text-gray-700">
              Acceptance Criteria:
            </h4>
            <ul className="mt-2 space-y-2">
              {story.acceptanceCriteria.map((ac, index) => (
                <li key={index} className="flex items-start">
                  <span className="w-1.5 h-1.5 bg-indigo-400 rounded-full mt-1.5 mr-2"></span>
                  <span className="text-sm text-gray-600">{ac}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
        <button
          onClick={onEdit}
          className="ml-4 p-2 text-gray-400 hover:text-indigo-600"
          title="Edit story"
        >
          <Edit className="h-5 w-5" />
        </button>
      </div>
    </div>
  );
}

export default StoryDetails;
