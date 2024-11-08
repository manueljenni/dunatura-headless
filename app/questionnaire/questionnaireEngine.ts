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
    this.currentIndex = this.findNextValidQuestionIndex(0, {}) ?? 0;
    this.answers = {};
  }

  getCurrentQuestion(): Question<QuestionId> | null {
    const question = this.data[this.currentIndex];
    return question ?? null;
  }

  answerQuestion<T extends QuestionId>(
    questionId: T,
    answer: AnswerType<T>[],
  ): Question<QuestionId> | null {
    const updatedAnswers = { ...this.answers, [questionId]: answer as Answers[T] };

    // Remove answers for questions whose conditions are no longer met
    this.data.forEach((question) => {
      if (updatedAnswers[question.id] !== undefined && !this.checkConditions(question)) {
        delete updatedAnswers[question.id];
      }
    });

    this.answers = updatedAnswers;

    const nextIndex = this.findNextValidQuestionIndex(
      this.currentIndex + 1,
      updatedAnswers,
    );

    if (nextIndex === null) {
      return null;
    }

    this.currentIndex = nextIndex;
    return this.getCurrentQuestion();
  }

  setNameAndGoToNextQuestion(name: string): Question<QuestionId> | null {
    this.name = name;
    return this.findNextQuestion();
  }

  getName() {
    return this.name ?? "PLACEHOLDER NAME";
  }

  goBack(): Question<QuestionId> | null {
    const previousIndex = this.findPreviousValidQuestionIndex(
      this.currentIndex - 1,
      this.answers,
    );
    this.currentIndex = previousIndex ?? this.currentIndex;
    return this.getCurrentQuestion();
  }

  calculateFinalScores(): Partial<Record<VitaminId, number>> {
    return this.data.reduce(
      (totalScores, question) => {
        const answer = this.answers[question.id];
        return answer
          ? this.updateScoresForQuestion(totalScores, question, answer)
          : totalScores;
      },
      {} as Partial<Record<VitaminId, number>>,
    );
  }

  private updateScoresForQuestion(
    totalScores: Partial<Record<VitaminId, number>>,
    question: Question<QuestionId>,
    answer: AnswerType<QuestionId> | AnswerType<QuestionId>[],
  ): Partial<Record<VitaminId, number>> {
    const selectedAnswers = Array.isArray(answer) ? answer : [answer];
    selectedAnswers.forEach((selectedValue) => {
      const selectedAnswer = question.answers.find(
        (a) => a.value.value === selectedValue,
      );
      if (selectedAnswer?.scores) {
        totalScores = this.updateScores(totalScores, selectedAnswer.scores);
      }
    });
    return totalScores;
  }

  private updateScores(
    totalScores: Partial<Record<VitaminId, number>>,
    newScores: Partial<Record<VitaminId, number>>,
  ): Partial<Record<VitaminId, number>> {
    return Object.entries(newScores).reduce(
      (updatedScores, [vitamin, score]) => {
        const vitaminId = Number(vitamin) as VitaminId;
        updatedScores[vitaminId] = (updatedScores[vitaminId] ?? 0) + (score ?? 0);
        return updatedScores;
      },
      { ...totalScores },
    );
  }

  private checkConditions(question: Question<QuestionId>): boolean {
    if (!question.conditions) {
      console.log("No conditions found");
      return true;
    }
    return Object.entries(question.conditions).every(
      ([questionIdStr, requiredAnswer]) => {
        console.log("Checking conditions for question", questionIdStr);
        console.log("Required answer", requiredAnswer);

        const questionId = Number(questionIdStr) as QuestionId;
        const answers: AnswerType<QuestionId>[] | undefined = this.answers[questionId];
        console.log("Answers", answers);

        console.log("Returning...", answers?.includes(requiredAnswer));
        return answers?.includes(requiredAnswer);
      },
    );
  }

  private findNextValidQuestionIndex(
    startIndex: number,
    answers: Partial<Answers>,
  ): number | null {
    if (startIndex >= this.data.length) {
      return null;
    }

    for (let i = startIndex; i < this.data.length; i++) {
      if (this.checkConditions(this.data[i])) {
        return i;
      }
    }
    return null;
  }

  private findPreviousValidQuestionIndex(
    startIndex: number,
    answers: Partial<Answers>,
  ): number | null {
    for (let i = startIndex; i >= 0; i--) {
      if (this.checkConditions(this.data[i])) {
        return i;
      }
    }
    return null;
  }

  private findNextQuestion(): Question<QuestionId> | null {
    const nextIndex = this.findNextValidQuestionIndex(
      this.currentIndex + 1,
      this.answers,
    );
    if (nextIndex !== null) {
      this.currentIndex = nextIndex;
      return this.getCurrentQuestion();
    }
    return null;
  }
}
