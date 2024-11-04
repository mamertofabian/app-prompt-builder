interface PresetOption {
  label: string;
  value: string;
  description: string;
  category: string;
}

export const techStackOptions: PresetOption[] = [
  // Frontend Frameworks
  {
    label: "React",
    value: "React",
    description: "A JavaScript library for building user interfaces",
    category: "Frontend Framework"
  },
  {
    label: "Next.js",
    value: "Next.js",
    description: "React framework for production with SSR and static generation",
    category: "Frontend Framework"
  },
  {
    label: "Vue.js",
    value: "Vue.js",
    description: "Progressive JavaScript framework for building UIs",
    category: "Frontend Framework"
  },

  // CSS Frameworks
  {
    label: "Tailwind CSS",
    value: "Tailwind CSS",
    description: "Utility-first CSS framework for rapid UI development",
    category: "Styling"
  },
  {
    label: "Material UI",
    value: "Material UI",
    description: "React components that implement Google's Material Design",
    category: "UI Library"
  },
  {
    label: "Chakra UI",
    value: "Chakra UI",
    description: "Simple, modular and accessible component library for React",
    category: "UI Library"
  },

  // Backend
  {
    label: "Node.js",
    value: "Node.js",
    description: "JavaScript runtime built on Chrome's V8 JavaScript engine",
    category: "Backend"
  },
  {
    label: "Express.js",
    value: "Express.js",
    description: "Fast, unopinionated web framework for Node.js",
    category: "Backend Framework"
  },
  {
    label: "NestJS",
    value: "NestJS",
    description: "Progressive Node.js framework for building efficient server-side applications",
    category: "Backend Framework"
  },

  // Databases
  {
    label: "PostgreSQL",
    value: "PostgreSQL",
    description: "Advanced open source relational database",
    category: "Database"
  },
  {
    label: "MongoDB",
    value: "MongoDB",
    description: "Document-based NoSQL database",
    category: "Database"
  },
  {
    label: "Redis",
    value: "Redis",
    description: "In-memory data structure store, cache, message broker",
    category: "Database"
  },

  // State Management
  {
    label: "Redux Toolkit",
    value: "Redux Toolkit",
    description: "Official toolset for efficient Redux development",
    category: "State Management"
  },
  {
    label: "Zustand",
    value: "Zustand",
    description: "Small, fast and scalable state management solution",
    category: "State Management"
  }
];

export const featureCategories: PresetOption[] = [
  // Authentication
  {
    label: "User Authentication",
    value: "User authentication and authorization system",
    description: "Login, registration, and role-based access control",
    category: "Authentication"
  },
  {
    label: "Social Auth",
    value: "Social media authentication",
    description: "Sign in with Google, Facebook, GitHub, etc.",
    category: "Authentication"
  },

  // Data Management
  {
    label: "CRUD Operations",
    value: "CRUD operations for data management",
    description: "Create, read, update, and delete functionality",
    category: "Data Management"
  },
  {
    label: "Real-time Updates",
    value: "Real-time data synchronization",
    description: "Live updates using WebSocket or Server-Sent Events",
    category: "Data Management"
  },

  // User Interface
  {
    label: "Responsive Design",
    value: "Responsive and mobile-friendly design",
    description: "Adapts to different screen sizes and devices",
    category: "UI/UX"
  },
  {
    label: "Dark Mode",
    value: "Dark mode support",
    description: "Toggle between light and dark themes",
    category: "UI/UX"
  },

  // Performance
  {
    label: "Caching",
    value: "Data caching system",
    description: "Cache responses and assets for better performance",
    category: "Performance"
  },
  {
    label: "Lazy Loading",
    value: "Lazy loading of components and assets",
    description: "Load resources only when needed",
    category: "Performance"
  }
];