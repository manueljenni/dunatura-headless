import { Button } from "@/components/primitives/button";
import { Input } from "@/components/primitives/input";
import { Label } from "@/components/primitives/label";
import { useState } from "react";
import { AnswerType, QuestionId } from "./questionnaireConfig";
import { Question } from "./questionnaireEngine";

type SelectQuestionProps = {
  question: Question;
  onAnswer: <T extends QuestionId>(questionId: T, answer: AnswerType<T>) => void;
};

export default function SelectQuestion({ question, onAnswer }: SelectQuestionProps) {
  const { id, text, subtitle, maxSteps, answers } = question;
  const [selectedAnswers, setSelectedAnswers] = useState<
    AnswerType<QuestionId>[] | AnswerType<QuestionId> | null
  >(null);

  const handleMultiSelectChange = (value: AnswerType<QuestionId>) => {
    setSelectedAnswers((prev) => {
      if (maxSteps === 1 || maxSteps === undefined) {
        return prev === value ? null : value;
      }
      if (Array.isArray(prev)) {
        if (prev.includes(value)) {
          return prev.filter((item) => item !== value);
        }
        if (maxSteps && prev.length >= maxSteps) {
          return prev;
        }
        return [...prev, value];
      }
      return [value];
    });
  };

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-semibold">{text}</h2>
      {subtitle && <p className="text-gray-600">{subtitle}</p>}
      {maxSteps && maxSteps > 1 && (
        <p className="text-gray-600">Wähle bis zu {maxSteps} Ziele aus</p>
      )}
      <div className="space-y-2">
        {answers.map((answer) => (
          <Label
            key={answer.value.value}
            className="flex items-center space-x-2 cursor-pointer">
            <Input
              type={maxSteps && maxSteps > 1 ? "checkbox" : "radio"}
              value={answer.value.value as AnswerType<QuestionId>}
              checked={
                Array.isArray(selectedAnswers)
                  ? selectedAnswers.includes(answer.value.value as AnswerType<QuestionId>)
                  : selectedAnswers === answer.value.value
              }
              onChange={() =>
                handleMultiSelectChange(answer.value.value as AnswerType<QuestionId>)
              }
              disabled={
                !!maxSteps &&
                maxSteps > 1 &&
                Array.isArray(selectedAnswers) &&
                selectedAnswers.length >= maxSteps &&
                !selectedAnswers.includes(answer.value.value as AnswerType<QuestionId>)
              }
              className="sr-only"
            />
            <div
              className={`flex-1 p-3 rounded-lg border ${
                Array.isArray(selectedAnswers)
                  ? selectedAnswers.includes(answer.value.value as AnswerType<QuestionId>)
                    ? "bg-primary text-white"
                    : "bg-white"
                  : selectedAnswers === answer.value.value
                  ? "bg-primary text-white"
                  : "bg-white"
              }`}>
              {answer.value.text}
            </div>
            {maxSteps && maxSteps > 1 && (
              <span className="text-xl">
                {Array.isArray(selectedAnswers)
                  ? selectedAnswers.includes(answer.value.value as AnswerType<QuestionId>)
                    ? "×"
                    : "+"
                  : selectedAnswers === answer.value.value
                  ? "×"
                  : "+"}
              </span>
            )}
          </Label>
        ))}
      </div>
      <Button
        onClick={() => onAnswer(id, selectedAnswers as AnswerType<QuestionId>)}
        disabled={
          !selectedAnswers ||
          (Array.isArray(selectedAnswers) && selectedAnswers.length === 0)
        }
        variant="pill"
        size="pill-lg">
        Continue
      </Button>
    </div>
  );
}
