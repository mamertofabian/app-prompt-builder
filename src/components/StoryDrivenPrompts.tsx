import React, { useState } from "react";
import { ChevronDown, ChevronRight, Copy, Plus, Edit, X } from "lucide-react";
import {
  UserStory,
  developmentPhases,
  StoryDrivenPromptsProps,
} from "./storyDrivenTypes";

function StoryDrivenPrompts({
  projectDetails,
  projectConfig,
}: StoryDrivenPromptsProps) {
  const [selectedStoryIndex, setSelectedStoryIndex] = useState<number>(-1);
  const [expandedPhases, setExpandedPhases] = useState<string[]>([]);
  const [isEditing, setIsEditing] = useState(false);
  const [editingStory, setEditingStory] = useState<UserStory>({
    title: "",
    description: "",
    acceptanceCriteria: [""],
  });

  const parseUserStory = (story: string): UserStory => {
    const lines = story.split("\n").filter((line) => line.trim());
    const title = lines[0] || "";
    const acStart = lines.findIndex((line) =>
      line.toLowerCase().includes("acceptance criteria:")
    );

    const description =
      acStart > 0
        ? lines.slice(1, acStart).join("\n")
        : lines.slice(1).join("\n");

    const acceptanceCriteria =
      acStart > 0
        ? lines
            .slice(acStart + 1)
            .map((ac) => ac.replace(/^[-*]\s*/, "").trim())
        : [];

    return { title, description, acceptanceCriteria };
  };

  const formatUserStory = (story: UserStory): string => {
    return `${story.title}\n${
      story.description
    }\n\nAcceptance Criteria:\n${story.acceptanceCriteria
      .map((ac) => `- ${ac}`)
      .join("\n")}`;
  };

  const togglePhase = (phaseTitle: string) => {
    setExpandedPhases((prev) =>
      prev.includes(phaseTitle)
        ? prev.filter((t) => t !== phaseTitle)
        : [...prev, phaseTitle]
    );
  };

  const formatPrompt = (prompt: string) => {
    const selectedStory =
      selectedStoryIndex >= 0
        ? parseUserStory(projectDetails.userStories[selectedStoryIndex])
        : null;

    return prompt
      .replace(/\[PROJECT_TYPE\]/g, projectConfig.type)
      .replace(/\[TECH_STACK\]/g, projectDetails.techStack.join("\n- "))
      .replace(
        /\[SELECTED_STORY\]/g,
        selectedStory
          ? `${selectedStory.title}\n${selectedStory.description}`
          : ""
      )
      .replace(
        /\[ACCEPTANCE_CRITERIA\]/g,
        selectedStory
          ? selectedStory.acceptanceCriteria.map((ac) => `- ${ac}`).join("\n")
          : ""
      );
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
  };

  const filteredPhases = developmentPhases.filter((phase) => {
    if (phase.requiresBackend && !projectConfig.needsBackend) return false;
    if (phase.applicableTo && !phase.applicableTo.includes(projectConfig.type))
      return false;
    return true;
  });

  const addAcceptanceCriteria = () => {
    setEditingStory((prev) => ({
      ...prev,
      acceptanceCriteria: [...prev.acceptanceCriteria, ""],
    }));
  };

  const removeAcceptanceCriteria = (index: number) => {
    setEditingStory((prev) => ({
      ...prev,
      acceptanceCriteria: prev.acceptanceCriteria.filter((_, i) => i !== index),
    }));
  };

  const updateAcceptanceCriteria = (index: number, value: string) => {
    setEditingStory((prev) => ({
      ...prev,
      acceptanceCriteria: prev.acceptanceCriteria.map((ac, i) =>
        i === index ? value : ac
      ),
    }));
  };

  const handleEditStory = (index: number) => {
    setSelectedStoryIndex(index);
    setEditingStory(parseUserStory(projectDetails.userStories[index]));
    setIsEditing(true);
  };

  const handleSaveStory = () => {
    const formattedStory = formatUserStory(editingStory);
    const updatedStories = [...projectDetails.userStories];

    if (selectedStoryIndex >= 0) {
      updatedStories[selectedStoryIndex] = formattedStory;
    } else {
      updatedStories.push(formattedStory);
    }

    // Update project details (you'll need to implement this)
    console.log("Updated stories:", updatedStories);

    setIsEditing(false);
    setEditingStory({ title: "", description: "", acceptanceCriteria: [""] });
  };

  if (projectDetails.userStories.length === 0 && !isEditing) {
    return (
      <div className="text-center py-12">
        <h3 className="text-lg font-medium text-gray-900">
          No User Stories Found
        </h3>
        <p className="mt-2 text-sm text-gray-500">
          Add your first user story to start generating development prompts.
        </p>
        <button
          onClick={() => setIsEditing(true)}
          className="mt-4 inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700"
        >
          <Plus className="h-4 w-4 mr-2" />
          Add User Story
        </button>
      </div>
    );
  }

  if (isEditing) {
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
                  setEditingStory((prev) => ({
                    ...prev,
                    title: e.target.value,
                  }))
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
                  setEditingStory((prev) => ({
                    ...prev,
                    description: e.target.value,
                  }))
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
    <div className="space-y-6">
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
            onChange={(e) => setSelectedStoryIndex(Number(e.target.value))}
            className="mt-1 block w-96 rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
          >
            <option value={-1}>Select a user story to implement</option>
            {projectDetails.userStories.map((story, index) => {
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
          onClick={() => setIsEditing(true)}
          className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-indigo-600 bg-indigo-50 hover:bg-indigo-100"
        >
          <Plus className="h-4 w-4 mr-2" />
          Add Story
        </button>
      </div>

      {selectedStoryIndex >= 0 && (
        <>
          <div className="bg-white rounded-lg border border-gray-200 p-6">
            <div className="flex justify-between items-start">
              <div className="space-y-4 flex-1">
                <div>
                  <h3 className="text-lg font-medium text-gray-900">
                    {
                      parseUserStory(
                        projectDetails.userStories[selectedStoryIndex]
                      ).title
                    }
                  </h3>
                  <p className="mt-1 text-sm text-gray-500">
                    {
                      parseUserStory(
                        projectDetails.userStories[selectedStoryIndex]
                      ).description
                    }
                  </p>
                </div>
                <div>
                  <h4 className="text-sm font-medium text-gray-700">
                    Acceptance Criteria:
                  </h4>
                  <ul className="mt-2 space-y-2">
                    {parseUserStory(
                      projectDetails.userStories[selectedStoryIndex]
                    ).acceptanceCriteria.map((ac, index) => (
                      <li key={index} className="flex items-start">
                        <span className="w-1.5 h-1.5 bg-indigo-400 rounded-full mt-1.5 mr-2"></span>
                        <span className="text-sm text-gray-600">{ac}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
              <button
                onClick={() => handleEditStory(selectedStoryIndex)}
                className="ml-4 p-2 text-gray-400 hover:text-indigo-600"
                title="Edit story"
              >
                <Edit className="h-5 w-5" />
              </button>
            </div>
          </div>

          <div className="space-y-4">
            {filteredPhases.map((phase, index) => (
              <div
                key={index}
                className="border border-gray-200 rounded-lg overflow-hidden"
              >
                <button
                  onClick={() => togglePhase(phase.title)}
                  className="w-full px-4 py-3 flex items-center justify-between bg-gray-50 hover:bg-gray-100"
                >
                  <div className="flex flex-col items-start">
                    <span className="font-medium text-gray-900">
                      {phase.title}
                    </span>
                    <span className="text-sm text-gray-500">
                      {phase.description}
                    </span>
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
                        onClick={() =>
                          copyToClipboard(formatPrompt(phase.prompt))
                        }
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
        </>
      )}
    </div>
  );
}

export default StoryDrivenPrompts;
