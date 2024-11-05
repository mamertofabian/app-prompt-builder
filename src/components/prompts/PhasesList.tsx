import { Copy, ChevronDown, ChevronRight } from "lucide-react";
import { Phase } from "../storyDrivenTypes";

interface PhasesListProps {
  phases: Phase[];
  expandedPhases: string[];
  onPhaseToggle: (phaseTitle: string) => void;
  formatPrompt: (prompt: string) => string;
  onCopy: (text: string) => void;
}

function PhasesList({
  phases,
  expandedPhases,
  onPhaseToggle,
  formatPrompt,
  onCopy,
}: PhasesListProps) {
  return (
    <div className="space-y-4">
      {phases.map((phase, index) => (
        <div
          key={index}
          className="border border-gray-200 rounded-lg overflow-hidden"
        >
          <button
            onClick={() => onPhaseToggle(phase.title)}
            className="w-full px-4 py-3 flex items-center justify-between bg-gray-50 hover:bg-gray-100"
          >
            <div className="flex flex-col items-start">
              <span className="font-medium text-gray-900">{phase.title}</span>
              <span className="text-sm text-gray-500">{phase.description}</span>
            </div>
            {expandedPhases.includes(phase.title) ? (
              <ChevronDown className="h-5 w-5 text-gray-500" />
            ) : (
              <ChevronRight className="h-5 w-5 text-gray-500" />
            )}
          </button>

          {expandedPhases.includes(phase.title) && (
            <div className="p-4">
              <div className="relative">
                <pre className="bg-gray-900 text-gray-100 rounded-lg p-4 overflow-x-auto">
                  <code>{formatPrompt(phase.prompt)}</code>
                </pre>
                <button
                  onClick={() => onCopy(formatPrompt(phase.prompt))}
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
  );
}

export default PhasesList;
