import React, { useState } from 'react';
import { phases } from './data/phases';
import ProjectForm from './components/ProjectForm';
import WizardNavigation from './components/WizardNavigation';
import PhaseAccordion from './components/PhaseAccordion';
import ProjectTypeSelector from './components/ProjectTypeSelector';
import { projectBlueprints } from './data/projectBlueprints';

export type ProjectType = keyof typeof projectBlueprints;

interface ProjectConfig {
  type: ProjectType;
  needsBackend: boolean;
  needsDatabase: boolean;
  needsAuthentication: boolean;
}

function App() {
  const [currentStep, setCurrentStep] = useState(0);
  const [projectConfig, setProjectConfig] = useState<ProjectConfig>({
    type: 'static',
    needsBackend: false,
    needsDatabase: false,
    needsAuthentication: false,
  });

  const [projectDetails, setProjectDetails] = useState({
    name: '',
    description: '',
    features: [''],
    techStack: [''],
    userStories: [''],
  });

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
  };

  const steps = [
    {
      title: "Project Type",
      component: <ProjectTypeSelector 
        projectConfig={projectConfig}
        setProjectConfig={setProjectConfig}
      />
    },
    {
      title: "Project Details",
      component: <ProjectForm 
        projectDetails={projectDetails}
        setProjectDetails={setProjectDetails}
        projectConfig={projectConfig}
      />
    },
    {
      title: "Project Prompts",
      component: (
        <div className="space-y-8">
          <div className="space-y-6">
            <div className="flex justify-between items-center">
              <div>
                <h2 className="text-lg font-medium text-gray-900">Development Guide Prompts</h2>
                <p className="mt-1 text-sm text-gray-500">
                  Use these prompts with the recommended tools to guide your development process
                </p>
              </div>
            </div>
            
            <PhaseAccordion 
              phases={phases.filter(phase => {
                if (phase.title === "Backend Development") {
                  return projectConfig.needsBackend;
                }
                return true;
              })}
              projectDetails={projectDetails}
              projectConfig={projectConfig}
              onCopy={copyToClipboard}
              expandAll
            />
          </div>
        </div>
      )
    }
  ];

  const handleNext = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(prev => prev + 1);
    }
  };

  const handleBack = () => {
    if (currentStep > 0) {
      setCurrentStep(prev => prev - 1);
    }
  };

  const handleStepClick = (index: number) => {
    setCurrentStep(index);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 to-blue-50">
      <header className="bg-white shadow-sm border-b border-indigo-100">
        <div className="max-w-7xl mx-auto px-4 py-6">
          <h1 className="text-3xl font-bold text-gray-900">DevGuide Generator</h1>
          <p className="mt-2 text-gray-600">Create structured development guides and prompts for your projects</p>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 py-8">
        <div className="space-y-8">
          <WizardNavigation 
            steps={steps}
            currentStep={currentStep}
            onStepClick={handleStepClick}
          />
          
          <div className="bg-white rounded-xl shadow-lg p-6">
            {steps[currentStep].component}
          </div>

          <div className="flex justify-between">
            <button
              onClick={handleBack}
              disabled={currentStep === 0}
              className={`px-4 py-2 rounded-md ${
                currentStep === 0 
                  ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                  : 'bg-white text-gray-600 hover:bg-gray-50'
              }`}
            >
              Back
            </button>
            {currentStep < steps.length - 1 && (
              <button
                onClick={handleNext}
                className="px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700"
              >
                Next
              </button>
            )}
          </div>
        </div>
      </main>
    </div>
  );
}

export default App;