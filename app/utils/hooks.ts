"use client";

import { useContext, useEffect } from "react";
import { AnimationContext } from "../questionnaire/animationContext";

type NavigationHandlers = {
  onNext?: () => void;
  isNextDisabled?: boolean;
  onBack?: () => void;
  isAnimating: boolean;
};

export function useKeyboardNavigation({
  onNext,
  isNextDisabled,
  onBack,
}: Omit<NavigationHandlers, "isAnimating">) {
  const { isAnimating } = useContext(AnimationContext);

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Enter" || event.key === "ArrowRight") {
        if (!isNextDisabled && !isAnimating) {
          onNext?.();
        }
      } else if (event.key === "ArrowLeft" && !isAnimating) {
        onBack?.();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [onNext, onBack, isAnimating, isNextDisabled]);
}
