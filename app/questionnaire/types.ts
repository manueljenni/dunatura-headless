// Enum
export enum QuestionType {
  Select = "select",
  Number = "number",
  TextInput = "text_input",
  ConsentScreen = "consent",
  NameInput = "name_input",
  EffectsAfterFirstMonth = "effects_after_first_month",
  TagespackPlaceholder = "tagespack_placeholder",
}

export const vitamins = {
  OMEGA_3: {
    id: 8,
    name: "Omega 3",
    subtitle: "300mg Omega 3",
    longTitle: "Omega 3 - 300mg gesamt mit DHA und EPA",
    headline: "Algenöl mit dem Baustein für Herzfunktion, Blutdruck und Gehirnfunktion.",
    shopifyId: "omega-3-fettsauren-vegan",
    color: "#00783b",
  },
  HYALURONSAURE: {
    id: 10,
    name: "Hyaluronsäure",
    subtitle: "360mg Hyaluronsäure",
    longTitle: "Hyaluronsäure - 360mg",
    headline: "Bestandteil der Haut, des Bindegewebes und der Knorpel.",
    shopifyId: "hyaluronsaure",
    color: "#BD9AC8",
  },
  VIT_C: {
    id: 11,
    name: "Vitamin C",
    subtitle: "100mg Vitamin C",
    longTitle: "Vitamin C Acerola - 100mg",
    headline: "Der Klassiker für das Immunsystem und die Kollagenbildung.",
    shopifyId: "vitamin-c",
    color: "#EA5D0B",
  },
  MSM: {
    id: 14,
    name: "MSM",
    subtitle: "500mg MSM",
    longTitle: "MSM - 500mg",
    headline:
      "Schwefel - Bestandteil von Haut, Haaren, Muskeln, Sehnen, Knorpel und Bindegewebe.",
    shopifyId: "msm",
    color: "#0166B3",
  },
  KALIUM: {
    id: 15,
    name: "Kalium",
    subtitle: "180mg Kalium",
    longTitle: "Kaliumcitrat - 180mg",
    headline: "Das Elektrolyt für Blutdruck, Nervensystem und Muskelfunktion.",
    shopifyId: "kalium",
    color: "#00B4E6",
  },
  L_ARGININ: {
    id: 16,
    name: "L-Arginin",
    subtitle: "620mg L-Arginin",
    longTitle: "L-Arginin - 620mg",
    headline: "Der Eiweißbaustein für die Stickstoffmonoxid Produktion.",
    shopifyId: "l-arginin",
    color: "#008F9D",
  },
  MAGNESIUM: {
    id: 17,
    name: "Magnesium",
    subtitle: "75mg Magnesium",
    longTitle: "Tri-Magnesiumdicitrat - 75mg",
    headline: "Der schnell verfügbare Beitrag für deine Muskelfunktion.",
    shopifyId: "tri-magnesiumdicitrat",
    color: "#D1D8DC",
  },
  SELEN: {
    id: 18,
    name: "Selen",
    subtitle: "70µg Selen",
    longTitle: "Selenmethionin - 70 µg",
    headline: "Das Spurenelement für Haut, Haare und die Schilddrüse.",
    shopifyId: "selen",
    color: "#D0CFE2",
  },
  EISEN_VIT_C: {
    id: 19,
    name: "Eisen + Vitamin C",
    subtitle: "14mg Eisen + 40mg Vitamin C",
    longTitle: "Eisen 14mg + natürliches Vitamin C",
    headline: "Die Kombination für den Energiestoffwechsel.",
    shopifyId: "eisen-vitamin-c",
    color: "#F39973",
  },
  KURKUMA_EXTRACT: {
    id: 29,
    name: "Kurkuma Extrakt",
    subtitle: "300mg Curcumin",
    longTitle: "Kurkuma Extrakt - 300mg Curcumin",
    headline: "Traditioneller Pflanzenstoff trifft Wissenschaft.",
    shopifyId: "kurkuma",
    color: "#FBB806",
  },
  OPC_TRAUBENKERNEXTKRAKT: {
    id: 30,
    name: "OPC Traubenkernextrakt",
    subtitle: "40% OPC",
    longTitle: "OPC Traubenkernextrakt - 380mg",
    headline: "Das starke Antioxidans aus der Natur.",
    shopifyId: "opc-traubenkernextrakt",
    color: "#823C8A",
  },
  VIT_D3_K2: {
    id: 41,
    name: "Vitamin D3+K2",
    subtitle: "1.000IE D3 + 200µg K2",
    longTitle: "Vitamin D3 1.000IE + K2 200µg",
    headline: "Das Sonnenvitamin mit seinem Cofaktor.",
    shopifyId: "vitamin-d2k3",
    color: "#FBBE5C",
  },
  COENZYM_Q10: {
    id: 44,
    name: "Coenzym Q10",
    subtitle: "200mg Q10",
    longTitle: "Coenzym Q10 - 200mg",
    headline: "Bestandteil aller Zellen, besonders Lunge, Leber und Herz.",
    shopifyId: "q10",
    color: "#f4c245",
  },
  ZINK: {
    id: 55,
    name: "Zink",
    subtitle: "25mg Zink",
    longTitle: "Zink - 25mg",
    headline: "Das Multitalent für Immunsystem, Haut, Haare und Fingernägel.",
    shopifyId: "zink",
    color: "#C4DAD1",
  },
  VIT_B12_KOMPLEX: {
    id: 56,
    name: "Vitamin B12 + Komplex",
    subtitle: "B12 + Komplex",
    longTitle: "Vitamin B12 250µg + Folat 400µg + Komplex",
    headline:
      "Hochdosiertes Vitamin B12 und Folat - ergänzt mit den weiteren B-Vitaminen.",
    shopifyId: "vitamin-b12-folat",
    color: "#D53140",
  },
  ASHWAGANDHA: {
    id: 60,
    name: "Ashwagandha",
    subtitle: "mit 25mg Withanoliden",
    longTitle: "Ashwaghandha 500mg reines Wurzelextrakt",
    headline: "Ashwaghanda",
    shopifyId: "ashwagandha",
    color: "#AECAE7",
  },
} as const;

