import { Button } from "@/components/primitives/button";
import { ChevronRight } from "lucide-react";
import { PlanSelector, PlanType } from "./PlanSelector";

interface RoutineCardProps {
  totalItems: number;
  totalPrice: number;
  routineRef: React.RefObject<HTMLDivElement>;
  onCheckout: () => void;
  bundleName: string;
  onBundleNameChange: (name: string) => void;
  selectedPlan: PlanType;
  onPlanSelect: (plan: PlanType) => void;
}

export function RoutineCard({
  totalItems,
  totalPrice,
  routineRef,
  onCheckout,
  bundleName,
  onBundleNameChange,
  selectedPlan,
  onPlanSelect,
}: RoutineCardProps) {
  return (
    <div className="bg-[#FCFCF8] rounded-3xl border border-[#E2E1DC] p-6 space-y-6">
      <div ref={routineRef}>
        <h4 className="text-2xl text-primary font-medium mb-4 font-denimink">
          Deine Routine
        </h4>
        <input
          type="text"
          placeholder="Gib deiner Routine einen Namen"
          value={bundleName}
          onChange={(e) => onBundleNameChange(e.target.value)}
          className="w-full p-2 border rounded-md"
        />
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
              totalItems >= 4 && bundleName
                ? "bg-primary text-white hover:bg-primary/90"
                : "bg-background text-[#9CA29E] cursor-not-allowed"
            }`}
          disabled={totalItems < 4 || !bundleName}
          onClick={onCheckout}
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

      <PlanSelector
        selectedPlan={selectedPlan}
        onSelect={onPlanSelect}
        price={totalPrice}
      />
    </div>
  );
}
