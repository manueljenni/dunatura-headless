"use client";

import { vitaminsArray } from "@/app/questionnaire/types";
import pillOmega from "@/public/images/pills/pill-yellow.png";
import Image from "next/image";
import { useState } from "react";

type Vitamin = {
  id: string;
  name: string;
  price: number;
  description: string;
  category: "general" | "energy";
};

type VitaminCardProps = {
  vitamin: Vitamin;
  selected: boolean;
  onSelect: (vitamin: Vitamin) => void;
};

function VitaminCard({ vitamin, selected, onSelect }: VitaminCardProps) {
  return (
    <div
      className={`relative p-6 rounded-3xl border cursor-pointer transition-all
        ${
          selected ? "border-primary bg-white shadow-sm" : "border-[#E2E1DC] bg-[#FCFCF8]"
        }`}
      onClick={() => onSelect(vitamin)}>
      {selected && (
        <div className="absolute top-4 right-4">
          <div className="bg-primary rounded-full p-1">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
              <path
                d="M20 6L9 17L4 12"
                stroke="white"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </div>
        </div>
      )}
      <div className="flex flex-col items-center text-center">
        <Image
          src={pillOmega}
          alt={vitamin.name}
          className="w-20 h-20 object-contain mb-4"
        />
        <h3 className="font-medium text-xl mb-2">{vitamin.name}</h3>
        <p className="text-gray-500 text-sm mb-4">{vitamin.description}</p>
        <p className="text-sm font-medium">€{vitamin.price}/day</p>
      </div>
    </div>
  );
}

export default function ConfigurePage() {
  const [selectedVitamins, setSelectedVitamins] = useState<Vitamin[]>([]);

  const handleVitaminSelect = (vitamin: Vitamin) => {
    setSelectedVitamins((prev) => {
      const isSelected = prev.some((v) => v.id === vitamin.id);

      if (isSelected) {
        return prev.filter((v) => v.id !== vitamin.id);
      }

      if (prev.length >= 8) {
        return prev;
      }

      return [...prev, vitamin];
    });
  };

  const generalVitamins: Vitamin[] = vitaminsArray.map((v) => ({
    id: v.id.toString(),
    name: v.name,
    price: 7.2,
    description: "The complex for tissue growth and cell division.",
    category: "general",
  }));

  const energyVitamins: Vitamin[] = vitaminsArray.slice(0, 3).map((v) => ({
    id: `energy-${v.id}`,
    name: v.name,
    price: 7.2,
    description: "The complex for tissue growth and cell division.",
    category: "energy",
  }));

  const isVitaminSelected = (vitamin: Vitamin) =>
    selectedVitamins.some((v) => v.id === vitamin.id);

  const totalPrice = selectedVitamins.reduce((sum, vitamin) => sum + vitamin.price, 0);

  return (
    <div className="space-y-8 pb-32 max-w-6xl mx-auto">
      <div>
        <h1 className="text-3xl font-medium mb-2">Build your daily routine</h1>
        <h2 className="text-2xl mb-6">Choose 4-8 vitamins & micronutrients</h2>
      </div>

      <div>
        <h3 className="text-xl font-medium mb-4">General health</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {generalVitamins.map((vitamin) => (
            <VitaminCard
              key={vitamin.id}
              vitamin={vitamin}
              selected={isVitaminSelected(vitamin)}
              onSelect={handleVitaminSelect}
            />
          ))}
        </div>
      </div>

      <div>
        <h3 className="text-xl font-medium mb-4">Energy</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {energyVitamins.map((vitamin) => (
            <VitaminCard
              key={vitamin.id}
              vitamin={vitamin}
              selected={isVitaminSelected(vitamin)}
              onSelect={handleVitaminSelect}
            />
          ))}
        </div>
      </div>

      <div className="fixed bottom-0 left-0 right-0 bg-white p-4 border-t">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <div>
            <h4 className="text-2xl font-medium">Review your routine</h4>
            <div className="flex gap-4 items-center">
              <div className="flex -space-x-2">
                {selectedVitamins.map((vitamin, i) => (
                  <Image
                    key={vitamin.id}
                    src={pillOmega}
                    alt={vitamin.name}
                    className="w-8 h-8 object-contain"
                  />
                ))}
              </div>
              <span className="text-gray-500">{selectedVitamins.length} selected</span>
              <span className="font-medium">€{totalPrice.toFixed(2)}/day</span>
            </div>
          </div>
          <button
            className={`px-8 py-3 rounded-full font-medium transition-all
              ${
                selectedVitamins.length >= 4
                  ? "bg-primary text-white"
                  : "bg-gray-100 text-gray-400 cursor-not-allowed"
              }`}
            disabled={selectedVitamins.length < 4}>
            Continue
          </button>
        </div>
      </div>
    </div>
  );
}
