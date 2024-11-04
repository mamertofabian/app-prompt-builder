import React, { useState } from 'react';
import ListEditor from './ListEditor';
import PresetSection from './PresetSection';
import { TechStackItem } from '../../data/projectBlueprints';

interface TechStackSectionProps {
  techStack: string[];
  onTechStackChange: (techStack: string[]) => void;
  availableTech: TechStackItem[];
  projectConfig: {
    needsBackend: boolean;
    needsDatabase: boolean;
  };
}

function TechStackSection({
  techStack,
  onTechStackChange,
  availableTech,
  projectConfig
}: TechStackSectionProps) {
  const [showPresets, setShowPresets] = useState(false);

  const addTech = () => {
    onTechStackChange([...techStack, '']);
  };

  const removeTech = (index: number) => {
    onTechStackChange(techStack.filter((_, i) => i !== index));
  };

  const updateTech = (index: number, value: string) => {
    onTechStackChange(techStack.map((item, i) => i === index ? value : item));
  };

  const addPresetTech = (value: string) => {
    if (!techStack.includes(value)) {
      onTechStackChange([...techStack.filter(t => t !== ''), value]);
    }
  };

  return (
    <div className="border rounded-lg overflow-hidden">
      <div className="bg-gray-50 px-4 py-3 border-b">
        <div className="flex justify-between items-center">
          <div>
            <h3 className="text-sm font-medium text-gray-900">Tech Stack</h3>
            <p className="text-xs text-gray-500 mt-1">
              Choose recommended technologies or add your own
            </p>
          </div>
          <button
            type="button"
            onClick={() => setShowPresets(!showPresets)}
            className="text-sm text-indigo-600 hover:text-indigo-700"
          >
            {showPresets ? 'Hide presets' : 'Show presets'}
          </button>
        </div>
      </div>

      <div className="p-4">
        {showPresets && (
          <div className="space-y-4 mb-4">
            {['frontend', 'backend', 'database', 'deployment', 'testing'].map(category => (
              <PresetSection
                key={category}
                category={`${category} Technologies`}
                items={availableTech.filter(t => 
                  t.category === category &&
                  (!t.requiresBackend || projectConfig.needsBackend) &&
                  (!t.requiresDatabase || projectConfig.needsDatabase)
                )}
                onSelect={addPresetTech}
              />
            ))}
          </div>
        )}

        <ListEditor
          items={techStack}
          onAdd={addTech}
          onRemove={removeTech}
          onChange={updateTech}
          placeholder="Enter technology"
        />
      </div>
    </div>
  );
}

export default TechStackSection;