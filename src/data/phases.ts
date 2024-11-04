export const phases = [
  {
    title: "Project Definition",
    description: "Define the core aspects of your project including scope, requirements, and initial planning.",
    subPhases: [
      {
        title: "Project Scope",
        description: "Define the initial scope and requirements of your project.",
        prompt: `I want to create [PROJECT_NAME] with the following description:
[PROJECT_DESCRIPTION]

Core features:
- [FEATURES]

Tech stack:
- [TECH_STACK]

Please help me define the initial architecture and development approach that would be suitable for this application.`
      },
      {
        title: "User Stories",
        description: "Create detailed user stories for the core features.",
        prompt: `Help me create detailed user stories for [PROJECT_NAME]. Consider these core features:
[FEATURES]

Please format them as "As a [user], I want to [action] so that [benefit]." and include acceptance criteria for each story.`
      },
      {
        title: "Technical Requirements",
        description: "Define technical requirements and constraints.",
        prompt: `Based on the following tech stack:
[TECH_STACK]

Please help me define the technical requirements for [PROJECT_NAME], including:
1. Development environment setup
2. Third-party services and APIs needed
3. Security requirements
4. Performance requirements
5. Scalability considerations

Consider these user stories when defining the requirements:
[USER_STORIES]`
      }
    ]
  },
  {
    title: "Frontend Development",
    description: "Design and implement the user interface components.",
    subPhases: [
      {
        title: "Component Structure",
        description: "Design the component hierarchy and structure.",
        prompt: `Create a React component structure for [PROJECT_NAME]. The app needs to support these features:
[FEATURES]

User stories to implement:
[USER_STORIES]

Please provide:
1. Component hierarchy
2. State management strategy
3. Routing structure
4. Shared components identification`
      },
      {
        title: "UI/UX Design",
        description: "Design the user interface and user experience.",
        prompt: `Design the user interface for [PROJECT_NAME] with these requirements:
- Modern and professional look
- Responsive design
- Accessibility compliance
- Support for these features: [FEATURES]

User stories to consider:
[USER_STORIES]

Please provide:
1. Color scheme
2. Typography
3. Layout structure
4. Component design patterns`
      },
      {
        title: "State Management",
        description: "Implement state management solution.",
        prompt: `Help me implement state management for [PROJECT_NAME] considering these features:
[FEATURES]

User stories to support:
[USER_STORIES]

Please provide:
1. State management architecture
2. Data flow patterns
3. Cache strategy
4. Performance optimization approaches`
      }
    ]
  },
  {
    title: "Backend Development",
    description: "Design and implement the server-side components.",
    subPhases: [
      {
        title: "API Design",
        description: "Design the API endpoints and structure.",
        prompt: `Design the API for [PROJECT_NAME] that will support:
[FEATURES]

User stories to implement:
[USER_STORIES]

Please provide:
1. API endpoints structure
2. Authentication/authorization approach
3. Data models
4. Error handling strategy`
      },
      {
        title: "Database Schema",
        description: "Design the database schema and relationships.",
        prompt: `Create a database schema for [PROJECT_NAME] considering these features:
[FEATURES]

User stories to support:
[USER_STORIES]

Please provide:
1. Tables and relationships
2. Indexes and optimizations
3. Data validation rules
4. Migration strategy`
      },
      {
        title: "Security Implementation",
        description: "Implement security measures and best practices.",
        prompt: `Help me implement security measures for [PROJECT_NAME] using:
[TECH_STACK]

Consider these user stories:
[USER_STORIES]

Please cover:
1. Authentication system
2. Authorization rules
3. Data encryption
4. Security best practices`
      }
    ]
  },
  {
    title: "Testing & Deployment",
    description: "Set up testing infrastructure and deployment pipeline.",
    subPhases: [
      {
        title: "Testing Strategy",
        description: "Define and implement testing approach.",
        prompt: `Create a testing strategy for [PROJECT_NAME] considering:
[FEATURES]
[TECH_STACK]

User stories to test:
[USER_STORIES]

Please provide:
1. Test types and coverage
2. Testing tools and frameworks
3. CI/CD integration
4. Performance testing approach`
      },
      {
        title: "Deployment Setup",
        description: "Configure deployment and hosting environment.",
        prompt: `Set up deployment configuration for [PROJECT_NAME] using:
[TECH_STACK]

Please provide:
1. Environment configuration
2. Build process
3. Deployment pipeline
4. Monitoring setup`
      },
      {
        title: "Documentation",
        description: "Create project documentation.",
        prompt: `Create documentation for [PROJECT_NAME] covering:
1. Project setup and installation
2. API documentation
3. Deployment procedures
4. Maintenance guidelines

Features to document:
[FEATURES]

Tech stack:
[TECH_STACK]

User stories implemented:
[USER_STORIES]`
      }
    ]
  },
  {
    title: "Debugging & Optimization",
    description: "Troubleshoot issues and optimize performance.",
    subPhases: [
      {
        title: "Error Resolution",
        description: "Debug and fix application issues.",
        prompt: `I'm encountering the following error in [PROJECT_NAME]:
[ERROR_DESCRIPTION]

Context:
- Feature: [AFFECTED_FEATURE]
- Tech Stack: [TECH_STACK]
- Current Implementation: [CODE_SNIPPET]

Please help identify:
1. Potential causes
2. Debugging steps
3. Recommended fixes
4. Prevention strategies`
      },
      {
        title: "Performance Analysis",
        description: "Identify and resolve performance bottlenecks.",
        prompt: `The following component/feature in [PROJECT_NAME] is experiencing performance issues:
[PERFORMANCE_ISSUE]

Current implementation:
[CODE_SNIPPET]

Tech stack:
[TECH_STACK]

Please provide:
1. Performance analysis
2. Optimization strategies
3. Implementation recommendations
4. Monitoring approach`
      },
      {
        title: "Integration Troubleshooting",
        description: "Resolve integration and communication issues.",
        prompt: `There's an integration issue between [COMPONENT_A] and [COMPONENT_B] in [PROJECT_NAME]:

Frontend Implementation:
[FRONTEND_CODE]

Backend Implementation:
[BACKEND_CODE]

Tech Stack:
[TECH_STACK]

Please help with:
1. Communication flow analysis
2. Error handling review
3. Integration fixes
4. Testing strategies`
      }
    ]
  }
];
