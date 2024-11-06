#!/bin/bash

# Function to migrate a React component to Svelte
migrate_component() {
    local component=$1
    local target_dir=$2
    local component_name=$(basename "$component" .tsx)
    
    echo "Migrating $component_name..."
    
    # Create the target directory if it doesn't exist
    mkdir -p "$target_dir"
    
    # Create the migration command for each component
    aider_command="Convert this React component to Svelte, maintaining the same functionality. Key changes needed:
    1. Convert React props interface to Svelte props using 'export let'
    2. Replace React.useState with Svelte reactive statements
    3. Convert JSX to Svelte template syntax
    4. Convert React event handlers to Svelte event handlers
    5. Replace React useEffect with Svelte onMount
    6. Convert any React Context usage to Svelte stores
    7. Ensure TypeScript types are properly handled
    8. Convert any CSS-in-JS to Svelte style tags
    Please place the component in $target_dir/$component_name.svelte
    DO NOT DELETE or try to fix the old React file"
    
    # Execute the migration using aider
    aider --message "$aider_command" --read "$component"
}

# Create src/lib directory if it doesn't exist
mkdir -p ./src/lib

# Migration order based on dependency graph, from leaf nodes up
# Data files first
echo "Migrating data files..."
for file in ./src/data/*.ts; do
    cp "$file" "./src/lib/$(basename "$file")"
done

# Components in dependency order
echo "Migrating components..."

# Level 1 (Base components with no dependencies)
declare -a level1=(
    "./src/components/forms/ListEditor.tsx"
    "./src/components/WizardNavigation.tsx"
    "./src/components/forms/ProjectBasicInfo.tsx"
    "./src/components/prompts/NoStoriesPlaceholder.tsx"
    "./src/components/prompts/StoryDetails.tsx"
)

# Level 2 (Components depending on Level 1)
declare -a level2=(
    "./src/components/PresetSelector.tsx"
    "./src/components/UserStoryEditor.tsx"
    "./src/components/forms/PresetSection.tsx"
)

# Level 3 (Components depending on Level 2)
declare -a level3=(
    "./src/components/forms/FeatureSection.tsx"
    "./src/components/forms/TechStackSection.tsx"
    "./src/components/prompts/StorySelector.tsx"
)

# Level 4 (Components depending on Level 3)
declare -a level4=(
    "./src/components/forms/UserStoriesSection.tsx"
    "./src/components/ProjectTypeSelector.tsx"
    "./src/components/prompts/PhasesList.tsx"
)

# Level 5 (High-level components)
declare -a level5=(
    "./src/components/PhaseAccordion.tsx"
    "./src/components/PhaseTab.tsx"
    "./src/components/ProjectForm.tsx"
    "./src/components/StoryDrivenPrompts.tsx"
)

# Level 6 (Top-level app)
declare -a level6=(
    "./src/App.tsx"
)

# Function to migrate a level of components
migrate_level() {
    local -n level=$1
    local target_dir=$2
    for component in "${level[@]}"; do
        if [ -f "$component" ]; then
            migrate_component "$component" "$target_dir"
        else
            echo "Warning: Component $component not found"
        fi
    done
    echo "Completed migrating level"
    read -p "Press enter to continue to next level..."
}

# Execute migration in order
echo "Starting migration process..."
echo "Migrating Level 1 components (base components)..."
migrate_level level1 "./src/lib/components"

echo "Migrating Level 2 components..."
migrate_level level2 "./src/lib/components"

echo "Migrating Level 3 components..."
migrate_level level3 "./src/lib/components"

echo "Migrating Level 4 components..."
migrate_level level4 "./src/lib/components"

echo "Migrating Level 5 components..."
migrate_level level5 "./src/lib/components"

echo "Migrating Level 6 (App)..."
migrate_level level6 "./src/lib"

echo "Migration complete!"
echo "Please review the migrated components and make any necessary adjustments."
echo "Don't forget to:"
echo "1. Update import statements in all components"
echo "2. Test each component thoroughly"
echo "3. Update any TypeScript types"
echo "4. Review and update the routing system"
echo "5. Check for any React-specific features that might need alternative solutions in Svelte"
