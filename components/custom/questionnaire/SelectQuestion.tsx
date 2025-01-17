import { useKeyboardNavigation } from "@/app/utils/hooks";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { AnswerType, Question, QuestionId } from "../../../app/questionnaire/types";
import QuestionContainer from "./Question";

type SelectQuestionProps = {
  question: Question<QuestionId>;
  onAnswer: <T extends QuestionId>(questionId: T, answers: AnswerType<T>[]) => void;
  onBack: () => void;
  variables?: Record<string, string>;
  initialAnswers: AnswerType<QuestionId>[];
  isLastQuestion?: boolean;
};

export default function SelectQuestion({
  question,
  onAnswer,
  onBack,
  variables = {},
  initialAnswers,
  isLastQuestion,
}: SelectQuestionProps) {
  const { id, text, subtitle, answers, maxSteps } = question;
  const [selectedAnswers, setSelectedAnswers] =
    useState<AnswerType<QuestionId>[]>(initialAnswers);
  const [wigglingAnswer, setWigglingAnswer] = useState<AnswerType<QuestionId> | null>(
    null,
  );
  useKeyboardNavigation({
    onNext: () => onAnswer(id, selectedAnswers),
    isNextDisabled: selectedAnswers.length === 0,
    onBack: () => onBack(),
  });

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
      newSelectedAnswers = selectedAnswers.includes(answer) ? [] : [answer];
    }

    setSelectedAnswers(newSelectedAnswers);
    if (
      // If its a question with a single answer, we can automatically navigate to the next question on click of an option
      (newSelectedAnswers.length > 0 && !isMultiSelect) ||
      // Same goes for when the maximum steps have been reached
      newSelectedAnswers.length === maxSteps
    ) {
      setTimeout(() => {
        onAnswer(id, newSelectedAnswers);
      }, 200);
    }
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
      onBack={onBack}
      isLastQuestion={isLastQuestion}>
      <div className="space-y-2">
        {answers.map((answer) => (
          <button
            key={answer.value.value}
            onClick={() => handleSelect(answer.value.value as AnswerType<QuestionId>)}
            tabIndex={0}
            onFocus={(e) => e.target.blur()}
            className={`w-full px-4 py-3 text-left rounded-2xl border border-[#E2E9E2] font-medium ${
              isMultiSelect ? "flex justify-between items-center" : ""
            } ${
              selectedAnswers.includes(answer.value.value as AnswerType<QuestionId>)
                ? "bg-selectedBackground hover:bg-primary/20"
                : "bg-lightBackground hover:bg-selectedBackground"
            } ${wigglingAnswer === answer.value.value ? "animate-wiggle" : ""}`}>
            <span>{answer.value.text}</span>
            {isMultiSelect && (
              <motion.span
                animate={{
                  rotate: selectedAnswers.includes(
                    answer.value.value as AnswerType<QuestionId>,
                  )
                    ? 45
                    : 0,
                }}
                transition={{ duration: 0.2 }}
                className="text-2xl">
                +
              </motion.span>
            )}
          </button>
        ))}
      </div>
    </QuestionContainer>
  );
}
