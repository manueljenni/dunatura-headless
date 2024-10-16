import { Button } from "@/components/primitives/button";
import { AnswerType, Question, QuestionId } from "../../../app/questionnaire/types";
import QuestionContainer from "./Question";

type ConsentScreenProps = {
  question: Question;
  onAnswer: <T extends QuestionId>(questionId: T, answers: AnswerType<T>[]) => void;
};

export default function ConsentScreen({ question, onAnswer }: ConsentScreenProps) {
  const { id, text, subtitle } = question;

  return (
    <QuestionContainer
      question={question}
      onSubmit={() => onAnswer(id, ["consent"] as AnswerType<typeof id>[])}
      showSubmitButton={false}
      showBackButton={false}
      onBack={() => {
        // Navigate back browser history
        window.history.back();
      }}>
      <div className="flex space-x-2">
        <Button
          variant="pill"
          size="pill-lg"
          onClick={() => onAnswer(id, ["consent"] as AnswerType<typeof id>[])}>
          Ich stimme zu
        </Button>
        <Button
          variant="ghost"
          onClick={() => {
            // Navigate back browser history
            window.history.back();
          }}>
          Nein, zurück
        </Button>
      </div>
    </QuestionContainer>
  );
}
