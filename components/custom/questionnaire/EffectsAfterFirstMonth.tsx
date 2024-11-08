import { AnswerType, Question, QuestionId } from "@/app/questionnaire/types";
import { useKeyboardNavigation } from "@/app/utils/hooks";
import crosshair from "@/public/images/icons/crosshair.svg";
import lightbulb from "@/public/images/icons/lightbulb.svg";
import measure from "@/public/images/icons/measure.svg";
import { motion } from "framer-motion";
import Image, { StaticImageData } from "next/image";
import QuestionContainer from "./Question";

export default function EffectsAfterFirstMonth(props: {
  question: Question<QuestionId>;
  onAnswer: <T extends QuestionId>(questionId: T, answers: AnswerType<T>[]) => void;
}) {
  useKeyboardNavigation({
    onNext: () => props.onAnswer(props.question.id, []),
  });

  const experiences = [
    {
      name: "Erhöhte Konzentration",
      description: "Verbesserte Konzentration während Arbeit und Sport.",
      image: crosshair,
    },
    {
      name: "Verringerte Müdigkeit",
      description:
        "Dein Körper fühlt sich den ganzen Tag energiegeladen an. Das Energietief am Nachmittag ist Geschichte.",
      image: measure,
    },
    {
      name: "Stärkeres Immunsystem",
      description:
        "Dank einem gut gerüsteten Immunsystem überstehst du Erkältungen & Co. mit Leichtigkeit.",
      image: lightbulb,
    },
  ];

  return (
    <QuestionContainer
      question={props.question}
      showSubmitButton={true}
      onSubmit={() => {
        props.onAnswer(props.question.id, []);
      }}
      showBackButton={false}>
      <div className="flex flex-col space-y-8 h-full">
        {experiences.map((experience, index) => (
          <Experience
            key={experience.name}
            name={experience.name}
            description={experience.description}
            image={experience.image}
            index={index}
          />
        ))}
      </div>
    </QuestionContainer>
  );
}

function Experience(props: {
  name: string;
  description: string;
  image: StaticImageData;
  index: number;
}) {
  return (
    <motion.div
      className="flex items-start space-x-1"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 1, delay: props.index * 0.2 }}>
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
    </motion.div>
  );
}
