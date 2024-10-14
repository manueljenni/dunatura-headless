"use client";

import { Button } from "@/components/primitives/button";
import { useEffect, useState } from "react";

// Update the StepProps type
type StepProps = {
  onNext: () => void;
  onPrevious: () => void;
  currentStep: number;
  totalSteps: number;
  nextButtonText?: string;
};

// Update the StepContainer to include buttons
const StepContainer: React.FC<{
  children: React.ReactNode;
  onNext: () => void;
  onPrevious: () => void;
  currentStep: number;
  totalSteps: number;
  nextButtonText?: string;
}> = ({ children, onNext, onPrevious, currentStep, totalSteps, nextButtonText }) => (
  <div className="flex justify-center">
    <div className="w-full max-w-2xl space-y-16">
      <div className="text-center">
        Step {currentStep + 1} of {totalSteps}
      </div>
      {children}
      <div className="flex justify-start space-x-4">
        <Button variant={"pill"} size={"pill-lg"} onClick={onNext}>
          {nextButtonText || "Weiter"}
        </Button>
        {currentStep > 0 && (
          <Button variant={"ghost"} size={"lg"} onClick={onPrevious}>
            Back
          </Button>
        )}
      </div>
    </div>
  </div>
);

const Step1: React.FC<StepProps> = (props) => (
  <div className="space-y-1">
    <h1 className="text-4xl font-medium">Befor es losgeht...</h1>
    <p className="text-lg text-secondary">Dürfen wir deine Informationen bearbeiten?</p>
  </div>
);

const Step2: React.FC<StepProps> = (props) => (
  <div className="space-y-1">
    <h1 className="text-4xl font-medium">Erzähle uns etwas über dich</h1>
    <p className="text-lg text-secondary">Wie alt bist du?</p>
  </div>
);

// Update the Step type
type Step = {
  component: React.FC<StepProps>;
  props: {
    nextButtonText?: string;
  };
};

const steps: Step[] = [
  { component: Step1, props: { nextButtonText: "Ja, weiter" } },
  { component: Step2, props: {} },
  { component: Step1, props: {} },
];

export default function Questionnaire() {
  const [currentStep, setCurrentStep] = useState(0);

  const handleNext = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1);
    }
  };

  const handlePrevious = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      switch (event.key) {
        case "ArrowRight":
        case "Enter":
          handleNext();
          break;
        case "ArrowLeft":
          handlePrevious();
          break;
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [currentStep]); // Add currentStep as a dependency

  const { component: CurrentStepComponent, props: currentStepProps } = steps[currentStep];

  return (
    <div className="container mx-auto px-4">
      <StepContainer
        onNext={handleNext}
        onPrevious={handlePrevious}
        currentStep={currentStep}
        totalSteps={steps.length}
        nextButtonText={currentStepProps.nextButtonText}>
        <CurrentStepComponent
          onNext={handleNext}
          onPrevious={handlePrevious}
          currentStep={currentStep}
          totalSteps={steps.length}
          nextButtonText={currentStepProps.nextButtonText}
        />
      </StepContainer>
    </div>
  );
}
