import { AnswerType, Question, QuestionId } from "@/app/questionnaire/types";
import Image from "next/image";
import QuestionContainer from "./Question";

export default function TagespackPlaceholder(props: {
  question: Question;
  onAnswer: <T extends QuestionId>(questionId: T, answers: AnswerType<T>[]) => void;
}) {
  return (
    <div className="relative w-full h-full">
      <QuestionContainer
        question={props.question}
        showSubmitButton
        onSubmit={() => props.onAnswer(props.question.id, [])}
      />
      <div className="absolute h-screen w-full">
        <Image
          src="/images/landing/tagespack.png"
          alt="Tagespack"
          width={200}
          height={200}
          className="absolute inset-0 object-contain mx-auto h-1/2 w-1/2"
        />
      </div>
    </div>
  );
}
