interface Guideline {
  title: string;
  description: string;
  tips: string[];
  importance: 'critical' | 'recommended' | 'optional';
}

export const developmentGuidelines: Guideline[] = [
  {
    title: 'Sequential Development',
    description: 'Follow the development phases in order to ensure a structured and efficient development process.',
    importance: 'critical',
    tips: [
      'Complete each phase before moving to the next',
      'Validate phase requirements are met',
      'Address dependencies early in the process',
      'Document any phase-specific challenges or decisions'
    ]
  },
  {
    title: 'Iterative Refinement',
    description: 'Review and refine outputs from each prompt before proceeding to ensure quality and consistency.',
    importance: 'critical',
    tips: [
      'Review prompt outputs thoroughly',
      'Validate against project requirements',
      'Gather feedback early and often',
      'Make incremental improvements',
      'Track changes and their impact'
    ]
  },
  {
    title: 'Continuous Testing',
    description: 'Implement testing throughout the development process to maintain quality and catch issues early.',
    importance: 'critical',
    tips: [
      'Write tests alongside feature development',
      'Perform unit testing for individual components',
      'Conduct integration testing between phases',
      'Validate user flows and requirements',
      'Automate testing where possible'
    ]
  },
  {
    title: 'Comprehensive Documentation',
    description: 'Maintain detailed documentation throughout the development lifecycle.',
    importance: 'critical',
    tips: [
      'Document architectural decisions',
      'Keep track of implementation details',
      'Update documentation with changes',
      'Include setup and deployment instructions',
      'Document API endpoints and usage'
    ]
  },
  {
    title: 'Code Quality',
    description: 'Maintain high code quality standards throughout development.',
    importance: 'recommended',
    tips: [
      'Follow consistent coding standards',
      'Write clean, readable code',
      'Use meaningful variable and function names',
      'Keep functions small and focused',
      'Comment complex logic appropriately'
    ]
  },
  {
    title: 'Performance Optimization',
    description: 'Consider performance implications throughout development.',
    importance: 'recommended',
    tips: [
      'Optimize resource loading',
      'Implement caching strategies',
      'Monitor and improve response times',
      'Consider scalability in design decisions',
      'Regular performance testing'
    ]
  }
];