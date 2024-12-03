"use client";

import AddToCartButton from "@/components/custom/button/AddToCartButton";
import { Check } from "lucide-react";
import { useState } from "react";

enum PlanType {
  OneTime = "one-time",
  Monthly = "monthly",
  Quarterly = "quarterly",
}

interface PlanOptionProps {
  planType: PlanType;
  isSelected: boolean;
  onSelect: (planType: PlanType) => void;
}

const PlanOption: React.FC<PlanOptionProps> = ({ planType, isSelected, onSelect }) => {
  const planDetails = {
    [PlanType.OneTime]: {
      title: "Einmaliger Kauf",
      price: "€38,90",
      description: "",
    },
    [PlanType.Monthly]: {
      title: "1 Monat - Flexible Routine",
      price: "€30,90/Mo",
      description: "28 Packungen, €1/Tag",
    },
    [PlanType.Quarterly]: {
      title: "3 Monate - Konsistente Routine",
      price: "€30,90/Mo",
      description: "3x 28 Packungen, €1/Tag",
    },
  };

  const { title, price, description } = planDetails[planType];

  return (
    <label
      className={`block cursor-pointer p-4 rounded-2xl shadow-sm transition-all duration-300 border-2 ${
        isSelected ? "bg-[#F2F7F3] border-primary" : "bg-[#FCFCF8] border-transparent"
      }`}
      onClick={() => onSelect(planType)}>
      <div className="flex justify-between items-center">
        <div className="flex items-center gap-4">
          <div
            className={`w-5 h-5 rounded-full flex items-center justify-center transition-all duration-300 ${
              isSelected ? "bg-primary" : "border border-gray-300"
            }`}>
            {isSelected && <Check size={14} className="text-white" />}
          </div>
          <div>
            <span className="text-lg font-semibold">{title}</span>
            {description && <div className="text-gray-500">{description}</div>}
          </div>
        </div>
        <span className="text-xl">{price}</span>
      </div>
    </label>
  );
};

export default function PlanSelector({ variantId }: { variantId: string }) {
  const [isSelected, setIsSelected] = useState<PlanType>(PlanType.Monthly);

  const handleSelect = (value: PlanType) => {
    setIsSelected(value);
  };

  return (
    <div className="space-y-4">
      <PlanOption
        planType={PlanType.OneTime}
        isSelected={isSelected === PlanType.OneTime}
        onSelect={handleSelect}
      />
      <PlanOption
        planType={PlanType.Monthly}
        isSelected={isSelected === PlanType.Monthly}
        onSelect={handleSelect}
      />
      <PlanOption
        planType={PlanType.Quarterly}
        isSelected={isSelected === PlanType.Quarterly}
        onSelect={handleSelect}
      />
      <div className="pt-4">
        <AddToCartButton
          variantId={variantId}
          variant="pill"
          size="pill-2xl"
          className="w-full"
        />
      </div>
    </div>
  );
}
