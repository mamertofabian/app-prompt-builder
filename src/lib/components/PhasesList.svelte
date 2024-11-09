<script lang="ts">
  import { createEventDispatcher } from 'svelte';
  import { ChevronDown, ChevronRight, Copy } from 'lucide-svelte';
  import PromptGenerator from './PromptGenerator.svelte';
  import DiagramGenerator from './DiagramGenerator.svelte';
  import type { Phase } from '../storyDrivenTypes';

  export let phases: Phase[];
  export let expandedPhases: string[];
  export let formatPrompt: (prompt: string) => string;
  export let onCopy: (text: string) => void;

  const dispatch = createEventDispatcher<{
    phaseToggle: string;
    copy: string;
    generated: { phase: string; content: string; };
    diagramGenerated: { phase: string; diagram: string; };
  }>();

  function handlePhaseToggle(phaseTitle: string) {
    dispatch('phaseToggle', phaseTitle);
  }

  function handleCopy(text: string) {
    dispatch('copy', text);
  }

  function handleGenerated(phase: Phase, content: string) {
    dispatch('generated', { phase: phase.title, content });
  }

  function handleDiagramGenerated(phase: Phase, diagram: string) {
    dispatch('diagramGenerated', { phase: phase.title, diagram });
  }

  const systemPrompts = {
    'Project Definition': `You are an expert software architect helping to define project structure and architecture. Focus on:
1. Clear and maintainable architecture
2. Scalable design patterns
3. Best practices for the chosen tech stack
4. Security considerations
5. Performance optimization strategies`,
    'UI Implementation': `You are a senior frontend developer creating detailed UI implementation plans. Focus on:
1. Component hierarchy
2. State management
3. Reusable components
4. Responsive design
5. Accessibility considerations`,
    'Testing': `You are a QA engineer creating comprehensive test plans. Focus on:
1. Test coverage
2. Edge cases
3. Performance testing
4. Security testing
5. Integration testing scenarios`,
    'Deployment': `You are a DevOps engineer creating deployment strategies. Focus on:
1. CI/CD pipeline
2. Environment configuration
3. Monitoring setup
4. Backup strategies
5. Security measures`
  };

  const diagramPrompts = {
    'Project Definition': `Create a Mermaid diagram showing the architecture for this project:

Project: [PROJECT_NAME]
Description: [PROJECT_DESCRIPTION]
Features: [FEATURES]
Tech Stack: [TECH_STACK]

Please create a diagram that shows:
1. Main system components
2. Data flow between components
3. External integrations
4. Key architectural patterns

Use appropriate Mermaid syntax (flowchart, C4, etc.) and include clear labels and relationships.`,
    'UI Implementation': `Create a Mermaid diagram showing the component hierarchy for this project:

Project: [PROJECT_NAME]
Features: [FEATURES]

Please create a diagram that shows:
1. Component tree structure
2. Key component relationships
3. Data flow between components
4. State management overview

Use Mermaid flowchart syntax and include clear labels and relationships.`,
    'Testing': `Create a Mermaid diagram showing the testing strategy for this project:

Project: [PROJECT_NAME]
Features: [FEATURES]

Please create a diagram that shows:
1. Test types and hierarchy
2. Test flow and dependencies
3. Integration points
4. CI/CD test stages

Use Mermaid flowchart syntax and include clear labels and relationships.`,
    'Deployment': `Create a Mermaid diagram showing the deployment architecture for this project:

Project: [PROJECT_NAME]
Tech Stack: [TECH_STACK]

Please create a diagram that shows:
1. Deployment environments
2. Infrastructure components
3. CI/CD pipeline flow
4. Monitoring and logging

Use Mermaid flowchart syntax and include clear labels and relationships.`
  };

  function shouldShowDiagram(phase: Phase): boolean {
    return phase.title in diagramPrompts;
  }
</script>

<div class="space-y-4">
  {#each phases as phase, index}
    <div class="border border-gray-200 rounded-lg overflow-hidden">
      <button
        on:click={() => handlePhaseToggle(phase.title)}
        class="w-full px-4 py-3 flex items-center justify-between bg-gray-50 hover:bg-gray-100"
      >
        <div class="flex flex-col items-start">
          <span class="font-medium text-gray-900">{phase.title}</span>
          <span class="text-sm text-gray-500">{phase.description}</span>
        </div>
        {#if expandedPhases.includes(phase.title)}
          <ChevronDown class="h-5 w-5 text-gray-500" />
        {:else}
          <ChevronRight class="h-5 w-5 text-gray-500" />
        {/if}
      </button>

      {#if expandedPhases.includes(phase.title)}
        <div class="p-4 space-y-4">
          {#if systemPrompts[phase.title]}
            <PromptGenerator
              title={`Generate ${phase.title}`}
              prompt={formatPrompt(phase.prompt)}
              systemPrompt={systemPrompts[phase.title]}
              on:generated={(e) => handleGenerated(phase, e.detail)}
            />
          {/if}

          {#if shouldShowDiagram(phase)}
            <DiagramGenerator
              title={`Generate ${phase.title} Diagram`}
              prompt={formatPrompt(diagramPrompts[phase.title])}
              systemPrompt="You are an expert in creating Mermaid diagrams. Generate clear, well-structured diagrams that effectively communicate system architecture and relationships. Use appropriate Mermaid syntax and include comprehensive labels and descriptions."
              on:generated={(e) => handleDiagramGenerated(phase, e.detail)}
            />
          {/if}
          
          <div class="relative">
            <pre class="bg-gray-900 text-gray-100 rounded-lg p-4 overflow-x-auto">
              <code>{formatPrompt(phase.prompt)}</code>
            </pre>
            <button
              on:click={() => handleCopy(formatPrompt(phase.prompt))}
              class="absolute top-2 right-2 p-2 text-gray-400 hover:text-white"
              title="Copy to clipboard"
            >
              <Copy class="h-5 w-5" />
            </button>
          </div>
        </div>
      {/if}
    </div>
  {/each}
</div>