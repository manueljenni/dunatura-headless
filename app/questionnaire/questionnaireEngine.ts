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
  private answers: Partial<Answers>;
  private name?: string;

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
  ): Question | null {
    this.answers[questionId] = answer as Answers[T];
    this.currentIndex++;
    return this.getCurrentQuestion();
  }

  setNameAndGoToNextQuestion(name: string): Question | null {
    this.name = name;
    this.currentIndex++;
    return this.getCurrentQuestion();
  }

  getName(): string | undefined {
    return this.name;
  }

  goBack(): Question | null {
    if (this.currentIndex > 0) {
      this.currentIndex--;
      const currentQuestion = this.getCurrentQuestion();
      if (currentQuestion) {
        delete this.answers[currentQuestion.id];
      }
      return currentQuestion;
    }
    return null;
  }

  calculateFinalScores(): Partial<Record<VitaminId, number>> {
    let totalScores: Partial<Record<VitaminId, number>> = {};

    this.data.forEach((question) => {
      const answer = this.answers[question.id];
      if (answer) {
        this.updateScoresForQuestion(totalScores, question, answer);
      }
    });

    return totalScores;
  }

  private updateScoresForQuestion(
    totalScores: Partial<Record<VitaminId, number>>,
    question: Question,
    answer: AnswerType<QuestionId> | AnswerType<QuestionId>[],
  ): void {
    if (Array.isArray(answer)) {
      answer.forEach((selectedValue) => {
        const selectedAnswer = question.answers.find(
          (a) => a.value.value === selectedValue,
        );
        if (selectedAnswer?.scores) {
          this.updateScores(totalScores, selectedAnswer.scores);
        }
      });
    } else {
      const selectedAnswer = question.answers.find((a) => a.value.value === answer);
      if (selectedAnswer?.scores) {
        this.updateScores(totalScores, selectedAnswer.scores);
      }
    }
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
