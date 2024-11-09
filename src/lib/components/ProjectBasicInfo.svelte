<script lang="ts">
    export let name: string;
    export let description: string;
    export let onNameChange: (name: string) => void;
    export let onDescriptionChange: (description: string) => void;
</script>

<div class="space-y-6">
    <div>
        <label for="name" class="block text-sm font-medium text-gray-700">
            Project Name
        </label>
        <input
            type="text"
            id="name"
            {name}
            on:input={(e) => onNameChange(e.currentTarget.value)}
            class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
            placeholder="Enter your project name"
        />
    </div>

    <div>
        <label for="description" class="block text-sm font-medium text-gray-700">
            Project Description
        </label>
        <textarea
            id="description"
            rows="3"
            {description}
            on:input={(e) => onDescriptionChange(e.currentTarget.value)}
            class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
            placeholder="Describe your project's purpose and goals"
        />
    </div>
</div>
