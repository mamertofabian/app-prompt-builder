import React from 'react';
import type { PresetOption } from '../data/presets';

interface PresetSelectorProps {
  options: PresetOption[];
  onSelect: (option: PresetOption) => void;
}

function PresetSelector({ options, onSelect }: PresetSelectorProps) {
  const categories = [...new Set(options.map(option => option.category))];

  return (
    <div className="grid grid-cols-1 gap-4 mt-2">
      {categories.map(category => (
        <div key={category} className="space-y-2">
          <h3 className="text-sm font-medium text-gray-500">{category}</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
            {options
              .filter(option => option.category === category)
              .map(option => (
                <button
                  key={option.value}
                  onClick={() => onSelect(option)}
                  className="text-left p-3 rounded-lg border border-gray-200 hover:border-indigo-500 hover:bg-indigo-50 transition-colors"
                >
                  <div className="font-medium text-gray-900">{option.label}</div>
                  <div className="text-sm text-gray-500">{option.description}</div>
                </button>
              ))}
          </div>
        </div>
      ))}
    </div>
  );
}

export default PresetSelector;