<script lang="ts">
    export let onAddStory: () => void;
</script>

<div class="text-center py-12">
    <h3 class="text-lg font-medium text-gray-900">
        No User Stories Found
    </h3>
    <p class="mt-2 text-sm text-gray-500">
        Add your first user story to start generating development prompts.
    </p>
    <button
        on:click={onAddStory}
        class="mt-4 inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700"
    >
        <svg
            class="h-4 w-4 mr-2"
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
        >
            <path d="M5 12h14" />
            <path d="M12 5v14" />
        </svg>
        Add User Story
    </button>
</div>
