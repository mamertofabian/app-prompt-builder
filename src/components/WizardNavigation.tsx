import React from 'react';
import { Check } from 'lucide-react';

interface WizardNavigationProps {
  steps: Array<{
    title: string;
  }>;
  currentStep: number;
  onStepClick: (index: number) => void;
}

function WizardNavigation({ steps, currentStep, onStepClick }: WizardNavigationProps) {
  return (
    <nav aria-label="Progress" className="py-8">
      <ol className="flex items-center justify-center">
        {steps.map((step, index) => (
          <li 
            key={step.title} 
            className={`relative flex flex-col items-center ${
              index !== steps.length - 1 ? 'pr-8 sm:pr-20' : ''
            }`}
          >
            {index !== steps.length - 1 && (
              <div 
                className="absolute top-4 inset-0 flex items-center" 
                aria-hidden="true"
              >
                <div className={`h-0.5 w-full ${
                  index < currentStep ? 'bg-indigo-600' : 'bg-gray-200'
                }`} />
              </div>
            )}
            <div className="relative flex flex-col items-center group">
              <button
                onClick={() => onStepClick(index)}
                className="relative flex items-center justify-center"
                aria-current={currentStep === index ? 'step' : undefined}
              >
                <span className="sr-only">{step.title}</span>
                <span
                  className={`h-8 w-8 rounded-full flex items-center justify-center transition-colors ${
                    index < currentStep
                      ? 'bg-indigo-600'
                      : index === currentStep
                      ? 'border-2 border-indigo-600'
                      : 'border-2 border-gray-300 hover:border-gray-400'
                  }`}
                >
                  {index < currentStep ? (
                    <Check className="h-5 w-5 text-white" />
                  ) : (
                    <span
                      className={`text-sm font-medium ${
                        index === currentStep ? 'text-indigo-600' : 'text-gray-500'
                      }`}
                    >
                      {index + 1}
                    </span>
                  )}
                </span>
              </button>
              <span
                className={`mt-4 text-sm font-medium text-center whitespace-nowrap ${
                  index <= currentStep ? 'text-indigo-600' : 'text-gray-500'
                }`}
              >
                {step.title}
              </span>
            </div>
          </li>
        ))}
      </ol>
    </nav>
  );
}

export default WizardNavigation;