import React, { useState } from 'react';
import { AlertCircle, CheckCircle, Info, ChevronDown, ChevronRight } from 'lucide-react';
import { developmentGuidelines } from '../data/guidelines';

function GuidelinesSection() {
  const [expandedSections, setExpandedSections] = useState<string[]>([]);

  const getImportanceIcon = (importance: string) => {
    switch (importance) {
      case 'critical':
        return <AlertCircle className="h-5 w-5 text-red-500" />;
      case 'recommended':
        return <CheckCircle className="h-5 w-5 text-green-500" />;
      default:
        return <Info className="h-5 w-5 text-blue-500" />;
    }
  };

  const getImportanceClass = (importance: string) => {
    switch (importance) {
      case 'critical':
        return 'bg-red-50 border-red-200';
      case 'recommended':
        return 'bg-green-50 border-green-200';
      default:
        return 'bg-blue-50 border-blue-200';
    }
  };

  const toggleSection = (title: string) => {
    setExpandedSections(prev =>
      prev.includes(title)
        ? prev.filter(t => t !== title)
        : [...prev, title]
    );
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-lg font-medium text-gray-900">Development Guidelines</h2>
        <p className="mt-1 text-sm text-gray-500">
          Follow these guidelines to ensure a structured and efficient development process
        </p>
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        {developmentGuidelines.map((guideline) => (
          <div
            key={guideline.title}
            className={`rounded-lg border ${getImportanceClass(guideline.importance)}`}
          >
            <button
              onClick={() => toggleSection(guideline.title)}
              className="w-full px-4 py-3 flex items-center justify-between hover:bg-white/50 transition-colors rounded-lg"
            >
              <div className="flex items-start space-x-3">
                {getImportanceIcon(guideline.importance)}
                <div className="text-left">
                  <h3 className="text-sm font-medium text-gray-900">{guideline.title}</h3>
                  <p className="mt-1 text-sm text-gray-500">{guideline.description}</p>
                </div>
              </div>
              {expandedSections.includes(guideline.title) ? (
                <ChevronDown className="h-5 w-5 text-gray-400" />
              ) : (
                <ChevronRight className="h-5 w-5 text-gray-400" />
              )}
            </button>

            {expandedSections.includes(guideline.title) && (
              <div className="px-4 pb-4">
                <ul className="mt-2 space-y-2">
                  {guideline.tips.map((tip, index) => (
                    <li key={index} className="text-sm text-gray-600 flex items-start">
                      <span className="w-1.5 h-1.5 bg-gray-400 rounded-full mt-1.5 mr-2 shrink-0"></span>
                      {tip}
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        ))}
      </div>

      <div className="rounded-lg bg-gray-50 p-4 mt-6">
        <h3 className="text-sm font-medium text-gray-900">Remember</h3>
        <p className="mt-1 text-sm text-gray-500">
          These guidelines are designed to help you create high-quality, maintainable code. 
          Adapt them to your specific project needs while maintaining the core principles.
        </p>
      </div>
    </div>
  );
}

export default GuidelinesSection;
