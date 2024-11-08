"use client";

import { AnimatePresence, motion } from "framer-motion";
import router from "next/router";
import { useCallback, useState } from "react";
import QuestionnaireComplete from "../../components/custom/questionnaire/QuestionnaireComplete";
import { AnimationContext } from "./animationContext";
import { QuestionRenderer } from "./components/QuestionRenderer";
import { useQuestionAnimation } from "./hooks/useQuestionAnimation";
import { QuestionnaireEngine } from "./questionnaireEngine";
import {
  AnswerType,
  Question,
  QuestionId,
  questionnaireData,
  QuestionnaireState,
} from "./types";

function updateHistory<T extends QuestionId>(
  history: Array<{ question: Question<QuestionId>; answers: AnswerType<QuestionId>[] }>,
  currentIndex: number,
  answers: AnswerType<T>[],
  nextQuestion: Question<QuestionId> | null,
) {
  const newHistory = [...history];
  newHistory[currentIndex] = {
    ...newHistory[currentIndex],
    answers: answers as AnswerType<QuestionId>[],
  };

  if (nextQuestion && currentIndex === newHistory.length - 1) {
    newHistory.push({ question: nextQuestion, answers: [] });
  }

  return newHistory;
}

export default function Questionnaire() {
  const [engine] = useState(
    () => new QuestionnaireEngine({ questions: questionnaireData }),
  );
  const [state, setState] = useState<QuestionnaireState<QuestionId>>(() => ({
    currentQuestionIndex: 0,
    history: engine.getCurrentQuestion()
      ? [{ question: engine.getCurrentQuestion()!, answers: [] }]
      : [],
    direction: "forward" as const,
    isAnimating: false,
  }));

  const { pageVariants, pageTransition } = useQuestionAnimation();
  const currentItem = state.history[state.currentQuestionIndex];
  const currentQuestion = currentItem?.question;
  const currentAnswers = currentItem?.answers ?? [];

  const handleAnswer = useCallback(
    <T extends QuestionId>(questionId: T, answers: AnswerType<T>[]) => {
      const nextQuestion = engine.answerQuestion(questionId, answers);
      setState((prev) => ({
        ...prev,
        history: updateHistory(
          prev.history,
          prev.currentQuestionIndex,
          answers,
          nextQuestion,
        ),
        direction: "forward",
        currentQuestionIndex: prev.currentQuestionIndex + 1,
      }));
    },
    [engine],
  );

  const handleName = useCallback(
    (name: string) => {
      const nextQuestion = engine.setNameAndGoToNextQuestion(name);
      setState((prev) => ({
        ...prev,
        history: updateHistory(prev.history, prev.currentQuestionIndex, [], nextQuestion),
        direction: "forward",
        currentQuestionIndex: prev.currentQuestionIndex + 1,
      }));
    },
    [engine],
  );

  const handleBack = useCallback(() => {
    if (state.currentQuestionIndex > 0) {
      setState((prev) => ({
        ...prev,
        direction: "backward",
        currentQuestionIndex: prev.currentQuestionIndex - 1,
      }));
      engine.goBack();
    } else {
      router.push("/");
    }
  }, [state.currentQuestionIndex, engine]);

  return (
    <div className="h-screen w-full overflow-hidden relative flex justify-center items-center z-[1000]">
      <AnimationContext.Provider
        value={{
          isAnimating: state.isAnimating,
          setIsAnimating: (isAnimating) => setState((prev) => ({ ...prev, isAnimating })),
        }}>
        <AnimatePresence
          initial={false}
          mode="sync"
          custom={state.direction}
          onExitComplete={() => setState((prev) => ({ ...prev, isAnimating: false }))}>
          {!currentQuestion ? (
            <motion.div
              key="complete"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="absolute w-full">
              <QuestionnaireComplete
                scores={engine.calculateFinalScores()}
                onBack={handleBack}
                name={engine.getName()}
              />
            </motion.div>
          ) : (
            <motion.div
              key={currentQuestion.id}
              custom={state.direction}
              variants={pageVariants}
              initial="enter"
              animate="center"
              exit="exit"
              transition={pageTransition}
              onAnimationStart={() =>
                setState((prev) => ({ ...prev, isAnimating: true }))
              }
              className="absolute w-full h-full top-0">
              <QuestionRenderer
                question={currentQuestion}
                onAnswer={handleAnswer}
                onNameAnswer={handleName}
                initialAnswers={currentAnswers}
                onBack={handleBack}
                name={engine.getName()}
              />
            </motion.div>
          )}
        </AnimatePresence>
      </AnimationContext.Provider>
    </div>
  );
}
