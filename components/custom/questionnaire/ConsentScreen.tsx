import { AnimationContext } from "@/app/questionnaire/page";
import { useKeyboardNavigation } from "@/app/utils/hooks";
import { useContext } from "react";
import { AnswerType, Question, QuestionId } from "../../../app/questionnaire/types";
import QuestionContainer from "./Question";

type ConsentScreenProps = {
  question: Question;
  onAnswer: <T extends QuestionId>(questionId: T, answers: AnswerType<T>[]) => void;
  onBack: () => void;
};

export default function ConsentScreen({
  question,
  onAnswer,
  onBack,
}: ConsentScreenProps) {
  const handleSubmit = () => {
    onAnswer(question.id, ["consent"]);
  };

  const { isAnimating } = useContext(AnimationContext);
  useKeyboardNavigation({
    onNext: handleSubmit,
    onBack: onBack,
    isAnimating,
  });

  return (
    <QuestionContainer
      question={question}
      onSubmit={handleSubmit}
      isSubmitDisabled={false}
      showSubmitButton={true}
      showBackButton={true}
      onBack={onBack}></QuestionContainer>
  );
}