export const questionnaireData = [
  {
    id: 1,
    text: "Bevor es losgeht",
    subtitle: "Dürfen wir deine Informationen verarbeiten?",
    type: QuestionType.ConsentScreen,
    answers: [
      { value: { text: "Ich stimme zu", value: "consent" }, scores: {} },
      { value: { text: "Nein, zurück", value: "decline" }, scores: {} },
    ],
  },
  {
    id: 2,
    text: "Meine Gesundheitsziele beinhalten...",
    type: QuestionType.Select,
    maxSteps: 3,
    answers: [
      {
        value: { text: "Gesundheit allgemein verbessern", value: "overall_health" },
        scores: {},
      },
      { value: { text: "Mehr Energie während des Tages", value: "energy" }, scores: {} },
      {
        value: {
          text: "Konzentration während der Arbeit steigern",
          value: "concentration",
        },
        scores: {},
      },
      {
        value: { text: "Bessere Performance im Sport", value: "performance" },
        scores: {},
      },
      { value: { text: "Höhere Ausdauer", value: "endurance" }, scores: {} },
      { value: { text: "Natürliche Schönheit", value: "beauty" }, scores: {} },
      {
        value: {
          text: "Verbesserte Immunität während des ganzen Jahres",
          value: "immunity",
        },
        scores: {},
      },
    ],
  },
  {
    id: 3,
    text: "Was unsere Kunden nach ihrem ersten Monat erleben",
    type: QuestionType.EffectsAfterFirstMonth,
    maxSteps: 1,
    answers: [
      { value: { text: "Jünger als 20", value: "under_20" }, scores: {} },
      { value: { text: "20 - 30", value: "20_30" }, scores: {} },
      { value: { text: "31 - 40", value: "31_40" }, scores: {} },
      { value: { text: "Älter als 40", value: "over_40" }, scores: {} },
    ],
  },
  {
    id: 4,
    text: "Erzähle uns mehr über dich, sodass wir dir ein personalisiertes Tagespack zusammenstellen können.",
    type: QuestionType.TagespackPlaceholder,
    answers: [],
  },
  {
    id: 5,
    text: "Lass uns zuerst deinen Namen hinzufügen.",
    subtitle: "Dein Name wird auf dein Tagespack gedruckt.",
    variables: { name: "name" },
    type: QuestionType.NameInput,
    maxSteps: 1,
    answers: [],
  },
  {
    id: 6,
    text: "Hey ${name}, wie alt bist du?",
    variables: { name: "name" },
    type: QuestionType.Select,
    maxSteps: 1,
    answers: [
      {
        value: { text: "Jünger als 20", value: "under_20" },
        scores: {
          [vitamins.VIT_D3_K2.id]: 5,
          [vitamins.ZINK.id]: 5,
          [vitamins.VIT_B12_KOMPLEX.id]: 5,
        },
      },
      {
        value: { text: "20 - 30", value: "20_30" },
        scores: {
          [vitamins.COENZYM_Q10.id]: 2,
          [vitamins.VIT_D3_K2.id]: 6,
          [vitamins.ZINK.id]: 6,
          [vitamins.VIT_B12_KOMPLEX.id]: 5,
        },
      },
      {
        value: { text: "31 - 40", value: "31_40" },
        scores: {
          [vitamins.COENZYM_Q10.id]: 6,
          [vitamins.OMEGA_3.id]: 3,
          [vitamins.HYALURONSAURE.id]: 4,
          [vitamins.VIT_D3_K2.id]: 7,
          [vitamins.VIT_C.id]: 2,
          [vitamins.ZINK.id]: 7,
          [vitamins.VIT_B12_KOMPLEX.id]: 7,
        },
      },
      {
        value: { text: "Älter als 40", value: "over_40" },
        scores: {
          [vitamins.COENZYM_Q10.id]: 8,
          [vitamins.OMEGA_3.id]: 6,
          [vitamins.HYALURONSAURE.id]: 6,
          [vitamins.VIT_D3_K2.id]: 8,
          [vitamins.VIT_C.id]: 4,
          [vitamins.ZINK.id]: 8,
          [vitamins.VIT_B12_KOMPLEX.id]: 8,
        },
      },
    ],
  },
  {
    id: 7,
    text: "Als welches Geschlecht identifizierst du dich?",
    type: QuestionType.Select,
    maxSteps: 1,
    answers: [
      {
        value: { text: "Männlich", value: "male" },
        scores: {
          [vitamins.L_ARGININ.id]: 5,
          [vitamins.COENZYM_Q10.id]: 5,
          [vitamins.SELEN.id]: 5,
          [vitamins.EISEN_VIT_C.id]: 8,
          [vitamins.HYALURONSAURE.id]: 5,
          [vitamins.VIT_D3_K2.id]: 5,
          [vitamins.ZINK.id]: 5,
          [vitamins.VIT_B12_KOMPLEX.id]: 5,
        },
      },
      {
        value: { text: "Weiblich", value: "female" },
        scores: {
          [vitamins.L_ARGININ.id]: 5,
          [vitamins.OPC_TRAUBENKERNEXTKRAKT.id]: 5,
          [vitamins.KALIUM.id]: 5,
          [vitamins.OMEGA_3.id]: 6,
          [vitamins.MAGNESIUM.id]: 5,
          [vitamins.VIT_D3_K2.id]: 5,
          [vitamins.ZINK.id]: 5,
          [vitamins.VIT_B12_KOMPLEX.id]: 5,
        },
      },
      { value: { text: "Andere", value: "other" }, scores: {} },
    ],
  },
] as const;

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

export interface Question<T extends QuestionId> {
  id: T;
  text: string;
  subtitle?: string;
  type: QuestionType;
  answers: ReadonlyArray<{
    value: { text: string; value: string };
    scores?: Record<string, number>;
  }>;
  maxSteps?: number;
}

export interface QuestionProps<T extends QuestionId> {
  question: Question<T>;
  onAnswer: (questionId: T, answers: AnswerType<T>[]) => void;
  initialAnswers: AnswerType<T>[];
  onBack: () => void;
  variables?: { name?: string };
}

export interface HistoryItem<T extends QuestionId> {
  question: Question<T>;
  answers: AnswerType<T>[];
}

export interface QuestionnaireState<T extends QuestionId> {
  currentQuestionIndex: number;
  history: HistoryItem<T>[];
  direction: "forward" | "backward";
  isAnimating: boolean;
}
