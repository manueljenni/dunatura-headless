import { createContext } from "react";

export type AnimationContextType = {
  isAnimating: boolean;
  setIsAnimating: (isAnimating: boolean) => void;
};

export const AnimationContext = createContext<AnimationContextType>({
  isAnimating: false,
  setIsAnimating: () => {},
});
