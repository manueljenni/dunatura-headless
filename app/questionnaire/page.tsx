"use client";

import EffectsAfterFirstMonth from "@/components/custom/questionnaire/EffectsAfterFirstMonth";
import NameInput from "@/components/custom/questionnaire/NameInput";
import TagespackPlaceholder from "@/components/custom/questionnaire/TagespackPlaceholder";
import { AnimatePresence, motion } from "framer-motion";
import router from "next/router";
import { useState } from "react";
import ConsentScreen from "../../components/custom/questionnaire/ConsentScreen";
import QuestionnaireComplete from "../../components/custom/questionnaire/QuestionnaireComplete";
import SelectQuestion from "../../components/custom/questionnaire/SelectQuestion";
import { AnimationContext } from "./animationContext";
import { QuestionnaireEngine } from "./questionnaireEngine";
import {
  AnswerType,
  HistoryItem,
  QuestionId,
  questionnaireData,
  QuestionType,
} from "./types";

export default function Questionnaire() {
  const [engine] = useState(
    () => new QuestionnaireEngine({ questions: questionnaireData }),
  );
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [history, setHistory] = useState<HistoryItem[]>(() => {
    const initialQuestion = engine.getCurrentQuestion();
    return initialQuestion ? [{ question: initialQuestion, answers: [] }] : [];
  });
  const [direction, setDirection] = useState<"forward" | "backward">("forward");
  const [isAnimating, setIsAnimating] = useState(false);

  const currentItem = history[currentQuestionIndex];
  const currentQuestion = currentItem?.question;
  const currentAnswers = currentItem?.answers ?? [];

  const handleAnswer = <T extends QuestionId>(
    questionId: T,
    answers: AnswerType<T>[],
  ) => {
    const nextQuestion = engine.answerQuestion(questionId, answers);

    setHistory((prevHistory) => {
      const newHistory = [...prevHistory];
      newHistory[currentQuestionIndex] = { ...newHistory[currentQuestionIndex], answers };
      if (nextQuestion && currentQuestionIndex === newHistory.length - 1) {
        newHistory.push({ question: nextQuestion, answers: [] });
      }
      return newHistory;
    });

    setDirection("forward");
    setCurrentQuestionIndex((prevIndex) => prevIndex + 1);
  };

  const handleName = (name: string) => {
    const nextQuestion = engine.setNameAndGoToNextQuestion(name);

    setHistory((prevHistory) => {
      const newHistory = [...prevHistory];
      newHistory[currentQuestionIndex] = {
        ...newHistory[currentQuestionIndex],
        answers: [],
      };
      if (nextQuestion && currentQuestionIndex === newHistory.length - 1) {
        newHistory.push({ question: nextQuestion, answers: [] });
      }
      return newHistory;
    });

    setDirection("forward");
    setCurrentQuestionIndex((prevIndex) => prevIndex + 1);
  };

  const handleBack = () => {
    if (currentQuestionIndex > 0) {
      setDirection("backward");
      setCurrentQuestionIndex((prevIndex) => prevIndex - 1);
      engine.goBack();
    } else {
      // Redirect to home or handle the case when there's no more history
      router.push("/");
    }
  };

  const renderQuestion = () => {
    if (!currentQuestion) return null;

    const commonProps = {
      question: currentQuestion,
      onAnswer: handleAnswer,
      initialAnswers: currentAnswers,
      onBack: handleBack,
    };

    switch (currentQuestion.type) {
      case QuestionType.ConsentScreen:
        return <ConsentScreen {...commonProps} />;
      case QuestionType.Select:
        return <SelectQuestion {...commonProps} variables={{ name: engine.getName() }} />;
      case QuestionType.EffectsAfterFirstMonth:
        return <EffectsAfterFirstMonth {...commonProps} />;
      case QuestionType.TagespackPlaceholder:
        return <TagespackPlaceholder {...commonProps} />;
      case QuestionType.NameInput:
        return (
          <NameInput {...commonProps} onAnswer={handleName} name={engine.getName()} />
        );
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
    <div className="h-screen w-full overflow-hidden relative flex justify-center items-center z-[1000]">
      <AnimationContext.Provider value={{ isAnimating, setIsAnimating }}>
        <AnimatePresence
          initial={false}
          mode="sync"
          custom={direction}
          onExitComplete={() => setIsAnimating(false)}>
          {currentQuestion ? (
            <motion.div
              key={currentQuestion.id}
              custom={direction}
              variants={pageVariants}
              initial="enter"
              animate="center"
              exit="exit"
              transition={pageTransition}
              onAnimationStart={() => setIsAnimating(true)}
              className="absolute w-full h-full top-0">
              {renderQuestion()}
            </motion.div>
          ) : (
            <motion.div
              key="complete"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="absolute w-full">
              <QuestionnaireComplete
                scores={engine.calculateFinalScores()}
                onBack={() => {
                  handleBack();
                }}
                name={engine.getName()}
              />
            </motion.div>
          )}
        </AnimatePresence>
      </AnimationContext.Provider>
    </div>
  );
}
