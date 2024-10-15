"use client";

import { Button } from "@/components/primitives/button";
import { Input } from "@/components/primitives/input";
import { Label } from "@/components/primitives/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/primitives/select";
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

    console.warn("Answered - got new scores ", newScores);

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

  const handleMultiSelectChange = (value: AnswerType<QuestionId>) => {
    setSelectedAnswers((prev) => {
      if (Array.isArray(prev)) {
        return prev.includes(value)
          ? prev.filter((item) => item !== value)
          : [...prev, value];
      }
      return [value];
    });
  };

  const renderQuestion = () => {
    if (!currentQuestion) return null;

    const {
      id,
      text,
      subtitle,
      type,
      answers,
    }: {
      id: QuestionId;
      text: string;
      subtitle?: string;
      type: QuestionType;
      answers: ReadonlyArray<{
        value: { text: string; value: string };
        scores?: Record<string, number>;
      }>;
    } = currentQuestion;

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

      case QuestionType.MultiSelect:
        return (
          <div className="space-y-6">
            <h2 className="text-2xl font-semibold">{text}</h2>
            {subtitle && <p className="text-gray-600">{subtitle}</p>}
            <div className="space-y-2">
              {answers.map((answer) => (
                <Label
                  key={answer.value.value}
                  className="flex items-center space-x-2 cursor-pointer">
                  <Input
                    type="checkbox"
                    value={answer.value.value as AnswerType<QuestionId>}
                    checked={selectedAnswers?.includes(
                      answer.value.value as AnswerType<QuestionId>,
                    )}
                    onChange={() =>
                      handleMultiSelectChange(
                        answer.value.value as AnswerType<QuestionId>,
                      )
                    }
                    className="sr-only"
                  />
                  <div
                    className={`flex-1 p-3 rounded-lg border ${
                      selectedAnswers?.includes(
                        answer.value.value as AnswerType<QuestionId>,
                      )
                        ? "bg-primary text-white"
                        : "bg-white"
                    }`}>
                    {answer.value.text}
                  </div>
                  <span className="text-xl">
                    {selectedAnswers?.includes(
                      answer.value.value as AnswerType<QuestionId>,
                    )
                      ? "×"
                      : "+"}
                  </span>
                </Label>
              ))}
            </div>
            <Button
              onClick={() => handleAnswer(id, selectedAnswers as AnswerType<QuestionId>)}
              disabled={!selectedAnswers || selectedAnswers.length === 0}>
              Continue
            </Button>
          </div>
        );

      case QuestionType.Select:
        return (
          <div className="space-y-6">
            <h2 className="texit-2xl font-semibold">{text}</h2>
            {subtitle && <p className="text-gray-600">{subtitle}</p>}
            <Select
              onValueChange={(value) => handleAnswer(id, value as AnswerType<typeof id>)}>
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Select an option" />
              </SelectTrigger>
              <SelectContent>
                {answers.map((answer) => (
                  <SelectItem key={answer.value.value} value={answer.value.value}>
                    {answer.value.text}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
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
