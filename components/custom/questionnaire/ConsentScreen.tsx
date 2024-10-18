import { useKeyboardNavigation } from "@/app/utils/hooks";
import { Button } from "@/components/primitives/button";
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
  const { id, text, subtitle } = question;

  const handleNext = () => onAnswer(id, ["consent"] as AnswerType<typeof id>[]);

  useKeyboardNavigation({
    onNext: handleNext,
    onBack,
  });

  return (
    <QuestionContainer
      question={question}
      onSubmit={handleNext}
      showSubmitButton={false}
      showBackButton={false}
      onBack={onBack}>
      <div className="flex space-x-2">
        <Button variant="pill" size="pill-lg" onClick={handleNext}>
          Ich stimme zu
        </Button>
        <Button variant="ghost" onClick={onBack}>
          Nein, zurück
        </Button>
      </div>
    </QuestionContainer>
  );
}
