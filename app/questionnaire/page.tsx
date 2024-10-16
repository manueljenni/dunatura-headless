"use client";

import EffectsAfterFirstMonth from "@/components/custom/questionnaire/EffectsAfterFirstMonth";
import { AnimatePresence, motion } from "framer-motion";
import { useState } from "react";
import ConsentScreen from "../../components/custom/questionnaire/ConsentScreen";
import QuestionnaireComplete from "../../components/custom/questionnaire/QuestionnaireComplete";
import SelectQuestion from "../../components/custom/questionnaire/SelectQuestion";
import { QuestionnaireEngine } from "./questionnaireEngine";
import {
  AnswerType,
  Question,
  QuestionId,
  questionnaireData,
  QuestionType,
} from "./types";

export default function Questionnaire() {
  const [engine] = useState(
    () => new QuestionnaireEngine({ questions: questionnaireData }),
  );
  const [currentQuestion, setCurrentQuestion] = useState<Question | null>(
    engine.getCurrentQuestion(),
  );
  const [history, setHistory] = useState<Question[]>([]);
  const [direction, setDirection] = useState<"forward" | "backward">("forward");

  const handleAnswer = <T extends QuestionId>(
    questionId: T,
    answers: AnswerType<T>[],
  ) => {
    const nextQuestion = engine.answerQuestion(questionId, answers);

    setDirection("forward");
    setCurrentQuestion(nextQuestion);
    setHistory((prevHistory) => [...prevHistory, currentQuestion as Question]);
  };

  const handleBack = () => {
    if (history.length > 0) {
      const previousQuestion = history[history.length - 1];
      setDirection("backward");
      setCurrentQuestion(previousQuestion);
      setHistory((prevHistory) => prevHistory.slice(0, -1));
      engine.goBack();
    }
  };

  const renderQuestion = () => {
    if (!currentQuestion) return null;

    const commonProps = {
      question: currentQuestion,
      onAnswer: handleAnswer,
    };

    switch (currentQuestion.type) {
      case QuestionType.ConsentScreen:
        return <ConsentScreen {...commonProps} />;
      case QuestionType.Select:
        return (
          <SelectQuestion
            {...commonProps}
            onBack={handleBack}
            variables={{ name: "PLACEHOLDER NAME" }}
          />
        );
      case QuestionType.EffectsAfterFirstMonth:
        return <EffectsAfterFirstMonth {...commonProps} />;
    }
  };

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

  const pageTransition = {
    type: "tween",
    ease: "anticipate",
    duration: 0.5,
  };

  return (
    <div className="w-full max-w-2xl mx-auto relative h-full flex justify-center items-center">
      <AnimatePresence initial={false} mode="wait" custom={direction}>
        {currentQuestion ? (
          <motion.div
            key={currentQuestion.id}
            custom={direction}
            variants={pageVariants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={pageTransition}
            className="absolute w-full">
            {renderQuestion()}
          </motion.div>
        ) : (
          <motion.div
            key="complete"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute w-full">
            <QuestionnaireComplete scores={engine.calculateFinalScores()} />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
