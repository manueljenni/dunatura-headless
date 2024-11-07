"use client";

import { useContext, useEffect, useState } from "react";
import { createCart } from "../../api/fetch";
import { AnimationContext } from "../questionnaire/animationContext";

export function useCart() {
  const [cartId, setCartId] = useState<string | null>(null);

  useEffect(() => {
    const initializeCart = async () => {
      const existingCartId = localStorage.getItem("cartId"); // Check local storage for existing cart
      if (existingCartId) {
        setCartId(existingCartId);
      } else {
        const newCartId = await createCart(); // Create a new cart if none exists
        setCartId(newCartId);
        localStorage.setItem("cartId", newCartId); // Store cart ID in local storage
      }
    };

    initializeCart();
  }, []);

  return { cartId };
}

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
