import {
  Answers,
  AnswerType,
  Question,
  QuestionId,
  QuestionnaireData,
  VitaminId,
} from "./types";

export class QuestionnaireEngine {
  private data: QuestionnaireData;
  private currentIndex: number;
  private answers: Answers;

  constructor(config: { questions: QuestionnaireData }) {
    this.data = config.questions;
    this.currentIndex = 0;
    this.answers = {};
  }

  getCurrentQuestion(): Question | null {
    if (this.currentIndex < this.data.length) {
      return this.data[this.currentIndex];
    }
    return null;
  }

  answerQuestion<T extends QuestionId>(
    questionId: T,
    answer: AnswerType<T>[],
  ): {
    nextQuestion: Question | null;
    newScores: Partial<Record<VitaminId, number>>;
  } {
    this.answers[questionId] = answer as Answers[T];
    const currentQuestion = this.getCurrentQuestion();
    if (!currentQuestion) {
      throw new Error("No current question found");
    }
    const newScores = this.calculateScores(currentQuestion, answer);

    this.currentIndex++;
    const nextQuestion = this.getCurrentQuestion();

    return { nextQuestion, newScores };
  }

  private calculateScores(
    question: Question,
    answer: AnswerType<QuestionId> | AnswerType<QuestionId>[],
  ): Partial<Record<VitaminId, number>> {
    let totalScores: Partial<Record<VitaminId, number>> = {};

    if (Array.isArray(answer)) {
      answer.forEach((selectedValue) => {
        const selectedAnswer = question.answers.find(
          (a) => a.value.value === selectedValue,
        );
        if (selectedAnswer?.value) {
          this.updateScores(totalScores, selectedAnswer.scores ?? {});
        }
      });
    } else {
      const selectedAnswer = question.answers.find((a) => a.value.value === answer);
      if (selectedAnswer?.scores) {
        this.updateScores(totalScores, selectedAnswer.scores);
      }
    }

    return totalScores;
  }

  private updateScores(
    totalScores: Partial<Record<VitaminId, number>>,
    newScores: Partial<Record<VitaminId, number>>,
  ): void {
    Object.entries(newScores).forEach(([vitamin, score]) => {
      const vitaminId = Number(vitamin) as VitaminId;
      totalScores[vitaminId] = (totalScores[vitaminId] ?? 0) + (score ?? 0);
    });
  }
}
