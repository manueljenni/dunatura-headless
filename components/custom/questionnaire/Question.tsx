import { Question } from "@/app/questionnaire/types";
import { Button } from "@/components/primitives/button";

export default function QuestionContainer(props: {
  question: Question;
  variables?: Record<string, string>;
  onSubmit: () => void;
  isSubmitDisabled: boolean;
  children: React.ReactNode;
}) {
  const replaceVariables = (str: string) => {
    return str.replace(/\$\{(\w+)\}/g, (_, key) => props.variables?.[key] || `[${key}]`);
  };

  return (
    <div className="space-y-6 p-12">
      <div className="space-y-2">
        <h2 className="text-4xl text-primary font-semibold">
          {replaceVariables(props.question.text)}
        </h2>
        {props.question.subtitle && (
          <p className="text-lg font-medium text-secondary">
            {replaceVariables(props.question.subtitle)}
          </p>
        )}
      </div>
      {props.children}
      <div className="flex justify-center">
        <Button
          variant={"pill"}
          size={"pill-lg"}
          onClick={props.onSubmit}
          disabled={props.isSubmitDisabled}>
          Weiter
        </Button>
      </div>
    </div>
  );
}
