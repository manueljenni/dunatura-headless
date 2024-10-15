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
    <RoundedContainer title="Questionnaire Editor">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {questions.map((question, questionIndex) => (
          <QuestionCard
            key={question.id}
            question={question}
            questionIndex={questionIndex}
            handleQuestionChange={handleQuestionChange}
            handleAnswerChange={handleAnswerChange}
            handleScoreChange={handleScoreChange}
            addNewIngredient={addNewIngredient}
          />
        ))}
      </div>
    </RoundedContainer>
  );
}

type QuestionCardProps = {
  question: (typeof questionnaireData)[0];
  questionIndex: number;
  handleQuestionChange: (
    index: number,
    field: string,
    value: string | QuestionType,
  ) => void;
  handleAnswerChange: (
    questionIndex: number,
    answerIndex: number,
    field: string,
    value: string,
  ) => void;
  handleScoreChange: (
    questionIndex: number,
    answerIndex: number,
    vitaminId: VitaminId,
    score: number,
  ) => void;
  addNewIngredient: (
    questionIndex: number,
    answerIndex: number,
    vitaminId: VitaminId,
  ) => void;
};

function QuestionCard({
  question,
  questionIndex,
  handleQuestionChange,
  handleAnswerChange,
  handleScoreChange,
  addNewIngredient,
}: QuestionCardProps) {
  return (
    <div className="p-4 border rounded bg-[#FBFCF8]">
      <h2 className="text-xl font-semibold mb-2">Question {question.id}</h2>
      <QuestionInput
        question={question}
        questionIndex={questionIndex}
        handleQuestionChange={handleQuestionChange}
      />
      <div className="mt-4 space-y-4">
        {question.answers.map((answer, answerIndex) => (
          <AnswerCard
            key={answerIndex}
            answer={answer}
            questionIndex={questionIndex}
            answerIndex={answerIndex}
            handleAnswerChange={handleAnswerChange}
            handleScoreChange={handleScoreChange}
            addNewIngredient={addNewIngredient}
          />
        ))}
      </div>
    </div>
  );
}

type QuestionInputProps = {
  question: (typeof questionnaireData)[0];
  questionIndex: number;
  handleQuestionChange: (
    index: number,
    field: string,
    value: string | QuestionType,
  ) => void;
};

function QuestionInput({
  question,
  questionIndex,
  handleQuestionChange,
}: QuestionInputProps) {
  return (
    <div className="space-y-2">
      <div>
        <Label>Text</Label>
        <Input
          type="text"
          value={question.text}
          onChange={(e) => handleQuestionChange(questionIndex, "text", e.target.value)}
          className="w-full"
        />
      </div>
      <div>
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
    </div>
  );
}

type AnswerCardProps = {
  answer: (typeof questionnaireData)[0]["answers"][0];
  questionIndex: number;
  answerIndex: number;
  handleAnswerChange: (
    questionIndex: number,
    answerIndex: number,
    field: string,
    value: string,
  ) => void;
  handleScoreChange: (
    questionIndex: number,
    answerIndex: number,
    vitaminId: VitaminId,
    score: number,
  ) => void;
  addNewIngredient: (
    questionIndex: number,
    answerIndex: number,
    vitaminId: VitaminId,
  ) => void;
};

function AnswerCard({
  answer,
  questionIndex,
  answerIndex,
  handleAnswerChange,
  handleScoreChange,
  addNewIngredient,
}: AnswerCardProps) {
  return (
    <div className="p-2 border rounded">
      <Input
        type="text"
        value={answer.value.text}
        onChange={(e) =>
          handleAnswerChange(questionIndex, answerIndex, "text", e.target.value)
        }
        className="w-full mb-2"
      />
      <h4 className="font-semibold mt-2 mb-1">Scores:</h4>
      <div className="grid grid-cols-2 gap-2">
        {Object.entries(answer.scores || {}).map(([vitaminIdString, score]) => {
          const vitaminId = Number(vitaminIdString) as VitaminId;
          const vitaminKey = vitaminIdToKey[vitaminId];
          if (!vitaminKey) return null;
          return (
            <div key={vitaminIdString} className="flex items-center space-x-2">
              <span className="w-2/3 truncate text-primary text-sm font-medium">
                {vitamins[vitaminKey].name}
              </span>
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
                className="w-1/4"
              />
            </div>
          );
        })}
      </div>
      <div className="mt-2">
        <Select
          onValueChange={(value) =>
            addNewIngredient(questionIndex, answerIndex, Number(value) as VitaminId)
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
  );
}
