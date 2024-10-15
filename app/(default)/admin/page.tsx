"use client";

import {
  questionnaireData,
  VitaminId,
  vitaminIdToKey,
  vitamins,
} from "@/app/questionnaire/questionnaireConfig";
import { QuestionType } from "@/app/questionnaire/questionnaireEngine";
import RoundedContainer from "@/components/custom/RoundedContainer";
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

export default function QuestionnaireEditor() {
  const [questions, setQuestions] = useState(questionnaireData);

  const handleQuestionChange = (
    index: number,
    field: string,
    value: string | QuestionType,
  ) => {
    const updatedQuestions = [...questions];
    updatedQuestions[index] = { ...updatedQuestions[index], [field]: value };
    setQuestions(updatedQuestions);
  };

  const handleAnswerChange = (
    questionIndex: number,
    answerIndex: number,
    field: string,
    value: string,
  ) => {
    const updatedQuestions = [...questions];
    const updatedAnswers = [...updatedQuestions[questionIndex].answers];
    updatedAnswers[answerIndex] = {
      ...updatedAnswers[answerIndex],
      value: { ...updatedAnswers[answerIndex].value, [field]: value },
    };
    updatedQuestions[questionIndex] = {
      ...updatedQuestions[questionIndex],
      answers: updatedAnswers,
    };
    setQuestions(updatedQuestions);
  };

  const handleScoreChange = (
    questionIndex: number,
    answerIndex: number,
    vitaminId: VitaminId,
    score: number,
  ) => {
    const updatedQuestions = [...questions];
    const updatedAnswers = [...updatedQuestions[questionIndex].answers];
    const updatedScores = { ...updatedAnswers[answerIndex].scores, [vitaminId]: score };
    updatedAnswers[answerIndex] = {
      ...updatedAnswers[answerIndex],
      scores: updatedScores,
    };
    updatedQuestions[questionIndex] = {
      ...updatedQuestions[questionIndex],
      answers: updatedAnswers,
    };
    setQuestions(updatedQuestions);
  };

  const addNewIngredient = (
    questionIndex: number,
    answerIndex: number,
    vitaminId: VitaminId,
  ) => {
    const updatedQuestions = [...questions];
    const updatedAnswers = [...updatedQuestions[questionIndex].answers];
    const updatedScores = { ...updatedAnswers[answerIndex].scores, [vitaminId]: 0 };
    updatedAnswers[answerIndex] = {
      ...updatedAnswers[answerIndex],
      scores: updatedScores,
    };
    updatedQuestions[questionIndex] = {
      ...updatedQuestions[questionIndex],
      answers: updatedAnswers,
    };
    setQuestions(updatedQuestions);
  };

  return (
    <div className="w-full">
      <RoundedContainer title="Questionnaire Editor">
        {questions.map((question, questionIndex) => (
          <div key={question.id} className="mb-8 p-4 border rounded w-full bg-[#FBFCF8]">
            <h2 className="text-xl font-semibold mb-2">Question {question.id}</h2>
            <div className="mb-2 space-y-2">
              <Label>Text</Label>
              <Input
                type="text"
                value={question.text}
                onChange={(e) =>
                  handleQuestionChange(questionIndex, "text", e.target.value)
                }
                className="w-full p-2 border rounded"
              />
            </div>
            <div className="mb-2 space-y-2">
              <Label>Type</Label>
              <Select
                value={question.type}
                onValueChange={(value) =>
                  handleQuestionChange(questionIndex, "type", value as QuestionType)
                }>
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Select question type" />
                </SelectTrigger>
                <SelectContent>
                  {Object.values(QuestionType).map((type) => (
                    <SelectItem key={type} value={type}>
                      {type}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <h3 className="text-lg font-semibold mt-4 mb-2"></h3>
            {question.answers.map((answer, answerIndex) => (
              <div key={answerIndex} className="mb-4 p-2 border rounded">
                <Input
                  type="text"
                  value={answer.value.text}
                  onChange={(e) =>
                    handleAnswerChange(questionIndex, answerIndex, "text", e.target.value)
                  }
                  className="w-full p-2 border rounded mb-2"
                />
                <h4 className="font-semibold mt-2 mb-1">Scores:</h4>
                {Object.entries(answer.scores || {}).map(([vitaminIdString, score]) => {
                  const vitaminId = Number(vitaminIdString) as VitaminId;
                  const vitaminKey = vitaminIdToKey[vitaminId];

                  if (!vitaminKey) return null; // or some error handling

                  return (
                    <div key={vitaminIdString} className="flex items-center mb-1">
                      <span className="w-1/3">{vitamins[vitaminKey].name}:</span>
                      <Input
                        type="number"
                        value={score}
                        onChange={(e) =>
                          handleScoreChange(
                            questionIndex,
                            answerIndex,
                            vitaminId,
                            Number(e.target.value),
                          )
                        }
                        className="w-16 p-1 border rounded mr-2"
                      />
                    </div>
                  );
                })}
                <div className="mt-2">
                  <Select
                    onValueChange={(value) =>
                      addNewIngredient(
                        questionIndex,
                        answerIndex,
                        Number(value) as VitaminId,
                      )
                    }>
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder="Add new ingredient" />
                    </SelectTrigger>
                    <SelectContent>
                      {Object.values(vitamins).map((vitamin) => (
                        <SelectItem key={vitamin.id} value={vitamin.id.toString()}>
                          {vitamin.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>
            ))}
          </div>
        ))}
      </RoundedContainer>
    </div>
  );
}
