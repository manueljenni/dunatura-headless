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
import { QuestionnaireEngine } from "./questionnaireEngine";
import {
  AnswerType,
  Question,
  QuestionId,
  questionnaireData,
  QuestionType,
} from "./types";

type HistoryItem = {
  question: Question;
  answers: AnswerType<QuestionId>[];
};

export default function Questionnaire() {
  const [engine] = useState(
    () => new QuestionnaireEngine({ questions: questionnaireData }),
  );
  const [currentQuestion, setCurrentQuestion] = useState<Question | null>(
    engine.getCurrentQuestion(),
  );
  const [history, setHistory] = useState<HistoryItem[]>([]);
  const [currentAnswers, setCurrentAnswers] = useState<AnswerType<QuestionId>[]>([]);
  const [direction, setDirection] = useState<"forward" | "backward">("forward");

  const handleAnswer = <T extends QuestionId>(
    questionId: T,
    answers: AnswerType<T>[],
  ) => {
    const nextQuestion = engine.answerQuestion(questionId, answers);

    setDirection("forward");
    setCurrentQuestion(nextQuestion);
    setHistory((prevHistory) => [
      ...prevHistory,
      { question: currentQuestion as Question, answers: currentAnswers },
    ]);
    setCurrentAnswers(answers);
  };

  const handleName = (name: string) => {
    const nextQuestion = engine.setNameAndGoToNextQuestion(name);
    setDirection("forward");
    setCurrentQuestion(nextQuestion);
    setHistory((prevHistory) => [
      ...prevHistory,
      { question: currentQuestion as Question, answers: currentAnswers },
    ]);
  };

  const handleBack = () => {
    if (history.length > 0) {
      const previousItem = history[history.length - 1];
      setDirection("backward");
      setCurrentQuestion(previousItem.question);
      setCurrentAnswers(previousItem.answers);
      setHistory((prevHistory) => prevHistory.slice(0, -1));
      engine.goBack();
    } else {
      // Redirect to home
      router.push("/");
    }
  };

  const renderQuestion = () => {
    if (!currentQuestion) return null;

    const commonProps = {
      question: currentQuestion,
      onAnswer: handleAnswer,
      initialAnswers: currentAnswers,
    };

    switch (currentQuestion.type) {
      case QuestionType.ConsentScreen:
        return <ConsentScreen {...commonProps} onBack={handleBack} />;
      case QuestionType.Select:
        return (
          <SelectQuestion
            {...commonProps}
            onBack={handleBack}
            variables={{ name: engine.getName() ?? "PLACEHOLDER NAME" }}
          />
        );
      case QuestionType.EffectsAfterFirstMonth:
        return <EffectsAfterFirstMonth {...commonProps} />;
      case QuestionType.TagespackPlaceholder:
        return <TagespackPlaceholder {...commonProps} />;
      case QuestionType.NameInput:
        return (
          <NameInput
            {...commonProps}
            onAnswer={handleName}
            name={engine.getName() ?? "PLACEHOLDER NAME"}
            onBack={handleBack}
          />
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
      <AnimatePresence initial={false} mode="sync" custom={direction}>
        {currentQuestion ? (
          <motion.div
            key={currentQuestion.id}
            custom={direction}
            variants={pageVariants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={pageTransition}
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
    </div>
  );
}
