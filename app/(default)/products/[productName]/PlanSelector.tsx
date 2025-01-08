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
      priceSubtitle: null,
      description: "",
    },
    [PlanType.Monthly]: {
      title: "Monatliches Abonnement",
      price: "€30,90",
      priceSubtitle: "pro Monat",
      description: "28 Packungen, €1/Tag",
    },
    [PlanType.Quarterly]: {
      title: "3 Monate - Routine",
      price: "€30,90",
      priceSubtitle: "pro Monat",
      description: "3x 28 Packungen, €1/Tag",
    },
  };

  const { title, price, priceSubtitle, description } = planDetails[planType];

  return (
    <label
      className={`block cursor-pointer p-4 rounded-2xl shadow-sm transition-all duration-300 border-2 ${
        isSelected ? "bg-[#F2F7F3] border-primary" : "bg-[#FCFCF8] border-transparent"
      }`}
      onClick={() => onSelect(planType)}>
      <div className="flex justify-between items-center">
        <div className="flex items-center gap-4 w-2/3">
          <div
            className={`w-5 h-5 rounded-full flex items-center justify-center transition-all duration-300 ${
              isSelected ? "bg-primary" : "border border-gray-300"
            }`}>
            {isSelected && <Check size={14} className="text-white" />}
          </div>
          <div>
            <span className="text-lg font-semibold leading-tight">{title}</span>
            {description && (
              <div className="text-gray-500 text-sm md:text-base">{description}</div>
            )}
          </div>
        </div>
        <div className="flex flex-col justify-center items-center">
          <p className="text-xl font-medium">{price}</p>
          {priceSubtitle && <p className="text-sm text-neutral-700">{priceSubtitle}</p>}
        </div>
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
