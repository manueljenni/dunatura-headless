"use client";

import { useState } from "react";
import { questionnaireData } from "./questionnaireConfig";
import {
  AnswerValue,
  Question,
  QuestionnaireEngine,
  QuestionType,
} from "./questionnaireEngine";

export default function Questionnaire() {
  const [engine] = useState(
    () => new QuestionnaireEngine({ questions: questionnaireData }),
  );
  const [currentQuestion, setCurrentQuestion] = useState<Question | null>(
    engine.getCurrentQuestion(),
  );
  const [scores, setScores] = useState<Record<string, number>>({});
  const [selectedAnswers, setSelectedAnswers] = useState<string[]>([]);

  const handleAnswer = (answer: AnswerValue) => {
    const { nextQuestion, newScores } = engine.answerQuestion(answer);
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
    setSelectedAnswers([]);
  };

  const handleMultiSelectChange = (value: string) => {
    setSelectedAnswers((prev) =>
      prev.includes(value) ? prev.filter((item) => item !== value) : [...prev, value],
    );
  };

  if (!currentQuestion) {
    return (
      <div>
        <h2>Questionnaire Complete</h2>
        <h3>Vitamin Recommendations:</h3>
        <ul>
          {Object.entries(scores).map(([vitamin, score]) => (
            <li key={vitamin}>
              {vitamin}: {score}
            </li>
          ))}
        </ul>
      </div>
    );
  }

  return (
    <div>
      <h2>{currentQuestion.text}</h2>
      {currentQuestion.subtitle && <p>{currentQuestion.subtitle}</p>}
      {currentQuestion.type === QuestionType.ConsentScreen && (
        <button onClick={() => handleAnswer("consent")}>Ich stimme zu</button>
      )}
      {currentQuestion.type === QuestionType.MultiSelect && (
        <>
          {currentQuestion.answers.map((answer) => (
            <label key={answer.value.value}>
              <input
                type="checkbox"
                value={answer.value.value}
                checked={selectedAnswers.includes(answer.value.value)}
                onChange={() => handleMultiSelectChange(answer.value.value)}
              />
              {answer.value.text}
            </label>
          ))}
          <button onClick={() => handleAnswer(selectedAnswers)}>Weiter</button>
        </>
      )}
    </div>
  );
}
