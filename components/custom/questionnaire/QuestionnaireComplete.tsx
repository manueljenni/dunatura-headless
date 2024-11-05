import { AnimationContext } from "@/app/questionnaire/page";
import { useKeyboardNavigation } from "@/app/utils/hooks";
import { Button } from "@/components/primitives/button";
import { useContext } from "react";

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
  const { isAnimating } = useContext(AnimationContext);
  useKeyboardNavigation({
    onBack: () => onBack(),
    isAnimating,
  });

  return (
    <div className="h-full w-full flex items-center justify-center">
      <div className="space-y-6 ">
        <h2 className="text-2xl font-semibold">Questionnaire Complete</h2>
        <p>Name: {name}</p>
        <h3 className="text-xl">Vitamin Recommendations:</h3>
        <ul className="space-y-2">
          {Object.entries(scores).map(([vitamin, score]) => (
            <li key={vitamin} className="flex justify-between">
              <span>{vitamin}</span>
              <span>{score}</span>
            </li>
          ))}
        </ul>
        <Button variant="pill" size="pill-lg" onClick={onBack}>
          Zurück
        </Button>
      </div>
    </div>
  );
}
