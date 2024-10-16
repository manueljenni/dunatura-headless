"use client";

import { useState } from "react";
import ConsentScreen from "./ConsentScreen";
import QuestionnaireComplete from "./QuestionnaireComplete";
import { QuestionnaireEngine } from "./questionnaireEngine";
import SelectQuestion from "./SelectQuestion";
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
        return <SelectQuestion {...commonProps} variables={{ name: "Max" }} />;
      default:
        return null;
    }
  };

  return (
    <div className="max-w-2xl">
      {currentQuestion ? (
        renderQuestion()
      ) : (
        <QuestionnaireComplete scores={engine.calculateFinalScores()} />
      )}
      {history.length > 0 && (
        <button onClick={handleBack} className="mt-4 px-4 py-2 bg-gray-200 rounded">
          Back
        </button>
      )}
    </div>
  );
}
