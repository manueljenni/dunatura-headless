import { Button } from "@/components/primitives/button";
import { ChevronRight } from "lucide-react";

interface RoutineCardProps {
  totalItems: number;
  totalPrice: number;
  routineRef: React.RefObject<HTMLDivElement>;
}

export function RoutineCard({ totalItems, totalPrice, routineRef }: RoutineCardProps) {
  return (
    <div className="bg-[#FCFCF8] rounded-3xl border border-[#E2E1DC] p-6 space-y-6">
      <div ref={routineRef}>
        <h4 className="text-2xl text-primary font-medium mb-4 font-denimink">
          Deine Routine
        </h4>
      </div>

      <div className="border-t pt-4">
        <div className="flex justify-between items-center mb-4">
          <span className="text-gray-500">Tagespreis</span>
          <span className="font-medium">€{(totalPrice / 28).toFixed(2)}/Tag</span>
        </div>
        <div className="flex justify-between items-center mb-6">
          <span className="text-gray-500">Monatspreis</span>
          <span className="font-medium">€{totalPrice.toFixed(2)}/Monat</span>
        </div>
        <Button
          className={`w-full transition-all
            ${
              totalItems >= 4
                ? "bg-primary text-white hover:bg-primary/90"
                : "bg-background text-[#9CA29E] cursor-not-allowed"
            }`}
          disabled={totalItems < 4}
          variant="pill"
          size="pill-xl">
          <div className="flex items-center gap-2">
            <span className="font-medium">Weiter</span>
            <ChevronRight size={16} />
          </div>
        </Button>
        {totalItems < 4 && (
          <p className="text-center text-sm text-secondary mt-4">
            Wähle noch {4 - totalItems} weitere Zutaten aus
          </p>
        )}
      </div>
    </div>
  );
}
