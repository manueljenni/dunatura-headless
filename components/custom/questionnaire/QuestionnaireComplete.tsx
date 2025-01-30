"use client";

import { PlanSelector } from "@/app/(default)/configure/_components/PlanSelector";
import {
  Answers,
  healthGoalIcons,
  questionnaireData,
  VitaminId,
  vitaminIdToKey,
  vitamins,
} from "@/app/questionnaire/types";
import { useKeyboardNavigation } from "@/app/utils/hooks";
import Icon from "@/components/Icon";
import { Button } from "@/components/primitives/button";
import { useCart } from "@/contexts/CartContext";
import { useToast } from "@/hooks/use-toast";
import { PLAN_DISCOUNTS, SellingPlanType } from "@/types/selling-plans";
import { ChevronRight, Loader2 } from "lucide-react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import Goal from "./completed/Goal";

type Goal = {
  text: string;
  value: string;
  icon: (typeof healthGoalIcons)[keyof typeof healthGoalIcons];
};

type QuestionnaireCompleteProps = {
  scores: Record<string, number>;
  onBack: () => void;
  name?: string;
  answers: Answers;
};

interface LoopBundleData {
  [key: string]: {
    bundleId: string;
    boxSizeId: string;
  };
}

const loopBundleData: LoopBundleData = {
  "688728244488": {
    bundleId: "01HHC69YTENFC277KGK3NB72HH",
    boxSizeId: "01HHC6A74G56TNXEZ396XV928S",
  },
  "688658252040": {
    bundleId: "01HHC69YJFS1YHF7GN7SWSK814",
    boxSizeId: "01HHC6A6T6GTRBKD66MY97PQ4G",
  },
  "689000841480": {
    bundleId: "01HHC6A05J6G8FTKWDPTE7RHAK",
    boxSizeId: "01HHC6A8E7H0HMBWFWGCMR6AHF",
  },
};

