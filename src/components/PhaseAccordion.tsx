import React, { useState, useEffect } from 'react';
import { ChevronDown, ChevronRight, Copy } from 'lucide-react';
import type { ProjectType } from '../App';

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

interface PhaseAccordionProps {
  phases: Phase[];
  projectDetails: {
    name: string;
    description: string;
    features: string[];
    techStack: string[];
    userStories: string[];
  };
  projectConfig: {
    type: ProjectType;
    needsBackend: boolean;
    needsDatabase: boolean;
    needsAuthentication: boolean;
  };
  onCopy: (text: string) => void;
  expandAll?: boolean;
}

function PhaseAccordion({ 
  phases, 
  projectDetails, 
  projectConfig,
  onCopy,
  expandAll = false 
}: PhaseAccordionProps) {
  const [expandedPhases, setExpandedPhases] = useState<number[]>([]);
  const [expandedSubPhases, setExpandedSubPhases] = useState<string[]>([]);

  useEffect(() => {
    if (expandAll) {
      setExpandedPhases(phases.map((_, index) => index));
      const allSubPhases = phases.flatMap((_, phaseIndex) => 
        phases[phaseIndex].subPhases.map((_, subIndex) => `${phaseIndex}-${subIndex}`)
      );
      setExpandedSubPhases(allSubPhases);
    }
  }, [expandAll, phases]);

  const togglePhase = (phaseIndex: number) => {
    setExpandedPhases(prev => 
      prev.includes(phaseIndex)
        ? prev.filter(i => i !== phaseIndex)
        : [...prev, phaseIndex]
    );
  };

  const toggleSubPhase = (phaseIndex: number, subIndex: number) => {
    const key = `${phaseIndex}-${subIndex}`;
    setExpandedSubPhases(prev =>
      prev.includes(key)
        ? prev.filter(k => k !== key)
        : [...prev, key]
    );
  };

  const formatPrompt = (prompt: string) => {
    let formattedPrompt = prompt
      .replace(/\[PROJECT_NAME\]/g, projectDetails.name)
      .replace(/\[PROJECT_DESCRIPTION\]/g, projectDetails.description)
      .replace(/\[FEATURES\]/g, projectDetails.features.join('\n- '))
      .replace(/\[TECH_STACK\]/g, projectDetails.techStack.join('\n- '))
      .replace(/\[USER_STORIES\]/g, projectDetails.userStories.join('\n\n'));

    // Add project type specific context
    formattedPrompt = `Project Type: ${projectConfig.type.toUpperCase()}\n${
      projectConfig.needsAuthentication ? 'Authentication Required\n' : ''
    }${
      projectConfig.needsDatabase ? 'Database Required\n' : ''
    }\n${formattedPrompt}`;

    return formattedPrompt;
  };

  return (
    <div className="space-y-4">
      {phases.map((phase, phaseIndex) => (
        <div key={phaseIndex} className="bg-white rounded-xl shadow-lg overflow-hidden">
          <button
            onClick={() => togglePhase(phaseIndex)}
            className="w-full px-6 py-4 flex items-center justify-between bg-white hover:bg-gray-50"
          >
            <div className="flex flex-col items-start">
              <span className="font-semibold text-lg text-gray-900">{phase.title}</span>
              <span className="text-sm text-gray-500">{phase.description}</span>
            </div>
            {expandedPhases.includes(phaseIndex) ? (
              <ChevronDown className="h-5 w-5 text-gray-500" />
            ) : (
              <ChevronRight className="h-5 w-5 text-gray-500" />
            )}
          </button>

          {expandedPhases.includes(phaseIndex) && (
            <div className="border-t border-gray-200">
              <div className="p-4 space-y-3">
                {phase.subPhases.map((subPhase, subIndex) => (
                  <div key={subIndex} className="border border-gray-200 rounded-lg overflow-hidden">
                    <button
                      onClick={() => toggleSubPhase(phaseIndex, subIndex)}
                      className="w-full px-4 py-3 flex items-center justify-between bg-gray-50 hover:bg-gray-100"
                    >
                      <div className="flex flex-col items-start">
                        <span className="font-medium text-gray-900">{subPhase.title}</span>
                        <span className="text-sm text-gray-500">{subPhase.description}</span>
                      </div>
                      {expandedSubPhases.includes(`${phaseIndex}-${subIndex}`) ? (
                        <ChevronDown className="h-5 w-5 text-gray-500" />
                      ) : (
                        <ChevronRight className="h-5 w-5 text-gray-500" />
                      )}
                    </button>

                    {expandedSubPhases.includes(`${phaseIndex}-${subIndex}`) && (
                      <div className="p-4">
                        <div className="relative">
                          <pre className="bg-gray-900 text-gray-100 rounded-lg p-4 overflow-x-auto">
                            <code>{formatPrompt(subPhase.prompt)}</code>
                          </pre>
                          <button
                            onClick={() => onCopy(formatPrompt(subPhase.prompt))}
                            className="absolute top-2 right-2 p-2 text-gray-400 hover:text-white"
                            title="Copy to clipboard"
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
          )}
        </div>
      ))}
    </div>
  );
}

export default PhaseAccordion;