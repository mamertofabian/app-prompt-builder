import React, { useState } from 'react';
import ListEditor from './ListEditor';
import PresetSection from './PresetSection';
import { ProjectFeature } from '../../data/projectBlueprints';

interface FeatureSectionProps {
  features: string[];
  onFeaturesChange: (features: string[]) => void;
  availableFeatures: ProjectFeature[];
  projectConfig: {
    needsBackend: boolean;
    needsDatabase: boolean;
  };
}

function FeatureSection({
  features,
  onFeaturesChange,
  availableFeatures,
  projectConfig
}: FeatureSectionProps) {
  const [showPresets, setShowPresets] = useState(false);

  const addFeature = () => {
    onFeaturesChange([...features, '']);
  };

  const removeFeature = (index: number) => {
    onFeaturesChange(features.filter((_, i) => i !== index));
  };

  const updateFeature = (index: number, value: string) => {
    onFeaturesChange(features.map((item, i) => i === index ? value : item));
  };

  const addPresetFeature = (value: string) => {
    if (!features.includes(value)) {
      onFeaturesChange([...features.filter(f => f !== ''), value]);
    }
  };

  return (
    <div className="border rounded-lg overflow-hidden">
      <div className="bg-gray-50 px-4 py-3 border-b">
        <div className="flex justify-between items-center">
          <div>
            <h3 className="text-sm font-medium text-gray-900">Features</h3>
            <p className="text-xs text-gray-500 mt-1">
              Select from recommended features or add custom ones
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
            {['core', 'optional', 'advanced'].map(category => (
              <PresetSection
                key={category}
                category={`${category} Features`}
                items={availableFeatures.filter(f => 
                  f.category === category &&
                  (!f.requiresBackend || projectConfig.needsBackend) &&
                  (!f.requiresDatabase || projectConfig.needsDatabase)
                )}
                onSelect={addPresetFeature}
              />
            ))}
          </div>
        )}

        <ListEditor
          items={features}
          onAdd={addFeature}
          onRemove={removeFeature}
          onChange={updateFeature}
          placeholder="Enter feature"
        />
      </div>
    </div>
  );
}

export default FeatureSection;