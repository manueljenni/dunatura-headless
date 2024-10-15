export enum QuestionType {
  Select = "select",
  Number = "number",
  MultiSelect = "multi_select",
  TextInput = "text_input",
  // Special types
  ConsentScreen = "consent",
  NameInput = "name_input",
}

export type VitaminId = string;

export type AnswerValue = string | number | string[];

export type Answers = {
  [key: number]: AnswerValue;
};

export type Answer = {
  value: {
    text: string;
    value: string;
  };
  scores:
    | Partial<{
        [K in VitaminId]: number;
      }>
    | undefined;
};

export type Question = {
  id: number;
  text: string;
  subtitle?: string;
  type: QuestionType;
  answers: Answer[];
};

export type QuestionnaireData = {
  questions: Question[];
};

export class QuestionnaireEngine {
  private data: QuestionnaireData;
  private currentIndex: number;
  private answers: Answers;

  constructor(data: QuestionnaireData) {
    this.data = data;
    this.currentIndex = 0;
    this.answers = {};
  }

  getCurrentQuestion(): Question | null {
    if (this.currentIndex < this.data.questions.length) {
      return this.data.questions[this.currentIndex];
    }
    return null;
  }

  answerQuestion(answer: AnswerValue): {
    nextQuestion: Question | null;
    newScores: Partial<{ [K in VitaminId]: number }>;
  } {
    const currentQuestion = this.getCurrentQuestion();
    if (!currentQuestion) {
      return { nextQuestion: null, newScores: {} };
    }

    this.answers[currentQuestion.id] = answer;
    const newScores = this.calculateScores(currentQuestion, answer);

    this.currentIndex++;
    const nextQuestion = this.getCurrentQuestion();

    return { nextQuestion, newScores };
  }

  private calculateScores(
    question: Question,
    answer: AnswerValue,
  ): Partial<{ [K in VitaminId]: number }> {
    let totalScores: Partial<{ [K in VitaminId]: number }> = {};

    if (question.type === QuestionType.MultiSelect && Array.isArray(answer)) {
      answer.forEach((selectedValue) => {
        const selectedAnswer = question.answers.find(
          (a) => a.value.value === selectedValue,
        );
        if (selectedAnswer) {
          Object.entries(selectedAnswer.scores || {}).forEach(([vitamin, score]) => {
            totalScores[vitamin as VitaminId] =
              (totalScores[vitamin as VitaminId] || 0) + (score || 0);
          });
        }
      });
    } else if (
      question.type === QuestionType.Select ||
      question.type === QuestionType.Number
    ) {
      const selectedAnswer = question.answers.find((a) => a.value.value === answer);
      if (selectedAnswer) {
        totalScores = { ...selectedAnswer.scores };
      }
    }

    return totalScores;
  }
}
