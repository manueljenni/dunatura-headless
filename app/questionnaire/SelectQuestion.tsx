import { useState } from "react";
import { AnswerType, QuestionId } from "./questionnaireConfig";
import { Question } from "./questionnaireEngine";

type SelectQuestionProps = {
  question: Question;
  onAnswer: <T extends QuestionId>(questionId: T, answers: AnswerType<T>[]) => void;
};

export default function SelectQuestion({ question, onAnswer }: SelectQuestionProps) {
  const { id, text, subtitle, answers, maxSteps } = question;
  const [selectedAnswers, setSelectedAnswers] = useState<AnswerType<QuestionId>[]>([]);

  const handleSelect = (answer: AnswerType<QuestionId>) => {
    let newSelectedAnswers: AnswerType<QuestionId>[];

    if (maxSteps && maxSteps > 1) {
      if (selectedAnswers.includes(answer)) {
        newSelectedAnswers = selectedAnswers.filter((a) => a !== answer);
      } else if (selectedAnswers.length < maxSteps) {
        newSelectedAnswers = [...selectedAnswers, answer];
      } else {
        return; // Max selections reached
      }
    } else {
      newSelectedAnswers = [answer];
    }

    setSelectedAnswers(newSelectedAnswers);
    onAnswer(id, newSelectedAnswers);
  };

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-semibold">{text}</h2>
      {subtitle && <p className="text-gray-600">{subtitle}</p>}
      {maxSteps && maxSteps > 1 && (
        <p className="text-sm text-gray-500">Select up to {maxSteps} options</p>
      )}
      <div className="space-y-2">
        {answers.map((answer) => (
          <button
            key={answer.value.value}
            onClick={() => handleSelect(answer.value.value as AnswerType<QuestionId>)}
            className={`w-full p-4 text-left rounded-2xl transition-colors ${
              selectedAnswers.includes(answer.value.value as AnswerType<QuestionId>)
                ? "bg-primary text-white hover:bg-primary/90"
                : "bg-[#EDEFE7] text-primary hover:bg-primary/20"
            }`}>
            {answer.value.text}
          </button>
        ))}
      </div>
    </div>
  );
}
