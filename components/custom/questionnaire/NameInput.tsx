import { Question, QuestionId } from "@/app/questionnaire/types";
import { useKeyboardNavigation } from "@/app/utils/hooks";
import { Input } from "@/components/primitives/input";
import tagespack from "@/public/images/tagespack-name-missing.png";
import Image from "next/image";
import { useState } from "react";
import QuestionContainer from "./Question";

import { useEffect } from "react";

type NameInputProps = {
  question: Question<QuestionId>;
  onAnswer: (name: string) => void;
  onBack: () => void;
  name: string;
  initialAnswers: string[];
  isLastQuestion?: boolean;
};

export default function NameInput({
  question,
  onAnswer,
  onBack,
  name,
  initialAnswers,
  isLastQuestion,
}: NameInputProps) {
  const [inputValue, setInputValue] = useState(initialAnswers[0] || name);

  useEffect(() => {
    setInputValue(initialAnswers[0] || name);
  }, [initialAnswers, name]);

  function handleSubmit() {
    if (inputValue && inputValue.trim() !== "" && inputValue != null) {
      onAnswer(inputValue);
    }

    // TODO: Else show error / toast

    // TODO: Handle max name length - check with production about how much we can print
  }

  useKeyboardNavigation({
    onNext: () => {
      handleSubmit();
    },
    onBack: () => onBack(),
  });

  return (
    <div className="flex flex-col items-center justify-center h-full">
      <QuestionContainer
        question={question}
        showSubmitButton
        onSubmit={handleSubmit}
        isLastQuestion={isLastQuestion}>
        <div className="relative w-[350px] h-[350px] mx-auto">
          <Image
            src={tagespack}
            alt="Tagespack"
            fill
            className="object-contain"
            priority
          />
          {inputValue && (
            <div className="absolute top-16 left-16 pl-2 py-1 pr-12 rounded line-clamp-1">
              <span className="font-bold text-2xl">{inputValue}</span>
            </div>
          )}
        </div>
        <Input
          placeholder="Dein Name"
          className="w-full max-w-sm mx-auto mt-4"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
        />
      </QuestionContainer>
    </div>
  );
}
