export const phases = [
  {
    title: "Project Definition",
    description: "Define the core aspects of your project including scope, requirements, and user stories.",
    subPhases: [
      {
        title: "Project Scope & Architecture",
        description: "Define the initial scope, architecture, and development approach.",
        tool: "AI Dev Tool (bolt.new, Cline, Cursor)",
        prompt: `I want to create [PROJECT_NAME] with the following description:
[PROJECT_DESCRIPTION]

Core features:
[FEATURES]

Tech stack:
[TECH_STACK]

Please help me:
1. Define the project architecture
2. Set up the initial project structure
3. Configure the development environment

Focus only on project setup and architecture. Do not implement features yet.`
      },
      {
        title: "User Stories",
        description: "Generate comprehensive user stories for core features.",
        tool: "Generative AI Chat (ChatGPT, Claude)",
        prompt: `Help me create detailed user stories for [PROJECT_NAME]. Consider these core features:
[FEATURES]

Please:
1. Format them as "As a [user], I want to [action] so that [benefit]"
2. Include acceptance criteria for each story
3. Focus on user perspective and value
4. Consider edge cases and error scenarios

Current user stories to build upon (if any):
[USER_STORIES]`
      }
    ]
  },
  {
    title: "Frontend Development",
    description: "Design and implement the user interface components.",
    subPhases: [
      {
        title: "UI Components",
        description: "Create reusable UI components based on user stories.",
        tool: "AI Dev Tool (bolt.new, Cline, Cursor)",
        prompt: `Based on these user stories:
[USER_STORIES]

Help me create the UI components for [PROJECT_NAME] using:
[TECH_STACK]

Focus on:
1. Component structure and hierarchy
2. Props and state management
3. Reusability and maintainability
4. Basic styling and layout

Do not implement business logic or API integration yet.`
      },
      {
        title: "State Management",
        description: "Implement data flow and state management.",
        tool: "AI Dev Tool (bolt.new, Cline, Cursor)",
        prompt: `For [PROJECT_NAME], help me implement state management for these features:
[FEATURES]

Using:
[TECH_STACK]

Consider these user stories:
[USER_STORIES]

Focus on:
1. State structure and organization
2. Data flow between components
3. Form handling and validation
4. Local storage and caching

Do not implement API integration yet.`
      }
    ]
  },
  {
    title: "Backend Development",
    description: "Design and implement the server-side components.",
    subPhases: [
      {
        title: "API Design",
        description: "Design RESTful API endpoints based on user stories.",
        tool: "Generative AI Chat (ChatGPT, Claude)",
        prompt: `Help me design the API for [PROJECT_NAME] that will support these features:
[FEATURES]

Consider these user stories:
[USER_STORIES]

Focus on:
1. RESTful endpoint structure
2. Request/response formats
3. Authentication/authorization requirements
4. Data validation rules

Do not write implementation code yet.`
      },
      {
        title: "API Implementation",
        description: "Implement API endpoints and business logic.",
        tool: "AI Dev Tool (bolt.new, Cline, Cursor)",
        prompt: `Help me implement the backend for [PROJECT_NAME] using:
[TECH_STACK]

Features to implement:
[FEATURES]

Based on these user stories:
[USER_STORIES]

Focus on:
1. Route handlers and middleware
2. Business logic implementation
3. Database operations
4. Error handling and validation`
      }
    ]
  },
  {
    title: "Testing & Deployment",
    description: "Set up testing infrastructure and deployment pipeline.",
    subPhases: [
      {
        title: "Test Implementation",
        description: "Create unit and integration tests.",
        tool: "AI Dev Tool (bolt.new, Cline, Cursor)",
        prompt: `Help me create tests for [PROJECT_NAME] using:
[TECH_STACK]

Features to test:
[FEATURES]

User stories to cover:
[USER_STORIES]

Focus on:
1. Unit tests for components/functions
2. Integration tests for features
3. API endpoint testing
4. Test data and mocks`
      },
      {
        title: "Deployment Setup",
        description: "Configure deployment and hosting environment.",
        tool: "AI Dev Tool (bolt.new, Cline, Cursor)",
        prompt: `Help me set up deployment for [PROJECT_NAME] using:
[TECH_STACK]

Focus on:
1. Environment configuration
2. Build process setup
3. Deployment pipeline
4. Basic monitoring

Consider these requirements:
[FEATURES]`
      }
    ]
  }
];