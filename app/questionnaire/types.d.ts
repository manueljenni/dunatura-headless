// Enum
export enum QuestionType {
  Select = "select",
  Number = "number",
  TextInput = "text_input",
  ConsentScreen = "consent",
  NameInput = "name_input",
}

// Vitamin-related types
export type Vitamins = typeof vitamins;
export type VitaminKey = keyof Vitamins;
export type VitaminId = Vitamins[VitaminKey]["id"];

export const vitaminIdToKey: { [key in VitaminId]: VitaminKey } = Object.fromEntries(
  Object.entries(vitamins).map(([key, value]) => [value.id, key as VitaminKey]),
) as { [key in VitaminId]: VitaminKey };

// Questionnaire-related types
export type QuestionnaireData = typeof questionnaireData;
export type QuestionId = QuestionnaireData[number]["id"];

export type AnswerType<T extends QuestionId> = Extract<
  QuestionnaireData[number],
  { id: T }
>["answers"][number]["value"]["value"];

export type Answers = {
  [K in QuestionId]?: AnswerType<K>[];
};

// Question interface
export interface Question {
  id: QuestionId;
  text: string;
  subtitle?: string;
  type: QuestionType;
  answers: ReadonlyArray<{
    value: { text: string; value: string };
    scores?: Record<string, number>;
  }>;
  maxSteps?: number;
}
