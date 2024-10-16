import { Question } from "@/app/questionnaire/types";
import { Button } from "@/components/primitives/button";

export default function QuestionContainer(props: {
  question: Question;
  variables?: Record<string, string>;
  onSubmit?: () => void;
  isSubmitDisabled?: boolean;
  showSubmitButton?: boolean;
  showBackButton?: boolean;
  onBack?: () => void;
  children: React.ReactNode;
}) {
  const replaceVariables = (str: string) => {
    return str.replace(/\$\{(\w+)\}/g, (_, key) => props.variables?.[key] || `[${key}]`);
  };

  return (
    <div className="space-y-6 px-4 md:px-12 py-4 md:py-12">
      <div className="space-y-1 mb-8">
        <h2 className="text-4xl text-primary font-semibold mb-4">
          {replaceVariables(props.question.text)}
        </h2>
        {props.question.subtitle && (
          <p className="text-lg font-medium text-secondary">
            {replaceVariables(props.question.subtitle)}
          </p>
        )}
        {props.question.maxSteps && props.question.maxSteps > 1 && (
          <p className="text-lg font-medium text-secondary">
            Wähle bis zu {props.question.maxSteps} Optionen aus
          </p>
        )}
      </div>
      {props.children}
      <div className="flex justify-center space-x-2">
        {props.showSubmitButton && (
          <Button
            variant={"pill"}
            size={"pill-lg"}
            onClick={props.onSubmit}
            disabled={props.isSubmitDisabled}>
            Weiter
          </Button>
        )}
        {props.showBackButton && (
          <Button variant="ghost" onClick={props.onBack}>
            Zurück
          </Button>
        )}
      </div>
    </div>
  );
}
