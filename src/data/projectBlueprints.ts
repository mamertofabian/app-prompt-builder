import { Code, Globe, Database, Smartphone, Chrome, Server, Layout } from 'lucide-svelte';
import type { LucideIcon } from 'lucide-svelte';

export interface ProjectFeature {
  id: string;
  name: string;
  description: string;
  isDefault?: boolean;
  category: 'core' | 'optional' | 'advanced';
  requiresBackend?: boolean;
  requiresDatabase?: boolean;
}

export interface TechStackItem {
  id: string;
  name: string;
  description: string;
  category: 'frontend' | 'backend' | 'database' | 'deployment' | 'testing';
  isDefault?: boolean;
  requiresBackend?: boolean;
  requiresDatabase?: boolean;
}

export interface ProjectBlueprint {
  type: string;
  label: string;
  description: string;
  icon: LucideIcon;
  structure: {
    frontend?: {
      description: string;
      required: boolean;
      defaultTechnologies: string[];
    };
    backend?: {
      description: string;
      required: boolean;
      defaultTechnologies: string[];
    };
    database?: {
      description: string;
      required: boolean;
      defaultTechnologies: string[];
    };
    deployment?: {
      description: string;
      platforms: string[];
    };
  };
  defaultFeatures: ProjectFeature[];
  suggestedFeatures: ProjectFeature[];
  recommendedTechStack: TechStackItem[];
}

