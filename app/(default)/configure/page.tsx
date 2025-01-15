"use client";

import {
  vitaminCategories,
  vitaminsArray,
  type Vitamin,
} from "@/app/questionnaire/types";
import { Button } from "@/components/primitives/button";
import { useToast } from "@/hooks/use-toast";

import { Check, ChevronRight, Circle } from "lucide-react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";

const categories = Object.values(vitaminCategories).map((category) => ({
  ...category,
  vitamins: vitaminsArray.filter((v) => category.vitaminIds.includes(v.id as never)),
}));

interface SelectedVitamin {
  vitamin: Vitamin;
  quantity: number;
}

export default function ConfigurePage() {
  const { toast } = useToast();
  const [selectedVitamins, setSelectedVitamins] = useState<SelectedVitamin[]>([]);
  const router = useRouter();
  const [showFloatingPill, setShowFloatingPill] = useState(false);
  const checkoutRef = useRef<HTMLDivElement>(null);
  const routineRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      if (!checkoutRef.current) return;
      const rect = checkoutRef.current.getBoundingClientRect();
      setShowFloatingPill(rect.top > window.innerHeight);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToCheckout = () => {
    checkoutRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  const scrollToRoutine = () => {
    if (routineRef.current) {
      const yOffset = -40;
      const element = routineRef.current;
      const y = element.getBoundingClientRect().top + window.pageYOffset + yOffset;

      window.scrollTo({ top: y, behavior: "smooth" });
    }
  };

  const getTotalItems = () =>
    selectedVitamins.reduce((sum, item) => sum + item.quantity, 0);

  const handleVitaminSelect = (vitamin: Vitamin) => {
    setSelectedVitamins((prev) => {
      const existing = prev.find((v) => v.vitamin.id === vitamin.id);

      if (existing) {
        return prev.filter((v) => v.vitamin.id !== vitamin.id);
      }

      if (getTotalItems() >= 8) {
        toast({
          title: "Maximum erreicht",
          description: "Du kannst maximal 8 Produkte auswählen.",
          variant: "default",
        });
        return prev;
      }

      return [...prev, { vitamin, quantity: 1 }];
    });
  };

  const updateQuantity = (vitamin: Vitamin, delta: number) => {
    setSelectedVitamins((prev) => {
      const totalItems = getTotalItems();

      return prev.reduce<SelectedVitamin[]>((acc, item) => {
        if (item.vitamin.id === vitamin.id) {
          const newQuantity = item.quantity + delta;

          if (newQuantity < 1) {
            return acc;
          }

          if (delta > 0 && totalItems >= 8) {
            toast({
              title: "Maximum erreicht",
              description: "Du kannst maximal 8 Produkte auswählen.",
              variant: "default",
            });
            return [...acc, item];
          }

          return [...acc, { ...item, quantity: newQuantity }];
        }
        return [...acc, item];
      }, []);
    });
  };

  const isVitaminSelected = (vitamin: Vitamin) =>
    selectedVitamins.some((v) => v.vitamin.id === vitamin.id);

  const totalPrice = selectedVitamins.reduce((sum, item) => sum + 7.2 * item.quantity, 0);

  const totalItems = getTotalItems();

  return (
    <>
      <div className="flex flex-col lg:flex-row gap-8 max-w-6xl mx-auto pb-8 px-4">
        <div className="space-y-8 lg:flex-1">
          <div className="space-y-2">
            <h1 className="text-[#9CA29E] text-xl font-medium">
              Erstelle deine tägliche Routine
            </h1>
            <h2 className="text-primary text-3xl font-medium pb-4 font-denimink">
              Wähle 4-8 Vitamine & Mikronährstoffe
            </h2>
            <hr className="border-t border-gray-300" />
          </div>

          {categories.map((category) => (
            <div key={category.id}>
              <h3 className="text-xl font-medium text-primary font-denimink mb-4">
                {category.title}
              </h3>
              <div className="grid grid-cols-2 lg:grid-cols-3 gap-3 lg:gap-4">
                {category.vitamins.map((vitamin) => (
                  <div
                    key={vitamin.id}
                    className={`relative p-4 lg:p-6 rounded-3xl cursor-pointer transition-all select-none
                      ${
                        isVitaminSelected(vitamin)
                          ? "bg-[#F2F7F3] ring-2 ring-primary"
                          : "bg-[#FCFCF8] ring-1 ring-[#E2E1DC]"
                      }`}
                    onClick={() => handleVitaminSelect(vitamin)}>
                    {isVitaminSelected(vitamin) ? (
                      <div className="absolute top-4 left-4">
                        <div className="bg-primary rounded-full w-6 h-6 flex items-center justify-center">
                          <Check size={14} className="text-white" strokeWidth={3} />
                        </div>
                      </div>
                    ) : (
                      <div className="absolute top-4 left-4">
                        <div className="rounded-full w-6 h-6 flex items-center justify-center">
                          <Circle size={22} className="text-[#E2E1DC]" strokeWidth={3} />
                        </div>
                      </div>
                    )}
                    <div className="flex flex-col items-center text-center select-none">
                      <Image
                        src={vitamin.getImageSrc()}
                        alt={vitamin.name}
                        className="w-[72px] h-[72px] lg:w-20 lg:h-20 object-contain mb-4"
                        width={80}
                        height={80}
                        draggable={false}
                      />
                      <h3 className="font-medium font-denimink text-xl mb-2 lg:mb-6 text-primary">
                        {vitamin.name}
                      </h3>
                      <p className="text-gray-500 text-xs lg:text-sm">
                        {vitamin.headline}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

        <div
          ref={checkoutRef}
          className="w-full lg:w-[400px] lg:sticky lg:top-4 h-fit space-y-6">
          {selectedVitamins.length > 0 && (
            <div className="bg-[#FCFCF8] rounded-3xl border border-[#E2E1DC] p-6">
              {selectedVitamins.map((item) => (
                <div
                  key={item.vitamin.id}
                  className="flex items-center justify-between py-3 first:pt-0 last:pb-0">
                  <div className="flex items-center gap-3">
                    <Image
                      src={item.vitamin.getImageSrc()}
                      alt={item.vitamin.name}
                      className="w-10 h-10 object-contain"
                      width={40}
                      height={40}
                    />
                    <div>
                      <p className="font-medium font-denimink">{item.vitamin.name}</p>
                      <p className="text-gray-500 text-sm">
                        €{(7.2 * item.quantity).toFixed(2)}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => updateQuantity(item.vitamin, -1)}
                      className="w-8 h-8 rounded-full bg-[#F6F6F3] flex items-center justify-center text-gray-600 hover:bg-[#EEEEE9]">
                      -
                    </button>
                    <span className="w-6 text-center">{item.quantity}</span>
                    <button
                      onClick={() => updateQuantity(item.vitamin, 1)}
                      className="w-8 h-8 rounded-full bg-[#F6F6F3] flex items-center justify-center text-gray-600 hover:bg-[#EEEEE9]">
                      +
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}

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

          <div className="bg-[#E8E7DE] rounded-3xl p-6 space-y-4">
            <h4 className="text-[#0F231C] text-xl font-medium">
              Möchtest du eine personalisierte Empfehlung basierend auf deinem Lebensstil
              und deinen Zielen?
            </h4>
            <Button
              variant="pill"
              size="pill-lg"
              className="w-fit bg-white text-[#0F231C] hover:bg-gray-50 flex items-center justify-center gap-2"
              onClick={() => router.push("/questionnaire")}>
              <span className="font-medium">Mache den Test</span>
              <ChevronRight
                size={18}
                className="transform transition-transform group-hover:translate-x-1"
              />
            </Button>
          </div>
        </div>
      </div>

      {/* Floating Pill */}
      <div
        className={`fixed bottom-4 left-1/2 -translate-x-1/2 bg-white rounded-full shadow-lg py-1.5 px-3 flex items-center gap-2 lg:hidden cursor-pointer border border-neutral-300 transition-all duration-300 ${
          showFloatingPill && selectedVitamins.length > 0
            ? "opacity-100 translate-y-0"
            : "opacity-0 translate-y-4 pointer-events-none"
        }`}
        onClick={scrollToRoutine}>
        <div className="flex items-center">
          {selectedVitamins.slice(0, 2).map((item, index) => (
            <div
              key={item.vitamin.id}
              className={`w-8 h-8 rounded-full bg-[#F6F6F3] flex items-center justify-center border-2 border-white ${
                index > 0 ? "-ml-3" : ""
              }`}>
              <Image
                src={item.vitamin.getImageSrc()}
                alt={item.vitamin.name}
                width={20}
                height={20}
                className="w-5 h-5 object-contain"
              />
            </div>
          ))}
          {selectedVitamins.length > 2 && (
            <div className="w-8 h-8 rounded-full bg-[#F6F6F3] flex items-center justify-center text-xs font-medium -ml-3 border-2 border-white">
              +{selectedVitamins.length - 2}
            </div>
          )}
        </div>
        <div className="flex items-center gap-1">
          <span className="font-medium text-primary">Weiter</span>
          <ChevronRight size={16} className="text-primary" />
        </div>
      </div>
    </>
  );
}