export default function QuestionnaireComplete({
  scores,
  onBack,
  name,
  answers,
}: QuestionnaireCompleteProps) {
  useKeyboardNavigation({
    onBack: () => onBack(),
  });

  const router = useRouter();

  const goals = answers[2]
    ?.map((goalValue) => {
      const goalAnswer = questionnaireData[1].answers.find(
        (answer) => answer.value.value === goalValue,
      );
      return {
        ...goalAnswer?.value,
        icon: healthGoalIcons[goalValue as keyof typeof healthGoalIcons],
      };
    })
    .filter(
      (
        goal,
      ): goal is (typeof questionnaireData)[1]["answers"][number]["value"] & {
        icon: (typeof healthGoalIcons)[keyof typeof healthGoalIcons];
      } => !!goal,
    );

  const scoresArray = Object.keys(scores)
    .map((key) => {
      const vitaminKey = vitaminIdToKey[Number(key) as VitaminId];
      if (!vitaminKey) return null;
      return {
        id: Number(key),
        value: scores[key],
        explanation: null,
      };
    })
    .filter((item): item is NonNullable<typeof item> => !!item)
    .sort((a, b) => b.value - a.value)
    .slice(0, 6);

  const titleRef = useRef<HTMLDivElement>(null);
  const [offset, setOffset] = useState<number | null>(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const { addItem, checkout } = useCart();
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(false);
  const bundleName = name;
  const [selectedPlan, setSelectedPlan] = useState<SellingPlanType>(
    SellingPlanType.Monthly,
  );
  const [showCheckout, setShowCheckout] = useState(false);

  useEffect(() => {
    const calculateOffset = () => {
      const container = document.querySelector(".pills-container");
      if (titleRef.current && container) {
        const containerRect = container.getBoundingClientRect();
        const titleRect = titleRef.current.getBoundingClientRect();
        // Only set offset if we have valid measurements
        if (containerRect.width > 0 && titleRect.width > 0) {
          setOffset(titleRect.left - containerRect.left);
        }
      }
    };

    // Initial calculation after a short delay to ensure DOM is ready
    const timer = setTimeout(calculateOffset, 100);

    // Recalculate on resize
    window.addEventListener("resize", calculateOffset);

    return () => {
      clearTimeout(timer);
      window.removeEventListener("resize", calculateOffset);
    };
  }, []);

  const scrollToIndex = (index: number) => {
    const container = document.querySelector(".pills-container");
    const items = container?.querySelectorAll(".pill-item");
    if (container && items && items[index]) {
      const containerRect = container.getBoundingClientRect();
      const itemRect = items[index].getBoundingClientRect();
      const scrollOffset = itemRect.left - containerRect.left + container.scrollLeft;

      container.scrollTo({
        left: scrollOffset,
        behavior: "smooth",
      });
    }
  };

  const handlePrevious = () => {
    if (currentIndex > 0) {
      setCurrentIndex((prev) => prev - 1);
      scrollToIndex(currentIndex - 1);
    }
  };

  const handleNext = () => {
    if (currentIndex < scoresArray.length - 1) {
      setCurrentIndex((prev) => prev + 1);
      scrollToIndex(currentIndex + 1);
    }
  };

  const basePrice = scoresArray.reduce(
    (sum, vitamin) => sum + vitamins[vitaminIdToKey[vitamin.id as VitaminId]].price,
    0,
  );

  const discount = PLAN_DISCOUNTS[selectedPlan];
  const finalPrice = basePrice * (1 - discount / 100);

  const generateBundleId = async () => {
    let boxSizeId = "01HHC6A8E7H0HMBWFWGCMR6AHF";
    let sellingPlanId = null;
    let bundleId = "01HHC6A05J6G8FTKWDPTE7RHAK";

    if (selectedPlan) {
      const data = loopBundleData[selectedPlan];
      boxSizeId = data.boxSizeId;
      sellingPlanId = selectedPlan;
      bundleId = data.bundleId;
    }

    const requestBody = {
      boxSizeId,
      sellingPlanId: sellingPlanId ? parseInt(sellingPlanId) : null,
      productVariants: [],
      quantity: 1,
    };

    const response = await fetch(
      `https://api.loopsubscriptions.com/storefront/2023-10/bundle/${bundleId}/transaction`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(requestBody),
      },
    );

    const responseData = await response.json();
    if (!response.ok) throw new Error(`Error generating bundle ID`);
    return responseData.data;
  };

  const handleCheckout = async () => {
    if (!bundleName) return;

    try {
      setIsLoading(true);
      const loopResponseObject = await generateBundleId();

      // Convert vitamins to cart items
      const cartItems = scoresArray.map((vitamin) => ({
        variantId: vitamins[vitaminIdToKey[vitamin.id as VitaminId]].variantId,
        quantity: 1,
        sellingPlanId: selectedPlan ? parseInt(selectedPlan) : null,
        title: vitamins[vitaminIdToKey[vitamin.id as VitaminId]].name,
        price: vitamin.value,
        image: vitamins[vitaminIdToKey[vitamin.id as VitaminId]].getImageSrc(),
        properties: {
          _bundleId: loopResponseObject.txnId,
          Name: bundleName,
          Protocol: "(28 Tagespacks = 4 Wochen)",
        },
      }));

      // Add items to cart
      for (const item of cartItems) {
        await addItem({
          variantId: item.variantId,
          quantity: item.quantity,
          sellingPlanId: item.sellingPlanId,
          title: item.title,
          price: item.price,
          image: item.image,
          properties: item.properties,
        });
      }

      await checkout();
    } catch (error) {
      console.error("Error during checkout:", error);
      toast({
        title: "Fehler",
        description: "Es ist ein Fehler aufgetreten. Bitte versuche es erneut.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleCustomize = () => {
    // Create the URL with raw values, let the browser handle encoding
    const vitaminIds = scoresArray.map((vitamin) => `${vitamin.id}:1`).join(",");
    router.push(`/configure?vitamins=${vitaminIds}`);
  };

  return (
    <div className="h-full flex items-start justify-center w-full">
      <div className="h-full px-4 w-full">
        {!showCheckout ? (
          // Results View
          <div className="md:max-w-2xl mx-auto w-full">
            <div className="space-y-6 pt-8">
              <div>
                <h2 className="text-4xl text-primary font-semibold mb-4">
                  Hier ist deine Kombination, <br /> basierend auf deinen Zielen
                </h2>
                <div className="flex gap-4 w-full lg:w-auto mb-8">
                  <Button
                    onClick={() => setShowCheckout(true)}
                    className="bg-primary text-white hover:bg-primary/90 w-full lg:w-auto"
                    variant="pill"
                    size="pill-xl">
                    <div className="flex items-center gap-2">
                      <span className="font-medium">Weiter</span>
                      <ChevronRight size={16} />
                    </div>
                  </Button>
                </div>
                <div className="flex py-4 space-y-6 lg:space-y-0 pb-8 flex-col lg:flex-row">
                  {goals?.map((goal, index) => {
                    const IconComponent = goal.icon;
                    return (
                      <Goal
                        key={index}
                        text={goal.text}
                        icon={<IconComponent className="w-6 h-6 text-primary" />}
                      />
                    );
                  })}
                </div>
              </div>
            </div>

            <div className="md:max-w-2xl mx-auto w-full mb-4 flex items-center justify-between">
              <h1 ref={titleRef} className="text-3xl font-medium text-primary">
                Unsere Empfehlung für dich
              </h1>
              <div className="flex gap-2">
                <button
                  onClick={handlePrevious}
                  disabled={currentIndex === 0}
                  className={`testimonial-nav ${currentIndex === 0 ? "disabled-button" : ""}`}>
                  <svg
                    width="40"
                    height="40"
                    viewBox="0 0 65 65"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg">
                    <rect
                      x="1"
                      y="0.740967"
                      width="63"
                      height="63"
                      rx="31.5"
                      stroke="currentColor"
                      className="text-[#D8DED9]"
                    />
                    <path
                      d="M26.9353 30.9075L34.0873 23.7555L32.2017 21.8699L21.8307 32.2408L32.2017 42.6116L34.0873 40.726L26.9353 33.5742H43.1641V30.9075H26.9353Z"
                      className="fill-primary"
                    />
                  </svg>
                </button>
                <button
                  onClick={handleNext}
                  disabled={currentIndex === scoresArray.length - 1}
                  className={`testimonial-nav ${
                    currentIndex === scoresArray.length - 1 ? "disabled-button" : ""
                  }`}>
                  <svg
                    width="40"
                    height="40"
                    viewBox="0 0 65 65"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg">
                    <rect
                      x="1"
                      y="0.740967"
                      width="63"
                      height="63"
                      rx="31.5"
                      stroke="currentColor"
                      className="text-[#D8DED9]"
                    />
                    <path
                      d="M38.0647 30.9075L30.9127 23.7555L32.7983 21.8699L43.1693 32.2408L32.7983 42.6116L30.9127 40.726L38.0647 33.5742H21.8359V30.9075H38.0647Z"
                      className="fill-primary"
                    />
                  </svg>
                </button>
              </div>
            </div>

            <div className="relative w-screen -ml-4">
              <div
                className={`pills-container flex gap-4 overflow-x-auto pb-4 px-4 no-scrollbar transition-opacity duration-500 ${
                  offset === null ? "opacity-0" : "opacity-100"
                }`}>
                {offset !== null && (
                  <>
                    <div
                      className="shrink-0"
                      style={{ width: offset - 32 }}
                      aria-hidden="true"
                    />
                    {scoresArray.map((vitamin, index) => {
                      const vitaminKey = vitaminIdToKey[vitamin.id as VitaminId];
                      if (vitaminKey) {
                        return (
                          <div
                            key={vitamin.id}
                            className="pill-item w-[350px] shrink-0 snap-start rounded-2xl bg-[#FBFCF8] p-6 border shadow-lg">
                            <div className="space-y-4">
                              <div className="space-y-2">
                                <h2 className="text-2xl font-semibold text-primary">
                                  {vitamins[vitaminKey].name}
                                </h2>
                                <div className="flex gap-4 font-medium text-primary">
                                  {vitamins[vitaminKey].effects.map((effect, index) => (
                                    <div key={index} className="flex items-center gap-2">
                                      <Icon
                                        icon={effect.icon}
                                        color="#324033"
                                        size={20}
                                      />
                                      <span>{effect.text}</span>
                                    </div>
                                  ))}
                                </div>
                              </div>
                              <div className="py-6">
                                <div className="relative h-[100px] w-full">
                                  <Image
                                    src={vitamins[vitaminKey].getImageSrc()}
                                    alt={vitamins[vitaminKey].name}
                                    fill
                                    className="object-contain"
                                  />
                                </div>
                              </div>
                              <p className="text-primary font-medium">
                                {vitamin.explanation}
                              </p>
                              {/* <button className="rounded-full bg-[#D8DED9] px-6 py-2 font-medium">
                                Details
                              </button> */}
                            </div>
                          </div>
                        );
                      }
                    })}
                  </>
                )}
              </div>
            </div>
          </div>
        ) : (
          // Checkout View
          <div className="md:max-w-2xl mx-auto w-full">
            <div className="space-y-6 py-8">
              <div>
                <h2 className="text-4xl text-primary font-semibold mb-4">
                  Wähle deinen Plan
                </h2>
              </div>
            </div>

            <div className="bg-[#FCFCF8] rounded-3xl border border-[#E2E1DC] p-6 space-y-6">
              <div>
                <h4 className="text-2xl text-primary font-medium mb-4 font-denimink">
                  Deine personalisierte Routine
                </h4>
              </div>

              <div className="border-t pt-4">
                <div className="flex justify-between items-center mb-4">
                  <span className="text-gray-500">Tagespreis</span>
                  <span className="font-medium">€{(finalPrice / 28).toFixed(2)}/Tag</span>
                </div>
                <div className="flex justify-between items-center mb-6">
                  <span className="text-gray-500">Monatspreis</span>
                  <span className="font-medium">€{finalPrice.toFixed(2)}/Monat</span>
                </div>
                <div className="flex gap-4">
                  <Button
                    onClick={handleCheckout}
                    className={`w-full transition-all ${
                      bundleName
                        ? "bg-primary text-white hover:bg-primary/90"
                        : "bg-background text-[#9CA29E] cursor-not-allowed"
                    }`}
                    disabled={!bundleName || isLoading}
                    variant="pill"
                    size="pill-xl">
                    <div className="flex items-center gap-2">
                      {isLoading ? (
                        <>
                          <Loader2 className="h-4 w-4 animate-spin" />
                          <span className="font-medium">Wird hinzugefügt...</span>
                        </>
                      ) : (
                        <>
                          <span className="font-medium">Weiter</span>
                          <ChevronRight size={16} />
                        </>
                      )}
                    </div>
                  </Button>
                </div>
              </div>

              <PlanSelector
                selectedPlan={selectedPlan}
                onSelect={setSelectedPlan}
                price={basePrice}
              />
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
