"use client";

import { Button } from "@/components/primitives/button";
import { Input } from "@/components/primitives/input";
import { Label } from "@/components/primitives/label";
import { useState } from "react";
import { AnswerType, QuestionId, questionnaireData } from "./questionnaireConfig";
import { Question, QuestionnaireEngine, QuestionType } from "./questionnaireEngine";

export default function Questionnaire() {
  const [engine] = useState(
    () =>
      new QuestionnaireEngine({
        questions: questionnaireData,
      }),
  );
  const [currentQuestion, setCurrentQuestion] = useState<Question | null>(
    engine.getCurrentQuestion(),
  );
  const [scores, setScores] = useState<Record<string, number>>({});
  const [selectedAnswers, setSelectedAnswers] = useState<
    AnswerType<QuestionId>[] | AnswerType<QuestionId> | null
  >(null);

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
    setSelectedAnswers(null);
  };

  const handleMultiSelectChange = (value: AnswerType<QuestionId>, maxSteps?: number) => {
    setSelectedAnswers((prev) => {
      if (Array.isArray(prev)) {
        if (prev.includes(value)) {
          return prev.filter((item) => item !== value);
        }
        if (maxSteps && prev.length >= maxSteps) {
          return prev;
        }
        return [...prev, value];
      }
      return [value];
    });
  };

  const renderQuestion = () => {
    if (!currentQuestion) return null;

    const { id, text, subtitle, maxSteps, type, answers } = currentQuestion;

    switch (type) {
      case QuestionType.ConsentScreen:
        return (
          <div className="space-y-8">
            <div className="space-y-2">
              <h2 className="text-2xl font-semibold">{text}</h2>
              {subtitle && <p className="text-gray-600 text-lg">{subtitle}</p>}
            </div>
            <div className="flex space-x-2">
              <Button
                variant={"pill"}
                size={"pill-lg"}
                onClick={() => handleAnswer(id, "consent" as AnswerType<typeof id>)}>
                Ich stimme zu
              </Button>
              <Button
                variant={"ghost"}
                onClick={() => handleAnswer(id, "decline" as AnswerType<typeof id>)}>
                Nein, zurück
              </Button>
            </div>
          </div>
        );

      case QuestionType.Select:
        return (
          <div className="space-y-6">
            <h2 className="text-2xl font-semibold">{text}</h2>
            {subtitle && <p className="text-gray-600">{subtitle}</p>}
            {maxSteps && maxSteps > 1 && (
              <p className="text-gray-600">Wähle bis zu {maxSteps} Ziele aus</p>
            )}
            <div className="space-y-2">
              {answers.map((answer) => (
                <Label
                  key={answer.value.value}
                  className="flex items-center space-x-2 cursor-pointer">
                  <Input
                    type={maxSteps && maxSteps > 1 ? "checkbox" : "radio"}
                    value={answer.value.value as AnswerType<QuestionId>}
                    checked={
                      Array.isArray(selectedAnswers)
                        ? selectedAnswers.includes(
                            answer.value.value as AnswerType<QuestionId>,
                          )
                        : selectedAnswers === answer.value.value
                    }
                    onChange={() =>
                      handleMultiSelectChange(
                        answer.value.value as AnswerType<QuestionId>,
                        maxSteps,
                      )
                    }
                    disabled={
                      !!maxSteps &&
                      maxSteps > 1 &&
                      Array.isArray(selectedAnswers) &&
                      selectedAnswers.length >= maxSteps &&
                      !selectedAnswers.includes(
                        answer.value.value as AnswerType<QuestionId>,
                      )
                    }
                    className="sr-only"
                  />
                  <div
                    className={`flex-1 p-3 rounded-lg border ${
                      Array.isArray(selectedAnswers)
                        ? selectedAnswers.includes(
                            answer.value.value as AnswerType<QuestionId>,
                          )
                          ? "bg-primary text-white"
                          : "bg-white"
                        : selectedAnswers === answer.value.value
                        ? "bg-primary text-white"
                        : "bg-white"
                    }`}>
                    {answer.value.text}
                  </div>
                  <span className="text-xl">
                    {Array.isArray(selectedAnswers)
                      ? selectedAnswers.includes(
                          answer.value.value as AnswerType<QuestionId>,
                        )
                        ? "×"
                        : "+"
                      : selectedAnswers === answer.value.value
                      ? "×"
                      : "+"}
                  </span>
                </Label>
              ))}
            </div>
            <Button
              onClick={() => handleAnswer(id, selectedAnswers as AnswerType<QuestionId>)}
              disabled={
                !selectedAnswers ||
                (Array.isArray(selectedAnswers) && selectedAnswers.length === 0)
              }>
              Continue
            </Button>
          </div>
        );

      default:
        return null;
    }
  };

  if (!currentQuestion) {
    return (
      <div className="space-y-6">
        <h2 className="text-2xl font-semibold">Questionnaire Complete</h2>
        <h3 className="text-xl">Vitamin Recommendations:</h3>
        <ul className="space-y-2">
          {Object.entries(scores).map(([vitamin, score]) => (
            <li key={vitamin} className="flex justify-between">
              <span>{vitamin}</span>
              <span>{score}</span>
            </li>
          ))}
        </ul>
      </div>
    );
  }

  return (
    // <div className="max-w-2xl mx-auto p-6 space-y-6">
    //   <div className="w-full bg-gray-200 rounded-full h-2.5">
    //     <div
    //       className="bg-primary h-2.5 rounded-full"
    //       style={{
    //         width: `${((currentQuestion.id - 1) / questionnaireData.length) * 100}%`,
    //       }}></div>
    //   </div>
    //   <div className="text-sm text-gray-600">
    //     {currentQuestion.id} of {questionnaireData.length}
    //   </div>
    //   <Separator className="my-4" />
    <div>{renderQuestion()}</div>
  );
}
