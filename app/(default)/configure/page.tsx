"use client";

import {
  vitaminCategories,
  vitaminsArray,
  type Vitamin,
} from "@/app/questionnaire/types";
import { useToast } from "@/hooks/use-toast";
import { AnimatePresence } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { CartItem } from "./_components/CartItem";
import { FloatingPill } from "./_components/FloatingPill";
import { QuestionnaireCard } from "./_components/QuestionnaireCard";
import { RoutineCard } from "./_components/RoutineCard";
import { VitaminCard } from "./_components/VitaminCard";

const categories = Object.values(vitaminCategories).map((category) => ({
  ...category,
  vitamins: vitaminsArray.filter((v) => category.vitaminIds.includes(v.id as never)),
}));

export interface SelectedVitamin {
  vitamin: Vitamin;
  quantity: number;
}

export default function ConfigurePage() {
  const { toast } = useToast();
  const [selectedVitamins, setSelectedVitamins] = useState<SelectedVitamin[]>([]);
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
            <h1 className="text-[#939E90] text-xl font-semibold">
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
                  <VitaminCard
                    key={vitamin.id}
                    vitamin={vitamin}
                    isSelected={isVitaminSelected(vitamin)}
                    onSelect={handleVitaminSelect}
                  />
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
              <AnimatePresence>
                {selectedVitamins.map((item) => (
                  <CartItem
                    key={item.vitamin.id}
                    vitamin={item.vitamin}
                    quantity={item.quantity}
                    onUpdateQuantity={updateQuantity}
                  />
                ))}
              </AnimatePresence>
            </div>
          )}

          <RoutineCard
            totalItems={totalItems}
            totalPrice={totalPrice}
            routineRef={routineRef}
          />
          <QuestionnaireCard />
        </div>
      </div>

      <FloatingPill
        show={showFloatingPill}
        selectedVitamins={selectedVitamins}
        onClick={scrollToRoutine}
      />
    </>
  );
}
