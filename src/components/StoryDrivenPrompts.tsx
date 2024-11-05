import React, { useState } from "react";
import {
  UserStory,
  developmentPhases,
  StoryDrivenPromptsProps,
} from "./storyDrivenTypes";
import UserStoryEditor from "./UserStoryEditor";
import NoStoriesPlaceholder from "./prompts/NoStoriesPlaceholder";
import PhasesList from "./prompts/PhasesList";
import StoryDetails from "./prompts/StoryDetails";
import StorySelector from "./prompts/StorySelector";

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
    return <NoStoriesPlaceholder onAddStory={() => setIsEditing(true)} />;
  }

  if (isEditing) {
    return (
      <UserStoryEditor
        editingStory={editingStory}
        setEditingStory={setEditingStory}
        onSave={handleSaveStory}
        onCancel={() => setIsEditing(false)}
      />
    );
  }

  return (
    <div className="space-y-6">
      <StorySelector
        selectedStoryIndex={selectedStoryIndex}
        userStories={projectDetails.userStories}
        onStorySelect={setSelectedStoryIndex}
        onAddStory={() => setIsEditing(true)}
        parseUserStory={parseUserStory}
      />

      {selectedStoryIndex >= 0 && (
        <>
          <StoryDetails
            story={parseUserStory(
              projectDetails.userStories[selectedStoryIndex]
            )}
            onEdit={() => handleEditStory(selectedStoryIndex)}
          />

          <PhasesList
            phases={filteredPhases}
            expandedPhases={expandedPhases}
            onPhaseToggle={togglePhase}
            formatPrompt={formatPrompt}
            onCopy={copyToClipboard}
          />
        </>
      )}
    </div>
  );
}

export default StoryDrivenPrompts;
