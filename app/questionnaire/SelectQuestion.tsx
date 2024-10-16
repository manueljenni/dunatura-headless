import { Button } from "@/components/primitives/button";
import { useEffect, useState } from "react";
import { AnswerType, QuestionId } from "./questionnaireConfig";
import { Question } from "./questionnaireEngine";

type SelectQuestionProps = {
  question: Question;
  onAnswer: <T extends QuestionId>(questionId: T, answers: AnswerType<T>[]) => void;
};

export default function SelectQuestion({ question, onAnswer }: SelectQuestionProps) {
  const { id, text, subtitle, answers, maxSteps } = question;
  const [selectedAnswers, setSelectedAnswers] = useState<AnswerType<QuestionId>[]>([]);
  const [wigglingAnswer, setWigglingAnswer] = useState<AnswerType<QuestionId> | null>(
    null,
  );

  const isMultiSelect = maxSteps && maxSteps > 1;

  const handleSelect = (answer: AnswerType<QuestionId>) => {
    let newSelectedAnswers: AnswerType<QuestionId>[];

    if (isMultiSelect) {
      if (selectedAnswers.includes(answer)) {
        newSelectedAnswers = selectedAnswers.filter((a) => a !== answer);
      } else if (selectedAnswers.length < maxSteps) {
        newSelectedAnswers = [...selectedAnswers, answer];
      } else {
        setWigglingAnswer(answer);
        return;
      }
    } else {
      newSelectedAnswers = [answer];
    }

    setSelectedAnswers(newSelectedAnswers);
  };

  useEffect(() => {
    if (wigglingAnswer) {
      const timer = setTimeout(() => setWigglingAnswer(null), 500);
      return () => clearTimeout(timer);
    }
  }, [wigglingAnswer]);

  const handleSubmit = () => {
    onAnswer(id, selectedAnswers);
  };

  const isSubmitDisabled = selectedAnswers.length === 0;

  return (
    <div className="space-y-6 p-12">
      <div className="space-y-2">
        <h2 className="text-4xl text-primary font-semibold">{text}</h2>
        {subtitle && <p className="text-lg font-medium text-secondary">{subtitle}</p>}
        {isMultiSelect && (
          <p className="text-lg font-medium text-secondary">
            Select up to {maxSteps} options
          </p>
        )}
      </div>
      <div className="space-y-2">
        {answers.map((answer) => (
          <button
            key={answer.value.value}
            onClick={() => handleSelect(answer.value.value as AnswerType<QuestionId>)}
            className={`w-full px-4 py-3 text-left rounded-2xl border border-[#E2E9E2] font-medium ${
              isMultiSelect ? "flex justify-between items-center" : ""
            } ${
              selectedAnswers.includes(answer.value.value as AnswerType<QuestionId>)
                ? "bg-selectedBackground hover:bg-primary/20"
                : "bg-lightBackground hover:bg-selectedBackground"
            } ${wigglingAnswer === answer.value.value ? "animate-wiggle" : ""}`}>
            <span>{answer.value.text}</span>
            {isMultiSelect && (
              <span className="text-2xl">
                {selectedAnswers.includes(answer.value.value as AnswerType<QuestionId>)
                  ? "×"
                  : "+"}
              </span>
            )}
          </button>
        ))}
      </div>
      <div className="flex justify-center">
        <Button
          variant={"pill"}
          size={"pill-lg"}
          onClick={handleSubmit}
          disabled={isSubmitDisabled}>
          Weiter
        </Button>
      </div>
    </div>
  );
}
