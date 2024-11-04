# Project: Task Management App Development Guide

## Phase 1: Project Definition and Planning

### 1.1 Initial Project Scope
```
I want to create a task management web application with the following core features:
- User authentication
- Create, edit, and delete tasks
- Organize tasks into projects
- Set due dates and priority levels
- Basic dashboard with task statistics
Please help me define the initial architecture and tech stack that would be suitable for this application.
```

### 1.2 User Stories Definition
```
Help me create detailed user stories for this task management app. Consider the core features:
1. User Authentication
2. Task Management
3. Project Organization
4. Dashboard
Please format them as "As a [user], I want to [action] so that [benefit]."
```

### 1.3 Database Schema
```
Based on these user stories, please design a database schema for the task management app. Include:
- All necessary tables
- Relationships between tables
- Required fields and their types
- Primary and foreign keys
```

## Phase 2: Frontend Development

### 2.1 UI Component Structure
```
Create a React component structure for the task management app. Include:
1. Layout components (navigation, sidebar)
2. Page components (dashboard, tasks, projects)
3. Reusable components (task card, project card, forms)
Please provide the component hierarchy and explain the responsibility of each component.
```

### 2.2 Dashboard Implementation
```
Create a React dashboard component that includes:
- A summary of total tasks and their status
- Tasks due today
- Recent activity
- Project progress
Use Tailwind CSS for styling and ensure it's mobile-responsive.
```

### 2.3 Task Management Interface
```
Create a React component for the task management interface that includes:
- A form to create/edit tasks
- Task list with filtering and sorting
- Priority indicators and due dates
- Status toggle functionality
Ensure proper state management and error handling.
```

## Phase 3: Backend Development

### 3.1 API Routes
```
Design the REST API endpoints for the task management app. Include:
- Authentication routes
- Task CRUD operations
- Project management
- User preferences
Please provide the route structure, HTTP methods, and expected request/response formats.
```

### 3.2 Authentication Implementation
```
Implement user authentication using JWT with:
- User registration
- Login/logout functionality
- Password reset
- Session management
Include proper security measures and validation.
```

### 3.3 Task Operations
```
Implement the backend logic for task operations including:
- Create, read, update, delete tasks
- Task filtering and sorting
- Task status updates
- Project assignment
Include input validation and error handling.
```

## Phase 4: Integration and Testing

### 4.1 API Integration
```
Help me integrate the frontend with the backend API:
- Set up axios or fetch configurations
- Implement API calls in React components
- Handle loading states and errors
- Add request interceptors for authentication
```

### 4.2 Testing Suite
```
Create a testing suite for the application including:
- Unit tests for React components
- API endpoint tests
- Integration tests for critical flows
- Authentication flow tests
Use Jest and React Testing Library.
```

### 4.3 Error Handling
```
Implement comprehensive error handling:
- Frontend form validation
- API error responses
- User feedback mechanisms
- Error logging and monitoring
```

## Phase 5: Deployment

### 5.1 Build Configuration
```
Create the build configuration for production deployment:
- Environment variable setup
- Build optimization
- Asset compression
- Security headers
```

### 5.2 Deployment Setup
```
Set up the deployment pipeline:
- Docker configuration
- Database migration scripts
- Backup procedures
- Monitoring setup
```

## Guidelines for Using These Prompts:

1. **Sequential Development**: Follow the phases in order, as each builds upon the previous
2. **Iterative Refinement**: After each prompt response, review and refine before moving to the next
3. **Testing**: Test each component as it's developed
4. **Documentation**: Document decisions and changes throughout the process

## Common Issues and Debug Prompts:

### When Facing Errors:
```
I'm encountering [specific error] when [action]. Here's the relevant code:
[code snippet]
What might be causing this and how can I fix it?
```

### For Performance Issues:
```
The [component/feature] is performing slowly when [condition]. Current implementation:
[code snippet]
How can I optimize this?
```

### For Integration Issues:
```
The [frontend component] isn't properly communicating with [backend endpoint]. Here's the current implementation:
Frontend: [code snippet]
Backend: [code snippet]
What might be the issue?
```
