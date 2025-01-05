"use client";

import QuestionnaireComplete from "@/components/custom/questionnaire/QuestionnaireComplete";
import { Button } from "@/components/primitives/button";
import { ArrowLeftIcon } from "@radix-ui/react-icons";
import { AnimatePresence, motion } from "framer-motion";
import router from "next/router";
import { useCallback, useMemo, useState } from "react";
import { AnimationContext } from "./animationContext";
import { QuestionRenderer } from "./components/QuestionRenderer";
import { useQuestionAnimation } from "./hooks/useQuestionAnimation";
import { QuestionnaireEngine } from "./questionnaireEngine";
import { AnswerType, HistoryItem, QuestionId, questionnaireData } from "./types";

type History = Partial<Record<QuestionId, HistoryItem<QuestionId>>>;

export default function Questionnaire() {
  const [engine] = useState(
    () => new QuestionnaireEngine({ questions: questionnaireData }),
  );
  const [direction, setDirection] = useState<"forward" | "backward">("forward");
  const [currentQuestionId, setCurrentQuestionId] = useState<QuestionId>(
    engine.getCurrentIndex() as QuestionId,
  );
  const [isComplete, setIsComplete] = useState(false);

  const currentQuestion = useMemo(() => {
    return engine.getCurrentQuestion();
  }, [currentQuestionId]);

  const history = useMemo(() => {
    return engine.getHistory();
  }, [currentQuestionId]);

  const handleAnswer = useCallback(
    <T extends QuestionId>(questionId: T, answers: AnswerType<T>[]) => {
      setDirection("forward");
      const nextQuestion = engine.answerQuestion(questionId, answers);
      if (nextQuestion) {
        setCurrentQuestionId(nextQuestion.id);
      } else {
        setIsComplete(true);
      }
    },
    [],
  );

  const handleName = useCallback((name: string) => {
    setDirection("forward");
    const nextQuestion = engine.setNameAndGoToNextQuestion(name);
    if (nextQuestion) {
      setCurrentQuestionId(nextQuestion.id);
    }
  }, []);

  const handleBack = useCallback(() => {
    setDirection("backward");

    if (isComplete) {
      setIsComplete(false);
      const lastQuestion = engine.goBack();
      if (lastQuestion) {
        setCurrentQuestionId(lastQuestion.id);
      }
      return;
    }

    const previousQuestion = engine.goBack();
    if (previousQuestion) {
      setCurrentQuestionId(previousQuestion.id);
    } else {
      router.push("/");
    }
  }, [isComplete]);

  const { pageVariants, pageTransition } = useQuestionAnimation();

  const progress = useMemo(() => {
    const currentIndex = engine.getCurrentIndex();
    const totalQuestions = engine.getTotalQuestions();
    return Math.round(((currentIndex + 1) / totalQuestions) * 100);
  }, [currentQuestionId]);

  return (
    <div className="h-screen w-full overflow-hidden relative flex justify-center items-center z-[1000]">
      {!isComplete && (
        <div className="absolute top-0 left-0 right-0 md:max-w-2xl mx-auto h-[50px] space-y-2 px-4">
          <div className="flex items-center justify-between py-4">
            <Button
              variant="ghost"
              size="icon"
              onClick={handleBack}
              className="w-8 h-8 border rounded-full">
              <ArrowLeftIcon className="w-4 h-4 text-primary font-medium" />
            </Button>
            <h1 className="text-lg font-medium text-primary max-w-[250px] md:max-w-3xl text-center line-clamp-1">
              {currentQuestion?.chapter}
            </h1>
            <span className="text-lg text-neutral-400 font-medium">
              {engine.getCurrentIndex() + 1} of {engine.getTotalQuestions()}
            </span>
          </div>
          <div className="w-full h-1.5 bg-primary/10 rounded-full">
            <div
              className="h-full bg-primary transition-all duration-300 rounded-full"
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>
      )}
      <AnimationContext.Provider
        value={{
          isAnimating: false,
          setIsAnimating: () => {},
        }}>
        <AnimatePresence initial={false} mode="sync" custom={direction}>
          {isComplete ? (
            <motion.div
              key="complete"
              custom={direction}
              variants={pageVariants}
              initial="enter"
              animate="center"
              exit="exit"
              transition={pageTransition}
              className="absolute w-full">
              <QuestionnaireComplete
                scores={engine.calculateFinalScores()}
                answers={engine.getAnswers()}
                onBack={handleBack}
                name={engine.getName()}
              />
            </motion.div>
          ) : currentQuestion ? (
            <motion.div
              key={currentQuestion.id}
              custom={direction}
              variants={pageVariants}
              initial="enter"
              animate="center"
              exit="exit"
              transition={pageTransition}
              className="absolute w-full h-full top-0 mt-[60px]">
              <QuestionRenderer
                question={currentQuestion}
                onAnswer={handleAnswer}
                onNameAnswer={handleName}
                initialAnswers={history[currentQuestion.id]?.answers ?? []}
                onBack={handleBack}
                name={engine.getName()}
                isLastQuestion={engine.isLastQuestion()}
              />
            </motion.div>
          ) : null}
        </AnimatePresence>
      </AnimationContext.Provider>

      {/* {process.env.NODE_ENV === "development" && (
        <div className="absolute top-0 right-0 p-4 bg-neutral-200 rounded-lg max-w-[400px] overflow-scroll h-full max-h-screen">
          <p>
            <b>Current index</b>: {engine.getCurrentIndex()}
          </p>
          <p>
            <b>Current question</b>: {currentQuestion?.text}
          </p>
          <p>
            <b>Complete</b>: {isComplete.toString()}
          </p>
          <p>
            <b>Answers</b>: <pre>{JSON.stringify(engine.getAnswers(), null, 2)}</pre>
          </p>
          <p>
            <b>History</b>: <pre>{JSON.stringify(history, null, 2)}</pre>
          </p>
        </div>
      )} */}
    </div>
  );
}
