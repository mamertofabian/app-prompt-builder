<script lang="ts">
  import { AlertCircle, CheckCircle, Info, ChevronDown, ChevronRight } from "lucide-svelte";
  import { developmentGuidelines } from "../../data/guidelines";

  let expandedSections: string[] = [];

  function getImportanceIcon(importance: string) {
    switch (importance) {
      case "critical":
        return AlertCircle;
      case "recommended":
        return CheckCircle;
      default:
        return Info;
    }
  }

  function getImportanceClass(importance: string) {
    switch (importance) {
      case "critical":
        return "bg-red-50 border-red-200";
      case "recommended":
        return "bg-green-50 border-green-200";
      default:
        return "bg-blue-50 border-blue-200";
    }
  }

  function toggleSection(title: string) {
    expandedSections = expandedSections.includes(title)
      ? expandedSections.filter((t) => t !== title)
      : [...expandedSections, title];
  }
</script>

<div class="space-y-6">
  <div>
    <h2 class="text-lg font-medium text-gray-900">Development Guidelines</h2>
    <p class="mt-1 text-sm text-gray-500">
      Follow these guidelines to ensure a structured and efficient development process
    </p>
  </div>

  <div class="grid gap-4 md:grid-cols-2">
    {#each developmentGuidelines as guideline (guideline.title)}
      <div class="rounded-lg border {getImportanceClass(guideline.importance)}">
        <button
          on:click={() => toggleSection(guideline.title)}
          class="w-full px-4 py-3 flex items-center justify-between hover:bg-white/50 transition-colors rounded-lg"
        >
          <div class="flex items-start space-x-3">
            <svelte:component
              this={getImportanceIcon(guideline.importance)}
              class="h-5 w-5 {guideline.importance === 'critical'
                ? 'text-red-500'
                : guideline.importance === 'recommended'
                ? 'text-green-500'
                : 'text-blue-500'}"
            />
            <div class="text-left">
              <h3 class="text-sm font-medium text-gray-900">{guideline.title}</h3>
              <p class="mt-1 text-sm text-gray-500">{guideline.description}</p>
            </div>
          </div>
          <svelte:component
            this={expandedSections.includes(guideline.title) ? ChevronDown : ChevronRight}
            class="h-5 w-5 text-gray-400"
          />
        </button>

        {#if expandedSections.includes(guideline.title)}
          <div class="px-4 pb-4">
            <ul class="mt-2 space-y-2">
              {#each guideline.tips as tip, index (index)}
                <li class="text-sm text-gray-600 flex items-start">
                  <span class="w-1.5 h-1.5 bg-gray-400 rounded-full mt-1.5 mr-2 shrink-0" />
                  {tip}
                </li>
              {/each}
            </ul>
          </div>
        {/if}
      </div>
    {/each}
  </div>

  <div class="rounded-lg bg-gray-50 p-4 mt-6">
    <h3 class="text-sm font-medium text-gray-900">Remember</h3>
    <p class="mt-1 text-sm text-gray-500">
      These guidelines are designed to help you create high-quality, maintainable code. Adapt them to
      your specific project needs while maintaining the core principles.
    </p>
  </div>
</div>
