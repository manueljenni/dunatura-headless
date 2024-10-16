import { Button } from "@/components/primitives/button";
import { AnswerType, Question, QuestionId } from "../../../app/questionnaire/types";

type ConsentScreenProps = {
  question: Question;
  onAnswer: <T extends QuestionId>(questionId: T, answers: AnswerType<T>[]) => void;
};

export default function ConsentScreen({ question, onAnswer }: ConsentScreenProps) {
  const { id, text, subtitle } = question;

  return (
    <div className="space-y-8">
      <div className="space-y-2">
        <h2 className="text-2xl font-semibold">{text}</h2>
        {subtitle && <p className="text-gray-600 text-lg">{subtitle}</p>}
      </div>
      <div className="flex space-x-2">
        <Button
          variant="pill"
          size="pill-lg"
          onClick={() => onAnswer(id, ["consent"] as AnswerType<typeof id>[])}>
          Ich stimme zu
        </Button>
        <Button
          variant="ghost"
          onClick={() => onAnswer(id, ["decline"] as AnswerType<typeof id>[])}>
          Nein, zurück
        </Button>
      </div>
    </div>
  );
}
