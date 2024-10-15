"use client";

import { useState } from "react";
import ConsentScreen from "./ConsentScreen";
import QuestionnaireComplete from "./QuestionnaireComplete";
import { AnswerType, QuestionId, questionnaireData } from "./questionnaireConfig";
import { Question, QuestionnaireEngine, QuestionType } from "./questionnaireEngine";
import SelectQuestion from "./SelectQuestion";

export default function Questionnaire() {
  const [engine] = useState(
    () => new QuestionnaireEngine({ questions: questionnaireData }),
  );
  const [currentQuestion, setCurrentQuestion] = useState<Question | null>(
    engine.getCurrentQuestion(),
  );
  const [scores, setScores] = useState<Record<string, number>>({});

  const handleAnswer = <T extends QuestionId>(questionId: T, answer: AnswerType<T>) => {
    const { nextQuestion, newScores } = engine.answerQuestion(questionId, answer);

    setCurrentQuestion(nextQuestion);
    setScores((prevScores) => ({
      ...prevScores,
      ...Object.fromEntries(
        Object.entries(newScores).map(([vitamin, score]) => [
          vitamin,
          (prevScores[vitamin] ?? 0) + (score || 0),
        ]),
      ),
    }));
  };

  const renderQuestion = () => {
    if (!currentQuestion) return null;

    switch (currentQuestion.type) {
      case QuestionType.ConsentScreen:
        return <ConsentScreen question={currentQuestion} onAnswer={handleAnswer} />;
      case QuestionType.Select:
        return <SelectQuestion question={currentQuestion} onAnswer={handleAnswer} />;
      default:
        return null;
    }
  };

  if (!currentQuestion) {
    return <QuestionnaireComplete scores={scores} />;
  }

  return <div className="max-w-2xl mx-auto p-6 space-y-6">{renderQuestion()}</div>;
}
