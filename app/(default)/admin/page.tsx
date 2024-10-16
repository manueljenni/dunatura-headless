"use client";

import {
  questionnaireData,
  VitaminId,
  vitaminIdToKey,
  vitamins,
} from "@/app/questionnaire/types";
import RoundedContainer from "@/components/custom/RoundedContainer";

export default function QuestionnaireViewer() {
  return (
    <RoundedContainer title="Questionnaire Viewer">
      <div className="grid grid-cols-1 gap-4">
        {questionnaireData.map((question) => (
          <QuestionCard key={question.id} question={question as any} />
        ))}
      </div>
    </RoundedContainer>
  );
}

type QuestionCardProps = {
  question: (typeof questionnaireData)[0];
};

function QuestionCard({ question }: QuestionCardProps) {
  return (
    <div className="p-4 border rounded-lg bg-lightBackground">
      <h2 className="text-xl font-semibold mb-2">Question {question.id}</h2>
      <p className="mb-4">{question.text}</p>
      <div className="mt-4 space-y-4">
        {question.answers.map((answer, answerIndex) => (
          <AnswerCard
            key={answerIndex}
            answer={answer as any}
            answerIndex={answerIndex}
          />
        ))}
      </div>
    </div>
  );
}

type AnswerCardProps = {
  answer: (typeof questionnaireData)[0]["answers"][0];
  answerIndex: number;
};

function AnswerCard({ answer, answerIndex }: AnswerCardProps) {
  const bgColor = answerIndex % 2 === 0 ? "bg-neutral-100" : "bg-lightBackground";
  const hasScores = Object.keys(answer.scores || {}).length > 0;

  return (
    <div className={`space-y-6 p-4 border border-neutral-200 rounded-lg ${bgColor}`}>
      <div>
        <h4 className="font-semibold mt-2 mb-1">Answer {answerIndex + 1}</h4>
        <p>{answer.value.text}</p>
      </div>
      {hasScores && (
        <div>
          <h4 className="font-semibold">Scores</h4>
          <div className="grid grid-cols-2 gap-2">
            {Object.entries(answer.scores || {}).map(([vitaminIdString, score]) => {
              const vitaminId = Number(vitaminIdString) as VitaminId;
              const vitaminKey = vitaminIdToKey[vitaminId];
              if (!vitaminKey) return null;
              const vitamin = vitamins[vitaminKey];
              return (
                <div key={vitaminIdString} className="flex items-center space-x-2">
                  <div className="w-2/3 flex items-center">
                    <div
                      className="w-3 h-3 mr-2 rounded"
                      style={{ backgroundColor: vitamin.color }}
                    />
                    <span className="truncate text-primary text-sm font-medium">
                      {vitamin.name}
                    </span>
                  </div>
                  <span>{score as number}</span>
                </div>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}
