"use client";

import { addItemsToCart, createCart, getCheckoutUrl } from "@/api/fetch";
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

const minAmountOfProducts = "4";

const categories = Object.values(vitaminCategories).map((category) => ({
  ...category,
  vitamins: vitaminsArray.filter((v) => category.vitaminIds.includes(v.id as never)),
}));

export interface SelectedVitamin {
  vitamin: Vitamin;
  quantity: number;
}

interface LoopBundleData {
  [key: string]: {
    bundleId: string;
    boxSizeId: string;
  };
}

interface SellingPlan {
  id: string;
  name: string | null;
}

// Add this enum to match PlanSelector
enum PlanType {
  OneTime = "689000841480", // Einzelkauf ID
  Monthly = "688728244488", // Flexibles Abonnement ID
  Quarterly = "688658252040", // Dreimonats-Paket ID
}

export default function ConfigurePage() {
  const { toast } = useToast();
  const [selectedVitamins, setSelectedVitamins] = useState<SelectedVitamin[]>([]);
  const [showFloatingPill, setShowFloatingPill] = useState(false);
  const checkoutRef = useRef<HTMLDivElement>(null);
  const routineRef = useRef<HTMLDivElement>(null);
  const [sellingPlan, setSellingPlan] = useState<SellingPlan | null>(null);
  const [bundleName, setBundleName] = useState<string>("");
  const [selectedPlan, setSelectedPlan] = useState<PlanType>(PlanType.Monthly);

  const loopBundleData: LoopBundleData = {
    // Flexibles Abonnement (Lieferung alle 4 Wochen)
    "688728244488": {
      bundleId: "01HHC69YTENFC277KGK3NB72HH",
      boxSizeId: "01HHC6A74G56TNXEZ396XV928S",
    },
    // Dreimonats-Paket
    "688658252040": {
      bundleId: "01HHC69YJFS1YHF7GN7SWSK814",
      boxSizeId: "01HHC6A6T6GTRBKD66MY97PQ4G",
    },
    // Einzelkauf
    "689000841480": {
      bundleId: "01HHC6A05J6G8FTKWDPTE7RHAK",
      boxSizeId: "01HHC6A8E7H0HMBWFWGCMR6AHF",
    },
  };

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

  const totalPrice = selectedVitamins.reduce(
    (sum, item) => sum + item.vitamin.price * item.quantity,
    0,
  );
  const totalItems = getTotalItems();

  const generateBundleId = async () => {
    let boxSizeId = "01HHC6A8E7H0HMBWFWGCMR6AHF";
    let sellingPlanId = null;
    let bundleId = "01HHC6A05J6G8FTKWDPTE7RHAK";

    if (sellingPlan?.id) {
      const data = loopBundleData[sellingPlan.id];
      boxSizeId = data.boxSizeId;
      sellingPlanId = sellingPlan.id;
      bundleId = data.bundleId;
    } else {
      throw new Error("No selling plan selected");
    }

    const requestBody = {
      boxSizeId,
      sellingPlanId: parseInt(sellingPlanId),
      productVariants: [],
      quantity: 1,
    };

    console.log("Loop Transaction Request:", requestBody);

    try {
      const response = await fetch(
        `https://api.loopsubscriptions.com/storefront/2023-10/bundle/${bundleId}/transaction`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(requestBody),
        },
      );

      const responseData = await response.json();
      console.log("Loop Transaction Response:", {
        status: response.status,
        ok: response.ok,
        data: responseData,
      });

      console.log("Txn ID: ", responseData.data.txnId);

      if (!response.ok) {
        throw new Error(`Error generating bundle ID: ${JSON.stringify(responseData)}`);
      }

      return responseData.data;
    } catch (error) {
      console.error("Error:", error);
      return [...Array(32)]
        .map(() => Math.floor(Math.random() * 16).toString(16))
        .join("");
    }
  };

  const handleCheckout = async () => {
    if (selectedVitamins.length < parseInt(minAmountOfProducts)) return;

    try {
      const loopResponseObject = await generateBundleId();
      const { cartId } = await createCart();

      // Create array of all items
      const items = selectedVitamins.map((item) => ({
        id: item.vitamin.variantId,
        quantity: item.quantity,
        selling_plan: sellingPlan?.id ? parseInt(sellingPlan.id) : null,
        properties: {
          _bundleId: loopResponseObject.txnId,
          Name: bundleName,
          Protocol: "(28 Tagespacks = 4 Wochen)",
        },
      }));

      console.log("Items to add to cart:", items);

      // Add all items to cart at once
      const cart = await addItemsToCart(cartId, items);
      if (!cart) {
        throw new Error("Cart not found");
      }
      if (!cart.lines?.edges) {
        console.error("Cart structure:", cart);
        throw new Error("Cart lines not found");
      }

      const lines = cart.lines.edges.map((edge: any) => edge.node);
      console.log("Cart lines:", lines);
      console.log("Final cart state:", cart);

      const checkoutUrl = await getCheckoutUrl(cartId);
      console.log("Checkout URL:", checkoutUrl);

      window.location.href = checkoutUrl;
    } catch (error) {
      console.error("Error during checkout:", error);
      toast({
        title: "Fehler",
        description: "Es ist ein Fehler aufgetreten. Bitte versuche es erneut.",
        variant: "destructive",
      });
    }
  };

  const handleSellingPlanSelect = (plan: SellingPlan | null) => {
    setSellingPlan(plan);
  };

  const hasMinimumAmountOfProducts = () =>
    getTotalItems() >= parseInt(minAmountOfProducts);

  useEffect(() => {
    // Update sellingPlan whenever selectedPlan changes
    setSellingPlan({
      id: selectedPlan,
      name:
        selectedPlan === PlanType.OneTime
          ? "Einzelkauf"
          : selectedPlan === PlanType.Monthly
            ? "Flexibles Abonnement"
            : "Dreimonats-Paket",
    });
  }, [selectedPlan]);

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
            onCheckout={handleCheckout}
            bundleName={bundleName}
            onBundleNameChange={setBundleName}
            selectedPlan={selectedPlan}
            onPlanSelect={setSelectedPlan}
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
