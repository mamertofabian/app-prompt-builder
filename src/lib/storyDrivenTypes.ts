import type { ProjectType } from "../App";

export interface UserStory {
  title: string;
  description: string;
  acceptanceCriteria: string[];
}

export interface Phase {
  title: string;
  description: string;
  prompt: string;
  applicableTo?: ("static" | "fullstack" | "backend" | "mobile")[];
  requiresBackend?: boolean;
}

export const developmentPhases: Phase[] = [
  {
    title: "UI Implementation",
    description: "Design and implement the user interface for this story",
    prompt: `Implement the UI components for the following user story:

[SELECTED_STORY]

Acceptance Criteria:
[ACCEPTANCE_CRITERIA]

Technical Requirements:
- Project Type: [PROJECT_TYPE]
- Tech Stack: [TECH_STACK]

Please provide:
1. Component structure
2. UI implementation details
3. State management approach
4. Required styling
5. Any necessary validations`,
    applicableTo: ["static", "fullstack", "mobile"],
  },
  {
    title: "Backend Implementation",
    description: "Implement the backend functionality for this story",
    prompt: `Implement the backend functionality for the following user story:

[SELECTED_STORY]

Acceptance Criteria:
[ACCEPTANCE_CRITERIA]

Technical Context:
- Project Type: [PROJECT_TYPE]
- Tech Stack: [TECH_STACK]

Please provide:
1. API endpoint design
2. Data model updates
3. Business logic implementation
4. Error handling
5. Security considerations`,
    requiresBackend: true,
  },
  {
    title: "Testing",
    description: "Create tests for this user story implementation",
    prompt: `Create tests for the following user story:

[SELECTED_STORY]

Acceptance Criteria:
[ACCEPTANCE_CRITERIA]

Project Context:
- Project Type: [PROJECT_TYPE]
- Tech Stack: [TECH_STACK]

Please provide:
1. Unit tests
2. Integration tests
3. UI tests (if applicable)
4. Test data setup
5. Edge cases to consider`,
  },
];

export interface StoryDrivenPromptsProps {
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
