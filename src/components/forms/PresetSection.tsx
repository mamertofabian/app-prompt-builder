import React from 'react';
import { ProjectFeature, TechStackItem } from '../../data/projectBlueprints';

interface PresetSectionProps {
  items: (ProjectFeature | TechStackItem)[];
  category: string;
  onSelect: (value: string) => void;
}

function PresetSection({ items, category, onSelect }: PresetSectionProps) {
  if (items.length === 0) return null;

  return (
    <div>
      <h4 className="text-sm font-medium text-gray-700 capitalize mb-2">
        {category}
      </h4>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
        {items.map(item => (
          <button
            key={item.id}
            onClick={() => onSelect(item.name)}
            className="text-left p-3 rounded-lg border border-gray-200 hover:border-indigo-500 hover:bg-indigo-50 transition-colors"
          >
            <div className="font-medium text-gray-900">{item.name}</div>
            <div className="text-sm text-gray-500">{item.description}</div>
          </button>
        ))}
      </div>
    </div>
  );
}

export default PresetSection;