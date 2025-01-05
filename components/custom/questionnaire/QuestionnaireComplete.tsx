"use client";

import {
  Answers,
  healthGoalIcons,
  questionnaireData,
  VitaminId,
  vitaminIdToKey,
  vitamins,
} from "@/app/questionnaire/types";
import { useKeyboardNavigation } from "@/app/utils/hooks";
import Icon from "@/components/Icon";
import { Button } from "@/components/primitives/button";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import Goal from "./completed/Goal";

type Goal = {
  text: string;
  value: string;
  icon: (typeof healthGoalIcons)[keyof typeof healthGoalIcons];
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

  const goals = answers[2]
    ?.map((goalValue) => {
      const goalAnswer = questionnaireData[1].answers.find(
        (answer) => answer.value.value === goalValue,
      );
      return {
        ...goalAnswer?.value,
        icon: healthGoalIcons[goalValue as keyof typeof healthGoalIcons],
      };
    })
    .filter(
      (
        goal,
      ): goal is (typeof questionnaireData)[1]["answers"][number]["value"] & {
        icon: (typeof healthGoalIcons)[keyof typeof healthGoalIcons];
      } => !!goal,
    );

  const scoresArray = Object.keys(scores)
    .map((key) => {
      const vitaminKey = vitaminIdToKey[Number(key) as VitaminId];
      if (!vitaminKey) return null;
      return {
        id: Number(key),
        value: scores[key],
        explanation:
          "Weil du uns gesagt hast, dass du Schwierigkeiten beim Schlafen hast, wird " +
          vitamins[vitaminKey].name +
          " dir dabei helfen, besser zu schlafen und mehr Energie für den nächsten Tag zu haben.",
      };
    })
    .filter((item): item is NonNullable<typeof item> => !!item)
    .sort((a, b) => b.value - a.value)
    .slice(0, 6);

  const titleRef = useRef<HTMLDivElement>(null);
  const [offset, setOffset] = useState<number | null>(null);
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const calculateOffset = () => {
      if (titleRef.current) {
        const titleLeft = titleRef.current.getBoundingClientRect().left;
        setOffset(titleLeft);
      }
    };

    calculateOffset();
    window.addEventListener("resize", calculateOffset);
    return () => window.removeEventListener("resize", calculateOffset);
  }, []);

  const scrollToIndex = (index: number) => {
    const container = document.querySelector(".pills-container");
    const items = container?.querySelectorAll(".pill-item");
    if (container && items && items[index]) {
      container.scrollTo({
        left: items[index].getBoundingClientRect().left - offset! + container.scrollLeft,
        behavior: "smooth",
      });
    }
  };

  const handlePrevious = () => {
    if (currentIndex > 0) {
      setCurrentIndex((prev) => prev - 1);
      scrollToIndex(currentIndex - 1);
    }
  };

  const handleNext = () => {
    if (currentIndex < scoresArray.length - 1) {
      setCurrentIndex((prev) => prev + 1);
      scrollToIndex(currentIndex + 1);
    }
  };

  return (
    <div className="h-full flex items-start justify-center w-full overflow-hidden">
      <div className="h-full px-4">
        <div className="md:max-w-2xl mx-auto w-full">
          <div className="space-y-6 py-8">
            <div>
              <h2 className="text-4xl text-primary font-semibold">
                Hier ist deine Kombination, <br /> basierend auf deinen Zielen
              </h2>
              <div className="flex py-4 space-y-6 lg:space-y-0 pb-8 flex-col lg:flex-row">
                {goals?.map((goal, index) => {
                  const IconComponent = goal.icon;
                  return (
                    <Goal
                      key={index}
                      text={goal.text}
                      icon={<IconComponent className="w-6 h-6 text-primary" />}
                    />
                  );
                })}
              </div>
              <Button variant="pill" size="pill-xl">
                Weiter
              </Button>
            </div>
          </div>
        </div>

        <div className="md:max-w-2xl mx-auto w-full mb-4 flex items-center justify-between">
          <h1 ref={titleRef} className="text-3xl font-medium text-primary">
            Unsere Empfehlung für dich
          </h1>
          <div className="flex gap-2">
            <button
              onClick={handlePrevious}
              disabled={currentIndex === 0}
              className={`testimonial-nav ${currentIndex === 0 ? "disabled-button" : ""}`}>
              <svg
                width="40"
                height="40"
                viewBox="0 0 65 65"
                fill="none"
                xmlns="http://www.w3.org/2000/svg">
                <rect
                  x="1"
                  y="0.740967"
                  width="63"
                  height="63"
                  rx="31.5"
                  stroke="currentColor"
                  className="text-[#D8DED9]"
                />
                <path
                  d="M26.9353 30.9075L34.0873 23.7555L32.2017 21.8699L21.8307 32.2408L32.2017 42.6116L34.0873 40.726L26.9353 33.5742H43.1641V30.9075H26.9353Z"
                  className="fill-primary"
                />
              </svg>
            </button>
            <button
              onClick={handleNext}
              disabled={currentIndex === scoresArray.length - 1}
              className={`testimonial-nav ${
                currentIndex === scoresArray.length - 1 ? "disabled-button" : ""
              }`}>
              <svg
                width="40"
                height="40"
                viewBox="0 0 65 65"
                fill="none"
                xmlns="http://www.w3.org/2000/svg">
                <rect
                  x="1"
                  y="0.740967"
                  width="63"
                  height="63"
                  rx="31.5"
                  stroke="currentColor"
                  className="text-[#D8DED9]"
                />
                <path
                  d="M38.0647 30.9075L30.9127 23.7555L32.7983 21.8699L43.1693 32.2408L32.7983 42.6116L30.9127 40.726L38.0647 33.5742H21.8359V30.9075H38.0647Z"
                  className="fill-primary"
                />
              </svg>
            </button>
          </div>
        </div>

        <div className="relative w-screen -ml-4">
          <div
            className={`pills-container flex gap-4 overflow-x-auto pb-4 px-4 no-scrollbar transition-opacity duration-500 ${
              offset === null ? "opacity-0" : "opacity-100"
            }`}>
            {offset !== null && (
              <>
                <div
                  className="shrink-0"
                  style={{ width: offset - 32 }}
                  aria-hidden="true"
                />
                {scoresArray.map((vitamin, index) => {
                  const vitaminKey = vitaminIdToKey[vitamin.id as VitaminId];
                  if (vitaminKey) {
                    return (
                      <div
                        key={vitamin.id}
                        className="pill-item w-[350px] shrink-0 snap-start rounded-2xl bg-[#FBFCF8] p-6 border">
                        <div className="space-y-4">
                          <div className="space-y-2">
                            <h2 className="text-2xl font-semibold text-primary">
                              {vitamins[vitaminKey].name}
                            </h2>
                            <div className="flex gap-4 font-medium text-primary">
                              {vitamins[vitaminKey].effects.map((effect, index) => (
                                <div key={index} className="flex items-center gap-2">
                                  <Icon icon={effect.icon} color="#324033" size={20} />
                                  <span>{effect.text}</span>
                                </div>
                              ))}
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
                            {vitamin.explanation}
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
