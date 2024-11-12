import { useKeyboardNavigation } from "@/app/utils/hooks";
import { Button } from "@/components/primitives/button";
import checkmark from "@/public/images/icons/checkmark-empty.svg";
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

  return (
    <div className="h-screen flex items-start justify-center w-full">
      <div className="md:max-w-2xl mx-auto w-full px-4 h-full">
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
    </div>
  );
}
