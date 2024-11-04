import React, { useState } from 'react';
import { Copy, ChevronDown, ChevronRight } from 'lucide-react';

interface SubPhase {
  title: string;
  description: string;
  prompt: string;
}

interface Phase {
  title: string;
  description: string;
  subPhases: SubPhase[];
}

interface PhaseTabProps {
  phase: Phase;
  projectDetails: {
    name: string;
    description: string;
    features: string[];
    techStack: string[];
  };
  onCopy: (text: string) => void;
}

function PhaseTab({ phase, projectDetails, onCopy }: PhaseTabProps) {
  const [expandedSubPhase, setExpandedSubPhase] = useState<number | null>(null);

  const formatPrompt = (prompt: string) => {
    return prompt
      .replace(/\[PROJECT_NAME\]/g, projectDetails.name)
      .replace(/\[PROJECT_DESCRIPTION\]/g, projectDetails.description)
      .replace(/\[FEATURES\]/g, projectDetails.features.join('\n- '))
      .replace(/\[TECH_STACK\]/g, projectDetails.techStack.join('\n- '));
  };

  return (
    <div className="space-y-6">
      <div className="prose max-w-none">
        <h2 className="text-2xl font-bold text-gray-900">{phase.title}</h2>
        <p className="text-gray-600">{phase.description}</p>
      </div>

      <div className="space-y-4">
        {phase.subPhases.map((subPhase, index) => (
          <div key={index} className="border border-gray-200 rounded-lg overflow-hidden">
            <button
              onClick={() => setExpandedSubPhase(expandedSubPhase === index ? null : index)}
              className="w-full px-4 py-3 flex items-center justify-between bg-gray-50 hover:bg-gray-100"
            >
              <span className="font-medium text-gray-900">{subPhase.title}</span>
              {expandedSubPhase === index ? (
                <ChevronDown className="h-5 w-5 text-gray-500" />
              ) : (
                <ChevronRight className="h-5 w-5 text-gray-500" />
              )}
            </button>

            {expandedSubPhase === index && (
              <div className="p-4 space-y-4">
                <p className="text-gray-600">{subPhase.description}</p>
                <div className="relative">
                  <pre className="bg-gray-900 text-gray-100 rounded-lg p-4 overflow-x-auto">
                    <code>{formatPrompt(subPhase.prompt)}</code>
                  </pre>
                  <button
                    onClick={() => onCopy(formatPrompt(subPhase.prompt))}
                    className="absolute top-2 right-2 p-2 text-gray-400 hover:text-white"
                  >
                    <Copy className="h-5 w-5" />
                  </button>
                </div>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

export default PhaseTab;