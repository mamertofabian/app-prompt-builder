<script lang="ts">
  import { Check } from 'lucide-svelte';

  export let steps: Array<{ title: string }>;
  export let currentStep: number;
  export let onStepClick: (index: number) => void;
</script>

<nav aria-label="Progress" class="py-8">
  <ol class="flex items-center justify-center">
    {#each steps as step, index}
      <li 
        class="relative flex flex-col items-center {
          index !== steps.length - 1 ? 'pr-8 sm:pr-20' : ''
        }"
      >
        {#if index !== steps.length - 1}
          <div 
            class="absolute top-4 inset-0 flex items-center" 
            aria-hidden="true"
          >
            <div class="h-0.5 w-full {
              index < currentStep ? 'bg-indigo-600' : 'bg-gray-200'
            }" />
          </div>
        {/if}
        <div class="relative flex flex-col items-center group">
          <button
            on:click={() => onStepClick(index)}
            class="relative flex items-center justify-center"
            aria-current={currentStep === index ? 'step' : undefined}
          >
            <span class="sr-only">{step.title}</span>
            <span
              class="h-8 w-8 rounded-full flex items-center justify-center transition-colors {
                index < currentStep
                  ? 'bg-indigo-600'
                  : index === currentStep
                  ? 'border-2 border-indigo-600'
                  : 'border-2 border-gray-300 hover:border-gray-400'
              }"
            >
              {#if index < currentStep}
                <Check class="h-5 w-5 text-white" />
              {:else}
                <span
                  class="text-sm font-medium {
                    index === currentStep ? 'text-indigo-600' : 'text-gray-500'
                  }"
                >
                  {index + 1}
                </span>
              {/if}
            </span>
          </button>
          <span
            class="mt-4 text-sm font-medium text-center whitespace-nowrap {
              index <= currentStep ? 'text-indigo-600' : 'text-gray-500'
            }"
          >
            {step.title}
          </span>
        </div>
      </li>
    {/each}
  </ol>
</nav>
