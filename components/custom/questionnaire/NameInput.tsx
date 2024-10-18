import { Question } from "@/app/questionnaire/types";
import { Input } from "@/components/primitives/input";
import tagespack from "@/public/images/tagespack-name-missing.png";
import Image from "next/image";
import { useState } from "react";
import QuestionContainer from "./Question";

export default function NameInput(props: {
  question: Question;
  onAnswer: (name: string) => void;
}) {
  const [name, setName] = useState<string>("");

  return (
    <div className="flex flex-col items-center justify-center h-full">
      <QuestionContainer
        question={props.question}
        showSubmitButton
        onSubmit={() => props.onAnswer(name)}>
        <div className="relative w-[350px] h-[350px] mx-auto">
          <Image
            src={tagespack}
            alt="Tagespack"
            fill
            className="object-contain"
            priority
          />
          {name && (
            <div className="absolute top-16 left-16 pl-2 py-1 pr-12 rounded line-clamp-1">
              <span className="font-bold text-2xl">{name}</span>
            </div>
          )}
        </div>
        <Input
          placeholder="Dein Name"
          className="w-full max-w-sm mx-auto mt-4"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
      </QuestionContainer>
    </div>
  );
}
