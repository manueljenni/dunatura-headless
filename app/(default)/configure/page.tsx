"use client";

import {
  vitaminCategories,
  vitaminsArray,
  type Vitamin,
} from "@/app/questionnaire/types";
import pillOmega from "@/public/images/pills/pill-yellow.png";
import { ChevronRight } from "lucide-react";
import Image from "next/image";
import { useState } from "react";

const categories = Object.values(vitaminCategories).map((category) => ({
  ...category,
  vitamins: vitaminsArray.filter((v) => category.vitaminIds.includes(v.id as never)),
}));

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

  const isVitaminSelected = (vitamin: Vitamin) =>
    selectedVitamins.some((v) => v.id === vitamin.id);

  const totalPrice = selectedVitamins.reduce((sum, vitamin) => sum + 7.2, 0);

  return (
    <div className="flex gap-8 max-w-6xl mx-auto pb-8 px-4">
      <div className="space-y-8 flex-1">
        <div className="space-y-2">
          <h1 className="text-[#9CA29E] text-xl font-medium">
            Erstelle deine tägliche Routine
          </h1>
          <h2 className="text-[#0F231C] text-3xl font-medium pb-4">
            Wähle 4-8 Vitamine & Mikronährstoffe
          </h2>
          <hr className="border-t border-gray-300" />
        </div>

        {categories.map((category) => (
          <div key={category.id}>
            <h3 className="text-xl font-medium mb-4">{category.title}</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {category.vitamins.map((vitamin) => (
                <div
                  key={vitamin.id}
                  className={`relative p-6 rounded-3xl cursor-pointer transition-all
                    ${
                      isVitaminSelected(vitamin)
                        ? "bg-[#F2F7F3] ring-2 ring-primary"
                        : "bg-[#FCFCF8] ring-1 ring-[#E2E1DC]"
                    }`}
                  onClick={() => handleVitaminSelect(vitamin)}>
                  {isVitaminSelected(vitamin) && (
                    <div className="absolute top-4 left-4">
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
                      src={vitamin.getImageSrc()}
                      alt={vitamin.name}
                      className="w-20 h-20 object-contain mb-4"
                      width={80}
                      height={80}
                    />
                    <h3 className="font-medium text-xl mb-6">{vitamin.name}</h3>
                    <p className="text-gray-500 text-sm">{vitamin.headline}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>

      <div className="w-[400px] sticky top-4 h-fit space-y-6">
        {selectedVitamins.length > 0 && (
          <div className="bg-[#FCFCF8] rounded-3xl border border-[#E2E1DC] p-6">
            {selectedVitamins.map((vitamin) => (
              <div
                key={vitamin.id}
                className="flex items-center justify-between py-3 first:pt-0 last:pb-0">
                <div className="flex items-center gap-3">
                  <Image
                    src={pillOmega}
                    alt={vitamin.name}
                    className="w-10 h-10 object-contain"
                  />
                  <div>
                    <p className="font-medium">{vitamin.name}</p>
                    <p className="text-gray-500 text-sm">€7,20</p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => handleVitaminSelect(vitamin)}
                    className="w-8 h-8 rounded-full bg-[#F6F6F3] flex items-center justify-center text-gray-600 hover:bg-[#EEEEE9]">
                    -
                  </button>
                  <span className="w-6 text-center">1</span>
                  <button className="w-8 h-8 rounded-full bg-[#F6F6F3] flex items-center justify-center text-gray-600 hover:bg-[#EEEEE9]">
                    +
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}

        <div className="bg-[#FCFCF8] rounded-3xl border border-[#E2E1DC] p-6 space-y-6">
          <div>
            <h4 className="text-2xl font-medium mb-4">Deine Routine</h4>
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
            <button
              className={`w-full py-3 rounded-full font-medium transition-all text-center
                ${
                  selectedVitamins.length >= 4
                    ? "bg-primary text-white"
                    : "bg-background text-[#9CA29E] cursor-not-allowed"
                }`}
              disabled={selectedVitamins.length < 4}>
              Weiter
            </button>
            {selectedVitamins.length < 4 && (
              <p className="text-center text-sm text-gray-500 mt-2">
                Wähle noch {4 - selectedVitamins.length} weitere Zutaten aus
              </p>
            )}
          </div>
        </div>

        <div className="bg-[#E8E7DE] rounded-3xl p-6 space-y-4">
          <h4 className="text-[#0F231C] text-xl font-medium">
            Möchtest du eine personalisierte Empfehlung basierend auf deinem Lebensstil
            und deinen Zielen?
          </h4>
          <button className="w-fit py-2 px-4 rounded-full bg-white font-semibold text-[#0F231C] text-left flex items-center justify-between group hover:bg-gray-50">
            <p className="mr-2">Mache den Test</p>
            <ChevronRight
              size={18}
              className="transform transition-transform group-hover:translate-x-1 font-medium"
            />
          </button>
        </div>
      </div>
    </div>
  );
}
