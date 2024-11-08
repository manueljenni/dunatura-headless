import { AnswerType, Question, QuestionId } from "@/app/questionnaire/types";
import { useKeyboardNavigation } from "@/app/utils/hooks";
import tagespack from "@/public/images/tagespack-energie.png";
import Image from "next/image";
import QuestionContainer from "./Question";

export default function TagespackPlaceholder(props: {
  question: Question<QuestionId>;
  onAnswer: <T extends QuestionId>(questionId: T, answers: AnswerType<T>[]) => void;
}) {
  useKeyboardNavigation({
    onNext: () => props.onAnswer(props.question.id, []),
  });

  return (
    <div className="relative w-full h-screen">
      <div className="absolute inset-0 z-10">
        <div className="relative w-full h-[150%] mx-auto max-w-2xl">
          <Image
            src={tagespack}
            alt="Tagespack"
            fill
            className="object-contain object-center"
            priority
          />
        </div>
      </div>
      <div className="absolute inset-0 z-20 flex items-start justify-center pt-8">
        <QuestionContainer
          question={props.question}
          showSubmitButton
          onSubmit={() => props.onAnswer(props.question.id, [])}
        />
      </div>
    </div>
  );
}
