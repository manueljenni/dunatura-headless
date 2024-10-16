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
  const [scores, setScores] = useState<Record<string, number>>({});

  const handleAnswer = <T extends QuestionId>(
    questionId: T,
    answers: AnswerType<T>[],
  ) => {
    const { nextQuestion, newScores } = engine.answerQuestion(questionId, answers);

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
        return (
          <SelectQuestion
            question={currentQuestion}
            onAnswer={handleAnswer}
            variables={{ name: "Max" }}
          />
        );
      default:
        return null;
    }
  };

  if (!currentQuestion) {
    return <QuestionnaireComplete scores={scores} />;
  }

  return <div className="max-w-2xl">{renderQuestion()}</div>;
}
