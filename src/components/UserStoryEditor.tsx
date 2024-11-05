import React from "react";
import { Plus, X } from "lucide-react";
import { UserStory } from "./storyDrivenTypes";

interface UserStoryEditorProps {
  editingStory: UserStory;
  setEditingStory: (story: UserStory) => void;
  onSave: () => void;
  onCancel: () => void;
}

function UserStoryEditor({
  editingStory,
  setEditingStory,
  onSave,
  onCancel,
}: UserStoryEditorProps) {
  const addAcceptanceCriteria = () => {
    setEditingStory({
      ...editingStory,
      acceptanceCriteria: [...editingStory.acceptanceCriteria, ""],
    });
  };

  const removeAcceptanceCriteria = (index: number) => {
    setEditingStory({
      ...editingStory,
      acceptanceCriteria: editingStory.acceptanceCriteria.filter(
        (_, i) => i !== index
      ),
    });
  };

  const updateAcceptanceCriteria = (index: number, value: string) => {
    setEditingStory({
      ...editingStory,
      acceptanceCriteria: editingStory.acceptanceCriteria.map((ac, i) =>
        i === index ? value : ac
      ),
    });
  };

  return (
    <div className="space-y-6">
      <div className="bg-white rounded-lg border border-gray-200 p-6">
        <div className="space-y-4">
          <div>
            <label
              htmlFor="story-title"
              className="block text-sm font-medium text-gray-700"
            >
              User Story Title
            </label>
            <input
              type="text"
              id="story-title"
              value={editingStory.title}
              onChange={(e) =>
                setEditingStory({
                  ...editingStory,
                  title: e.target.value,
                })
              }
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
              placeholder="As a [user], I want to [action] so that [benefit]"
            />
          </div>

          <div>
            <label
              htmlFor="story-description"
              className="block text-sm font-medium text-gray-700"
            >
              Description
            </label>
            <textarea
              id="story-description"
              value={editingStory.description}
              onChange={(e) =>
                setEditingStory({
                  ...editingStory,
                  description: e.target.value,
                })
              }
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
              {editingStory.acceptanceCriteria.map((ac, index) => (
                <div key={index} className="flex gap-2">
                  <input
                    type="text"
                    value={ac}
                    onChange={(e) =>
                      updateAcceptanceCriteria(index, e.target.value)
                    }
                    className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                    placeholder="Given [context], when [action], then [result]"
                  />
                  <button
                    onClick={() => removeAcceptanceCriteria(index)}
                    className="p-2 text-gray-400 hover:text-red-500"
                  >
                    <X className="h-5 w-5" />
                  </button>
                </div>
              ))}
              <button
                onClick={addAcceptanceCriteria}
                className="inline-flex items-center px-3 py-1 border border-transparent text-sm font-medium rounded-md text-indigo-600 bg-indigo-50 hover:bg-indigo-100"
              >
                <Plus className="h-4 w-4 mr-1" />
                Add Criteria
              </button>
            </div>
          </div>
        </div>

        <div className="mt-6 flex justify-end space-x-3">
          <button
            onClick={onCancel}
            className="px-4 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-50"
          >
            Cancel
          </button>
          <button
            onClick={onSave}
            className="px-4 py-2 bg-indigo-600 text-white rounded-md text-sm font-medium hover:bg-indigo-700"
          >
            Save Story
          </button>
        </div>
      </div>
    </div>
  );
}

export default UserStoryEditor;
