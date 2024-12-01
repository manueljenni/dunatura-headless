import { VitaminId, vitaminIdToKey, vitamins } from "@/app/questionnaire/types";
import { useKeyboardNavigation } from "@/app/utils/hooks";
import { Button } from "@/components/primitives/button";
import checkmark from "@/public/images/icons/checkmark-empty.svg";
import { Bed, ChevronLeft, ChevronRight, Leaf } from 'lucide-react';
import Image from "next/image";
import Goal from "./completed/Goal";

type QuestionnaireCompleteProps = {
  scores: Record<string, number>;
  onBack: () => void;
  name?: string;
};

export default function QuestionnaireComplete({
  scores,
  onBack,
  name,
}: QuestionnaireCompleteProps) {
  useKeyboardNavigation({
    onBack: () => onBack(),
  });

  scores = {
    "8": 18,
    "10": 10,
    "11": 14,
    "14": 4,
    "15": 10,
    "16": 9,
    "17": 111,
    "18": 6,
    "19": 4,
    "29": 6,
    "30": 13,
    "41": 120,
    "44": 14,
    "55": 22,
    "56": 27,
    "60": 6,
  };

  const scoresArray = Object.keys(scores)
    .map((key: string) => {
      return {
        id: key as unknown as VitaminId,
        value: scores[key],
      };
    })
    .sort((a, b) => b.value - a.value)
    .slice(0, 6);

  return (
    <div className="h-screen flex items-start justify-center w-full overflow-hidden">
      <div className="h-full px-4">
        <div className="md:max-w-2xl mx-auto w-full">
          <div className="space-y-6 py-12">
            <div className="space-y-2">
              <h2 className="text-4xl text-primary font-semibold">
                Hier ist deine individuelle Kombination <br /> basierend auf deinen Zielen
                und Bedürfnissen
              </h2>
              <div className="flex py-4 space-x-4 pb-8">
                <Goal text="Höherer Fokus" image={checkmark} />
                <Goal text="Aktiver Lifestyle" image={checkmark} />
                <Goal text="Bessere Performance" image={checkmark} />
              </div>
              <Button variant="pill" size="pill-xl">
                Weiter
              </Button>
            </div>
          </div>
        </div>

        <div className="md:max-w-2xl mx-auto w-full">
          <div className="space-y-6">
            <h1 className="text-3xl font-medium">What we recommend:</h1>
          </div>
        </div>
        
        <div className="relative w-screen">
          <div className="flex gap-4 overflow-x-auto pb-4 snap-x mask-fade-right px-4 no-scrollbar">
            {scoresArray.map((vitamin) => {
              const vitaminKey = vitaminIdToKey[vitamin.id];
              if (vitaminKey) {
                return (
                  <div className="w-[350px] shrink-0 snap-start rounded-2xl bg-white p-6 shadow">
                    <div className="space-y-4">
                      <h2 className="text-2xl font-medium">{vitamins[vitaminKey].name}</h2>
                      <div className="flex gap-4">
                        <div className="flex items-center gap-2">
                          <Bed className="h-5 w-5" />
                          <span>Better sleep</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <Leaf className="h-5 w-5" />
                          <span>Vegan</span>
                        </div>
                      </div>
                      <div className="py-6">
                        <div className="relative h-[100px] w-full">
                        <Image
                          src={`/images/pills/pill-vitc.png`}
                          alt={vitamins[vitaminKey].name}
                          fill
                          className="object-contain"
                        />
                        </div>
                      </div>
                      <p className="text-gray-700">
                        Because you told us you have trouble sleeping, {vitamins[vitaminKey].name} will help you sleep better and have more energy for the next day.
                      </p>
                      <button className="rounded-full bg-gray-200 px-6 py-2 font-medium">
                        Details
                      </button>
                    </div>
                  </div>
                );
              }
            })}
          </div>
          <div className="absolute right-8 top-1/2 -translate-y-1/2 flex gap-2">
            <button className="rounded-full bg-white p-4 shadow">
              <ChevronLeft className="h-6 w-6" />
            </button>
            <button className="rounded-full bg-white p-4 shadow">
              <ChevronRight className="h-6 w-6" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
