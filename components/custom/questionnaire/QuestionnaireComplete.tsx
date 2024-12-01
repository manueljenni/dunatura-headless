"use client";

import { Answers, questionnaireData, VitaminId, vitaminIdToKey, vitamins } from "@/app/questionnaire/types";
import { useKeyboardNavigation } from "@/app/utils/hooks";
import { Button } from "@/components/primitives/button";
import checkmark from "@/public/images/icons/checkmark-empty.svg";
import { Bed, Leaf } from 'lucide-react';
import Image from "next/image";
import { useEffect, useRef, useState } from 'react';
import Goal from "./completed/Goal";

type Goal = {
  text: string;
  value: string;
};

type QuestionnaireCompleteProps = {
  scores: Record<string, number>;
  onBack: () => void;
  name?: string;
  answers: Answers;
};

export default function QuestionnaireComplete({
  scores,
  onBack,
  name,
  answers,
}: QuestionnaireCompleteProps) {
  useKeyboardNavigation({
    onBack: () => onBack(),
  });

  const goals = answers[2]?.map(goalValue => {
    const goalAnswer = questionnaireData[1].answers.find(
      answer => answer.value.value === goalValue
    );
    return goalAnswer?.value;
  }).filter((goal): goal is typeof questionnaireData[1]['answers'][number]['value'] => !!goal);

  const scoresArray = Object.keys(scores)
    .map((key: string) => {
      return {
        id: key as unknown as VitaminId,
        value: scores[key],
      };
    })
    .sort((a, b) => b.value - a.value)
    .slice(0, 6);

  const titleRef = useRef<HTMLDivElement>(null);
  const [offset, setOffset] = useState<number | null>(null);

  useEffect(() => {
    const calculateOffset = () => {
      if (titleRef.current) {
        const titleLeft = titleRef.current.getBoundingClientRect().left;
        setOffset(titleLeft);
      }
    };

    calculateOffset();
    window.addEventListener('resize', calculateOffset);
    return () => window.removeEventListener('resize', calculateOffset);
  }, []);

  return (
    <div className="h-full flex items-start justify-center w-full overflow-hidden">
      <div className="h-full px-4">
        <div className="md:max-w-2xl mx-auto w-full">
          <div className="space-y-6 py-12">
            <div className="space-y-2">
              <h2 className="text-4xl text-primary font-semibold">
                Hier ist deine Kombination, <br /> basierend auf deinen Zielen
              </h2>
              <div className="flex py-4 space-y-6 lg:space-y-0 lg:space-x-4 pb-8 flex-col lg:flex-row">
                {goals?.map((goal, index) => (
                  <Goal key={index} text={goal.text} image={checkmark} />
                ))}
              </div>
              <Button variant="pill" size="pill-xl">
                Weiter
              </Button>
            </div>
          </div>
        </div>

        <div className="md:max-w-2xl mx-auto w-full mb-4">
           <h1 ref={titleRef} className="text-3xl font-medium text-primary">Unsere Empfehlung für dich</h1>
        </div>
        
        <div className="relative w-screen -ml-4">
          <div 
            className={`flex gap-4 overflow-x-auto pb-4 px-4 no-scrollbar transition-opacity duration-500 ${
              offset === null ? 'opacity-0' : 'opacity-100'
            }`}
          >
            {offset !== null && (
              <>
                <div className="shrink-0" style={{ width: offset - 32 }} aria-hidden="true" />
                {scoresArray.map((vitamin) => {
                  const vitaminKey = vitaminIdToKey[vitamin.id];
                  if (vitaminKey) {
                    return (
                      <div className="w-[350px] shrink-0 snap-start rounded-2xl bg-[#FBFCF8] p-6 border">
                        <div className="space-y-4">
                         <div className="space-y-2">
                           <h2 className="text-2xl font-semibold text-primary">{vitamins[vitaminKey].name}</h2>
                          <div className="flex gap-4 font-medium text-primary">
                            <div className="flex items-center gap-2">
                              <Bed className="h-5 w-5" />
                              <span>Better sleep</span>
                            </div>
                            <div className="flex items-center gap-2">
                              <Leaf className="h-5 w-5" />
                              <span>Vegan</span>
                            </div>
                          </div>
                         </div>
                          <div className="py-6">
                            <div className="relative h-[100px] w-full">
                            <Image
                              src={`/images/pills/pill-yellow.png`}
                              alt={vitamins[vitaminKey].name}
                              fill
                              className="object-contain"
                            />
                            </div>
                          </div>
                          <p className="text-primary font-medium">
                            Because you told us you have trouble sleeping, {vitamins[vitaminKey].name} will help you sleep better and have more energy for the next day.
                          </p>
                          <button className="rounded-full bg-[#D8DED9] px-6 py-2 font-medium">
                            Details
                          </button>
                        </div>
                      </div>
                    );
                  }
                })}
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
