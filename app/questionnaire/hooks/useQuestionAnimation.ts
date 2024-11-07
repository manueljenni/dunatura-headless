import { AnimationProps } from "framer-motion";

export function useQuestionAnimation() {
  const pageVariants = {
    enter: (direction: "forward" | "backward") => ({
      x: direction === "forward" ? "100%" : "-100%",
      opacity: 0,
    }),
    center: {
      x: 0,
      opacity: 1,
    },
    exit: (direction: "forward" | "backward") => ({
      x: direction === "forward" ? "-100%" : "100%",
      opacity: 0,
    }),
  };

  const pageTransition: AnimationProps["transition"] = {
    type: "tween",
    ease: "anticipate",
    duration: 0.5,
  };

  return { pageVariants, pageTransition };
}
