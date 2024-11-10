import ConsentScreen from "@/components/custom/questionnaire/ConsentScreen";
import EffectsAfterFirstMonth from "@/components/custom/questionnaire/EffectsAfterFirstMonth";
import NameInput from "@/components/custom/questionnaire/NameInput";
import SelectQuestion from "@/components/custom/questionnaire/SelectQuestion";
import TagespackPlaceholder from "@/components/custom/questionnaire/TagespackPlaceholder";
import { FC } from "react";
import { AnswerType, Question, QuestionId, QuestionType } from "../types";

interface QuestionRendererProps<T extends QuestionId> {
  question: Question<T>;
  onAnswer: (questionId: T, answers: AnswerType<T>[]) => void;
  onNameAnswer: (name: string) => void;
  initialAnswers: AnswerType<T>[];
  onBack: () => void;
  name?: string;
  isLastQuestion?: boolean;
}

export const QuestionRenderer: FC<QuestionRendererProps<QuestionId>> = ({
  question,
  onAnswer,
  onNameAnswer,
  initialAnswers,
  onBack,
  name,
  isLastQuestion,
}) => {
  const commonProps = {
    question,
    onAnswer,
    initialAnswers,
    onBack,
    isLastQuestion,
  };

  switch (question.type) {
    case QuestionType.ConsentScreen:
      return <ConsentScreen {...commonProps} />;
    case QuestionType.Select:
      return <SelectQuestion {...commonProps} variables={{ name: name || "" }} />;
    case QuestionType.EffectsAfterFirstMonth:
      return <EffectsAfterFirstMonth {...commonProps} />;
    case QuestionType.TagespackPlaceholder:
      return <TagespackPlaceholder {...commonProps} />;
    case QuestionType.NameInput:
      return <NameInput {...commonProps} onAnswer={onNameAnswer} name={name || ""} />;
    default:
      return null;
  }
};
