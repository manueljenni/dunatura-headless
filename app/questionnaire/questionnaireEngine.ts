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

  getCurrentQuestion(): Question<QuestionId> | null {
    console.log("Current index: " + this.currentIndex);

    while (this.currentIndex < this.data.length) {
      const question = this.data[this.currentIndex];
      const conditionsMet = this.checkConditions(question);
      console.log("Conditions met: ", conditionsMet);
      if (conditionsMet) {
        return question;
      } else {
        return this.data[this.currentIndex + 1];
      }
    }
    return null;
  }

  answerQuestion<T extends QuestionId>(
    questionId: T,
    answer: AnswerType<T>[],
  ): Question<QuestionId> | null {
    console.warn("Answering question", questionId, answer);
    console.log("Answers: BEFORE checking conditions", this.answers);

    this.answers[questionId] = answer as Answers[T];
    this.currentIndex++;
    return this.getCurrentQuestion();
  }

  setNameAndGoToNextQuestion(name: string): Question<QuestionId> | null {
    this.name = name;
    this.currentIndex++;
    return this.getCurrentQuestion();
  }

  getName() {
    return this.name ?? "PLACEHOLDER NAME";
  }

  goBack(): Question<QuestionId> | null {
    if (this.currentIndex > 0) {
      this.currentIndex--;
      return this.getCurrentQuestion();
    }
    return null;
  }

  calculateFinalScores(): Partial<Record<VitaminId, number>> {
    let totalScores: Partial<Record<VitaminId, number>> = {};

    this.data.forEach((question) => {
      const answer = this.answers[question.id];
      if (answer) {
        this.updateScoresForQuestion(totalScores, question as any, answer);
      }
    });

    return totalScores;
  }

  private updateScoresForQuestion(
    totalScores: Partial<Record<VitaminId, number>>,
    question: Question<QuestionId>,
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

  private checkConditions(question: Question<QuestionId>): boolean {
    if (!question.conditions) {
      console.log("No conditions for question", question.id);
      return true;
    }

    return Object.entries(question.conditions).every(
      ([questionIdStr, requiredAnswer]) => {
        console.log("Answers DURING conditions: ", this.answers);
        const questionId = Number(questionIdStr) as QuestionId;
        const answer: AnswerType<QuestionId>[] | undefined = this.answers[questionId];

        console.log("Required answer", requiredAnswer);
        console.log("answer string: ", answer?.toString());

        return answer?.toString() == requiredAnswer || false;
      },
    );
  }
}
