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
    title: "Project Definition",
    description: "Define the core aspects and architecture of your project",
    prompt: `Project Type: [PROJECT_TYPE]

Project Name: [PROJECT_NAME]
Description: [PROJECT_DESCRIPTION]

Core Features:
[FEATURES]

Tech Stack:
[TECH_STACK]

Please help me:
1. Define the project architecture
2. Set up the initial project structure
3. Configure the development environment
4. Outline the development phases
5. Identify potential technical challenges

Focus on creating a solid foundation for development while considering scalability and maintainability.`,
    applicableTo: ["static", "fullstack", "backend", "mobile"],
  },
  {
    title: "UI Implementation",
    description: "Design and implement the user interface components",
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
    description: "Implement the server-side functionality",
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
    title: "Database Design",
    description: "Design and implement the database schema and operations",
    prompt: `Design the database schema and operations for:

[SELECTED_STORY]

Project Context:
- Project Type: [PROJECT_TYPE]
- Tech Stack: [TECH_STACK]

Please provide:
1. Database schema design
2. Table relationships
3. Required indexes
4. Data access patterns
5. Migration strategy`,
    requiresBackend: true,
  },
  {
    title: "Testing",
    description: "Create comprehensive tests for the implementation",
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
    applicableTo: ["static", "fullstack", "backend", "mobile"],
  },
  {
    title: "Deployment",
    description: "Set up deployment and hosting configuration",
    prompt: `Create deployment configuration for:

Project Type: [PROJECT_TYPE]
Tech Stack: [TECH_STACK]

Features to deploy:
[FEATURES]

Please provide:
1. Environment configuration
2. Build process setup
3. Deployment pipeline
4. Monitoring setup
5. Backup strategy`,
    applicableTo: ["static", "fullstack", "backend", "mobile"],
  }
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