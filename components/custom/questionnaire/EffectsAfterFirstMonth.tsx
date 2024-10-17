import { AnswerType, Question, QuestionId } from "@/app/questionnaire/types";
import crosshair from "@/public/images/icons/crosshair.svg";
import lightbulb from "@/public/images/icons/lightbulb.svg";
import measure from "@/public/images/icons/measure.svg";
import Image, { StaticImageData } from "next/image";
import QuestionContainer from "./Question";

export default function EffectsAfterFirstMonth(props: {
  question: Question;
  onAnswer: <T extends QuestionId>(questionId: T, answers: AnswerType<T>[]) => void;
}) {
  return (
    <QuestionContainer
      question={props.question}
      showSubmitButton={true}
      onSubmit={() => {
        props.onAnswer(props.question.id, []);
      }}
      showBackButton={false}>
      <div className="flex flex-col space-y-8">
        <Experience
          name="Erhöhte Konzentration"
          description="Maintain the ability to maintain a high level of focus throughout your day."
          image={crosshair}
        />
        <Experience
          name="Verbesserte Produktivität"
          description="Maintain the ability to maintain a high level of focus throughout your day."
          image={measure}
        />
        <Experience
          name="Weniger Müdigkeit"
          description="Maintain the ability to maintain a high level of focus throughout your day."
          image={lightbulb}
        />
      </div>
    </QuestionContainer>
  );
}

function Experience(props: {
  name: string;
  description: string;
  image: StaticImageData;
}) {
  return (
    <div className="flex items-start space-x-1">
      <div className="relative flex-shrink-0 w-9 h-9 mr-4">
        <div className="absolute inset-0 bg-primaryBackground rounded-full" />
        <div className="absolute inset-0 flex items-center justify-center">
          <Image
            src={props.image}
            alt="Checkmark"
            className="w-4 h-4"
            style={{
              maxWidth: "100%",
              height: "auto",
            }}
          />
        </div>
      </div>
      <div className="flex flex-col">
        <p className="text-lg text-primary font-medium">{props.name}</p>
        <p className="text-base text-secondary">{props.description}</p>
      </div>
    </div>
  );
}
