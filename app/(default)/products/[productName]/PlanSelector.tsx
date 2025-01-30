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
  plan: PlanType;
  details: {
    title: string;
    priceSubtitle: string | null;
    description: string;
  };
  isSelected: boolean;
  onSelect: (plan: PlanType) => void;
  price: number;
}

export function PlanOption({
  plan,
  details,
  isSelected,
  onSelect,
  price,
}: PlanOptionProps) {
  const { title, priceSubtitle, description } = details;
  const finalPrice = `€${price.toFixed(2)}`;

  return (
    <label
      className={`block cursor-pointer p-4 rounded-2xl shadow-sm transition-all duration-300 border-2 ${
        isSelected ? "bg-[#F2F7F3] border-primary" : "bg-[#FCFCF8] border-transparent"
      }`}
      onClick={() => onSelect(plan)}>
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
          <p className="text-xl font-medium">{finalPrice}</p>
          {priceSubtitle && <p className="text-sm text-neutral-700">{priceSubtitle}</p>}
        </div>
      </div>
    </label>
  );
}

interface PlanSelectorProps {
  variantId: string;
  title: string;
  image: string;
  price: number;
  pricePer100g: number;
}

export default function PlanSelector({
  variantId,
  title,
  image,
  price,
  pricePer100g,
}: PlanSelectorProps) {
  const [isSelected, setIsSelected] = useState<PlanType>(PlanType.Monthly);

  const handleSelect = (value: PlanType) => {
    setIsSelected(value);
  };

  return (
    <div className="space-y-4">
      <PlanOption
        plan={PlanType.OneTime}
        details={{
          title: "Einmaliger Kauf",
          priceSubtitle: null,
          description: "",
        }}
        isSelected={isSelected === PlanType.OneTime}
        onSelect={handleSelect}
        price={price}
      />
      <PlanOption
        plan={PlanType.Monthly}
        details={{
          title: "Monatliches Abonnement",
          priceSubtitle: "pro Monat",
          description: "28 Packungen, €1/Tag",
        }}
        isSelected={isSelected === PlanType.Monthly}
        onSelect={handleSelect}
        price={price}
      />
      <PlanOption
        plan={PlanType.Quarterly}
        details={{
          title: "3 Monate - Routine",
          priceSubtitle: "pro Monat",
          description: "3x 28 Packungen, €1/Tag",
        }}
        isSelected={isSelected === PlanType.Quarterly}
        onSelect={handleSelect}
        price={price}
      />
      <div className="pt-4">
        <AddToCartButton
          variantId={variantId}
          variant="pill"
          size="pill-2xl"
          className="w-full"
          title={title}
          image={image}
          price={isSelected === PlanType.OneTime ? price : price * 0.8}
        />
      </div>
    </div>
  );
}
