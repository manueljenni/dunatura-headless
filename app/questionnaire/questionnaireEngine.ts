import {
  Answers,
  AnswerType,
  Question,
  QuestionId,
  QuestionnaireData,
  VitaminId,
} from "./types";

type HistoryItem = {
  question: Question<QuestionId>;
  answers: AnswerType<QuestionId>[];
};

type History = Partial<Record<QuestionId, HistoryItem>>;

export class QuestionnaireEngine {
  private data: QuestionnaireData;
  private currentIndex: number;
  private answers: Partial<Answers>;
  private name?: string;
  private history: History;
  private lastValidIndex: number | null = null;

  constructor(config: { questions: QuestionnaireData }) {
    this.data = config.questions;
    this.currentIndex = 0;
    this.answers = {};
    this.history = {
      [this.currentIndex]: {
        question: this.getCurrentQuestion()!,
        answers: [],
      },
    };
  }

  getCurrentIndex() {
    return this.currentIndex;
  }

  getAnswers(): Partial<Answers> {
    return this.answers;
  }

  getCurrentQuestion(): Question<QuestionId> | null {
    const question = this.data[this.currentIndex];
    console.log("Current question:", question);
    return question ?? null;
  }

  getHistory(): History {
    return this.history;
  }

  private isLastValidQuestion(currentIndex: number): boolean {
    const nextValidIndex = this.findNextValidQuestionIndex(
      currentIndex + 1,
      this.answers,
    );
    return nextValidIndex === null;
  }

  answerQuestion<T extends QuestionId>(
    questionId: T,
    answer: AnswerType<T>[],
  ): Question<QuestionId> | null {
    const currentQuestionIndex = this.data.findIndex((q) => q.id === questionId);

    // If the answer hasn't changed
    const currentAnswers = this.answers[questionId];
    if (JSON.stringify(currentAnswers) === JSON.stringify(answer)) {
      if (this.isLastValidQuestion(currentQuestionIndex)) {
        this.lastValidIndex = currentQuestionIndex;
        return null;
      }

      const nextIndex = this.findNextValidQuestionIndex(
        currentQuestionIndex + 1,
        this.answers,
      );

      if (nextIndex !== null) {
        this.currentIndex = nextIndex;
        return this.getCurrentQuestion();
      }
      return null;
    }

    // Store the answer
    this.answers[questionId] = answer as Answers[T];

    // Update history
    this.history[questionId] = {
      question: this.data[currentQuestionIndex] as Question<QuestionId>,
      answers: answer as AnswerType<QuestionId>[],
    };

    // Check if this is the last valid question
    if (this.isLastValidQuestion(currentQuestionIndex)) {
      this.lastValidIndex = currentQuestionIndex;
      return null;
    }

    const nextIndex = this.findNextValidQuestionIndex(
      currentQuestionIndex + 1,
      this.answers,
    );

    if (nextIndex !== null) {
      this.currentIndex = nextIndex;
      const nextQuestion = this.getCurrentQuestion();

      if (nextQuestion) {
        this.history[nextQuestion.id] = {
          question: nextQuestion,
          answers: [],
        };
      }

      return nextQuestion;
    }

    return null;
  }

  setNameAndGoToNextQuestion(name: string): Question<QuestionId> | null {
    this.name = name;
    const nextQuestion = this.findNextQuestion();

    if (nextQuestion) {
      this.history[nextQuestion.id] = {
        question: nextQuestion,
        answers: [],
      };
    }

    return nextQuestion;
  }

  getName() {
    return this.name ?? "PLACEHOLDER NAME";
  }

  goBack(): Question<QuestionId> | null {
    // If we're in complete state, return to the last valid question
    if (this.lastValidIndex !== null) {
      this.currentIndex = this.lastValidIndex;
      this.lastValidIndex = null;
      return this.getCurrentQuestion();
    }

    // Normal back navigation
    const previousIndex = this.findPreviousValidQuestionIndex(
      this.currentIndex - 1,
      this.answers,
    );

    if (previousIndex !== null) {
      this.currentIndex = previousIndex;
      return this.getCurrentQuestion();
    }

    return null;
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
    if (!question.conditions || Object.keys(question.conditions).length === 0) {
      return true;
    }

    const result = Object.entries(question.conditions).every(
      ([questionIdStr, requiredAnswer]) => {
        const questionId = Number(questionIdStr) as QuestionId;
        const answers = this.answers[questionId];

        if (!answers || answers.length === 0) {
          return false;
        }

        return answers.includes(requiredAnswer as never);
      },
    );

    console.log("Checking conditions for question:", {
      questionId: question.id,
      conditions: question.conditions,
      answers: this.answers,
      result,
    });

    return result;
  }

  private findNextValidQuestionIndex(
    startIndex: number,
    answers: Partial<Answers>,
  ): number | null {
    console.log("Finding next valid index:", {
      startIndex,
      dataLength: this.data.length,
    });

    if (startIndex >= this.data.length) {
      return null;
    }

    for (let i = startIndex; i < this.data.length; i++) {
      const question = this.data[i];
      const conditionsMet = this.checkConditions(question);

      console.log("Checking question:", {
        index: i,
        questionId: question.id,
        conditionsMet,
      });

      if (conditionsMet) {
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
      const question = this.data[i];
      if (this.checkConditions(question)) {
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

  getTotalQuestions(): number {
    return this.data.length;
  }
}
