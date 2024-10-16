"use client";

import EffectsAfterFirstMonth from "@/components/custom/questionnaire/EffectsAfterFirstMonth";
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

  const handleAnswer = <T extends QuestionId>(
    questionId: T,
    answers: AnswerType<T>[],
  ) => {
    const nextQuestion = engine.answerQuestion(questionId, answers);

    setCurrentQuestion(nextQuestion);
    setHistory((prevHistory) => [...prevHistory, currentQuestion as Question]);
  };

  const handleBack = () => {
    if (history.length > 0) {
      const previousQuestion = history[history.length - 1];
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

  return (
    <div className="max-w-2xl">
      {currentQuestion ? (
        renderQuestion()
      ) : (
        <QuestionnaireComplete scores={engine.calculateFinalScores()} />
      )}
    </div>
  );
}