export const projectBlueprints: Record<string, ProjectBlueprint> = {
  static: {
    type: 'static',
    label: 'Static Website',
    description: 'A website with static content, perfect for portfolios, landing pages, or documentation sites',
    icon: Globe,
    structure: {
      frontend: {
        description: 'Static files (HTML, CSS, JavaScript, and assets)',
        required: true,
        defaultTechnologies: ['HTML5', 'CSS3', 'JavaScript']
      },
      deployment: {
        description: 'Deploy to static hosting platforms',
        platforms: ['Netlify', 'Vercel', 'GitHub Pages']
      }
    },
    defaultFeatures: [
      {
        id: 'responsive',
        name: 'Responsive Design',
        description: 'Adapts to different screen sizes',
        isDefault: true,
        category: 'core'
      },
      {
        id: 'seo',
        name: 'SEO Optimization',
        description: 'Basic SEO meta tags and sitemap',
        isDefault: true,
        category: 'core'
      }
    ],
    suggestedFeatures: [
      {
        id: 'analytics',
        name: 'Analytics Integration',
        description: 'Track user behavior and page views',
        category: 'optional'
      },
      {
        id: 'contact',
        name: 'Contact Form',
        description: 'Allow visitors to send messages',
        category: 'optional',
        requiresBackend: true
      }
    ],
    recommendedTechStack: [
      {
        id: 'react',
        name: 'React',
        description: 'UI library for building interfaces',
        category: 'frontend',
        isDefault: true
      },
      {
        id: 'tailwind',
        name: 'Tailwind CSS',
        description: 'Utility-first CSS framework',
        category: 'frontend',
        isDefault: true
      }
    ]
  },
  fullstack: {
    type: 'fullstack',
    label: 'Full Stack Application',
    description: 'A complete web application with frontend, backend, and database integration',
    icon: Code,
    structure: {
      frontend: {
        description: 'Client-side application with UI components and state management',
        required: true,
        defaultTechnologies: ['React', 'TypeScript']
      },
      backend: {
        description: 'Server-side API and business logic',
        required: true,
        defaultTechnologies: ['Node.js', 'Express']
      },
      database: {
        description: 'Data persistence layer',
        required: true,
        defaultTechnologies: ['PostgreSQL']
      },
      deployment: {
        description: 'Separate deployment for frontend and backend',
        platforms: ['Vercel', 'Railway', 'Heroku']
      }
    },
    defaultFeatures: [
      {
        id: 'auth',
        name: 'User Authentication',
        description: 'User registration and login system',
        isDefault: true,
        category: 'core',
        requiresBackend: true
      },
      {
        id: 'crud',
        name: 'CRUD Operations',
        description: 'Create, read, update, and delete data',
        isDefault: true,
        category: 'core',
        requiresBackend: true,
        requiresDatabase: true
      }
    ],
    suggestedFeatures: [
      {
        id: 'roles',
        name: 'Role-based Access',
        description: 'Different permission levels for users',
        category: 'optional',
        requiresBackend: true
      },
      {
        id: 'realtime',
        name: 'Real-time Updates',
        description: 'Live data synchronization',
        category: 'advanced',
        requiresBackend: true
      }
    ],
    recommendedTechStack: [
      {
        id: 'nextjs',
        name: 'Next.js',
        description: 'React framework with SSR support',
        category: 'frontend',
        isDefault: true
      },
      {
        id: 'prisma',
        name: 'Prisma',
        description: 'Type-safe database ORM',
        category: 'backend',
        isDefault: true,
        requiresDatabase: true
      }
    ]
  },
  backend: {
    type: 'backend',
    label: 'Backend Service',
    description: 'API or service focused on server-side operations',
    icon: Server,
    structure: {
      backend: {
        description: 'Server application with API endpoints and business logic',
        required: true,
        defaultTechnologies: ['Node.js', 'Express', 'TypeScript']
      },
      database: {
        description: 'Data storage and management',
        required: true,
        defaultTechnologies: ['PostgreSQL', 'Redis']
      },
      deployment: {
        description: 'Deploy to cloud platforms',
        platforms: ['AWS', 'Google Cloud', 'DigitalOcean']
      }
    },
    defaultFeatures: [
      {
        id: 'api',
        name: 'RESTful API',
        description: 'Standard REST API endpoints',
        isDefault: true,
        category: 'core'
      },
      {
        id: 'auth',
        name: 'API Authentication',
        description: 'Secure API endpoints',
        isDefault: true,
        category: 'core'
      }
    ],
    suggestedFeatures: [
      {
        id: 'caching',
        name: 'Response Caching',
        description: 'Cache frequently accessed data',
        category: 'optional'
      },
      {
        id: 'queue',
        name: 'Job Queue',
        description: 'Background task processing',
        category: 'advanced'
      }
    ],
    recommendedTechStack: [
      {
        id: 'nestjs',
        name: 'NestJS',
        description: 'Progressive Node.js framework',
        category: 'backend',
        isDefault: true
      },
      {
        id: 'swagger',
        name: 'Swagger/OpenAPI',
        description: 'API documentation',
        category: 'backend',
        isDefault: true
      }
    ]
  },
  mobile: {
    type: 'mobile',
    label: 'Mobile Application',
    description: 'Native or hybrid mobile application',
    icon: Smartphone,
    structure: {
      frontend: {
        description: 'Mobile UI components and navigation',
        required: true,
        defaultTechnologies: ['React Native', 'TypeScript']
      },
      backend: {
        description: 'Backend API for mobile app',
        required: false,
        defaultTechnologies: ['Node.js', 'Express']
      },
      database: {
        description: 'Data persistence',
        required: false,
        defaultTechnologies: ['SQLite', 'Realm']
      },
      deployment: {
        description: 'Deploy to app stores',
        platforms: ['App Store', 'Google Play']
      }
    },
    defaultFeatures: [
      {
        id: 'offline',
        name: 'Offline Support',
        description: 'Work without internet connection',
        isDefault: true,
        category: 'core'
      },
      {
        id: 'push',
        name: 'Push Notifications',
        description: 'Send notifications to users',
        isDefault: true,
        category: 'core',
        requiresBackend: true
      }
    ],
    suggestedFeatures: [
      {
        id: 'location',
        name: 'Location Services',
        description: 'GPS and mapping features',
        category: 'optional'
      },
      {
        id: 'camera',
        name: 'Camera Integration',
        description: 'Access device camera',
        category: 'optional'
      }
    ],
    recommendedTechStack: [
      {
        id: 'expo',
        name: 'Expo',
        description: 'React Native development platform',
        category: 'frontend',
        isDefault: true
      },
      {
        id: 'firebase',
        name: 'Firebase',
        description: 'Backend as a Service',
        category: 'backend',
        isDefault: true
      }
    ]
  }
};
