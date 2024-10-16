import { useEffect, useState } from "react";
import { AnswerType, Question, QuestionId } from "../../../app/questionnaire/types";
import QuestionContainer from "./Question";

type SelectQuestionProps = {
  question: Question;
  onAnswer: <T extends QuestionId>(questionId: T, answers: AnswerType<T>[]) => void;
  onBack: () => void;
  variables?: Record<string, string>;
};

export default function SelectQuestion({
  question,
  onAnswer,
  onBack,
  variables = {},
}: SelectQuestionProps) {
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
    <QuestionContainer
      question={question}
      variables={variables}
      onSubmit={handleSubmit}
      isSubmitDisabled={isSubmitDisabled}
      showSubmitButton={true}
      showBackButton={true}
      onBack={() => {
        onBack();
      }}>
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
    </QuestionContainer>
  );
}
