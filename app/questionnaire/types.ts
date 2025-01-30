import {
  Activity,
  Brain,
  CircleUser,
  Dumbbell,
  Flower2,
  Focus,
  Heart,
  Layers,
  Shield,
  ShieldCheck,
  ShieldPlus,
  Sparkle,
  Sparkles,
  Timer,
  User,
  Zap,
} from "lucide-react";

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

const baseVitamin = {
  getImageSrc: function (this: any) {
    const key = Object.keys(vitamins).find(
      (k) => vitamins[k as keyof typeof vitamins] === this,
    );
    return `/images/pills/${key?.toLowerCase().replace(/_/g, "-")}.png`;
  },
};

export const vitamins = {
  OMEGA_3: {
    ...baseVitamin,
    id: 8,
    name: "Omega-3 Fettsäuren (Vegan)",
    subtitle: "300mg Omega 3",
    longTitle: "Omega 3 - 300mg gesamt mit DHA und EPA",
    headline: "Algenöl mit dem Baustein für Herzfunktion, Blutdruck und Gehirnfunktion.",
    color: "#00783b",
    effects: [
      { text: "Herzgesundheit", icon: Heart },
      { text: "Gehirnfunktion", icon: Brain },
    ],
    shopifyId: "8298468442376",
    variantId: "44615904887048",
    price: 8.0,
  },
  HYALURONSAURE: {
    ...baseVitamin,
    id: 10,
    name: "Hyaluronsäure",
    subtitle: "360mg Hyaluronsäure",
    longTitle: "Hyaluronsäure - 360mg",
    headline: "Bestandteil der Haut, des Bindegewebes und der Knorpel.",
    shopifyId: "8298473586952",
    color: "#BD9AC8",
    effects: [
      { text: "Hautstraffung", icon: Sparkle },
      { text: "Gelenke", icon: Activity },
    ],
    price: 7.0,
    variantId: "44615914488072",
  },
  VIT_C: {
    ...baseVitamin,
    id: 11,
    name: "Vitamin C",
    subtitle: "100mg Vitamin C",
    longTitle: "Vitamin C Acerola - 100mg",
    headline: "Der Klassiker für das Immunsystem und die Kollagenbildung.",
    shopifyId: "vitamin-c",
    color: "#EA5D0B",
    effects: [
      { text: "Immunsystem", icon: Shield },
      { text: "Kollagenbildung", icon: Flower2 },
    ],
    price: 5.0,
    variantId: "44615915274504",
  },
  MSM: {
    ...baseVitamin,
    id: 14,
    name: "MSM",
    subtitle: "500mg MSM",
    longTitle: "MSM - 500mg",
    headline:
      "Schwefel - Bestandteil von Haut, Haaren, Muskeln, Sehnen, Knorpel und Bindegewebe.",
    shopifyId: "msm",
    color: "#0166B3",
    effects: [
      { text: "Gelenke", icon: Activity },
      { text: "Bindegewebe", icon: Layers },
    ],
    price: 6.0,
    variantId: "44615915897096",
  },
  KALIUM: {
    ...baseVitamin,
    id: 15,
    name: "Kalium",
    subtitle: "180mg Kalium",
    longTitle: "Kaliumcitrat - 180mg",
    headline: "Das Elektrolyt für Blutdruck, Nervensystem und Muskelfunktion.",
    shopifyId: "kalium",
    color: "#00B4E6",
    effects: [
      { text: "Bindegewebe", icon: Layers },
      { text: "Muskeln", icon: Activity },
    ],
    price: 4.0,
    variantId: "44615916519688",
  },
  L_ARGININ: {
    ...baseVitamin,
    id: 16,
    name: "L-Arginin",
    subtitle: "620mg L-Arginin",
    longTitle: "L-Arginin - 620mg",
    headline: "Der Eiweißbaustein für die Stickstoffmonoxid Produktion.",
    shopifyId: "l-arginin",
    color: "#008F9D",
    effects: [
      { text: "Gelenke", icon: Activity },
      { text: "Bindegewebe", icon: Layers },
    ],
    price: 5.0,
    variantId: "44615917142280",
  },
  MAGNESIUM: {
    ...baseVitamin,
    id: 17,
    name: "Tri-Magnesiumdicitrat",
    subtitle: "75mg Magnesium",
    longTitle: "Tri-Magnesiumdicitrat - 75mg",
    headline: "Der schnell verfügbare Beitrag für deine Muskelfunktion.",
    shopifyId: "tri-magnesiumdicitrat",
    color: "#D1D8DC",
    effects: [
      { text: "Muskeln", icon: Activity },
      { text: "Bindegewebe", icon: Layers },
    ],
    price: 3.0,
    variantId: "44615917699336",
  },
  SELEN: {
    ...baseVitamin,
    id: 18,
    name: "Selen",
    subtitle: "70µg Selen",
    longTitle: "Selenmethionin - 70 µg",
    headline: "Das Spurenelement für Haut, Haare und die Schilddrüse.",
    shopifyId: "selen",
    color: "#D0CFE2",
    effects: [
      { text: "Haut", icon: User },
      { text: "Haare", icon: CircleUser },
    ],
    price: 2.0,
    variantId: "44615918125320",
  },
  EISEN_VIT_C: {
    ...baseVitamin,
    id: 19,
    name: "Eisen + Vitamin C",
    subtitle: "14mg Eisen + 40mg Vitamin C",
    longTitle: "Eisen 14mg + natürliches Vitamin C",
    headline: "Die Kombination für den Energiestoffwechsel.",
    shopifyId: "eisen-vitamin-c",
    color: "#F39973",
    effects: [
      { text: "Muskeln", icon: Activity },
      { text: "Bindegewebe", icon: Layers },
    ],
    price: 4.0,
    variantId: "44615918780680",
  },
  KURKUMA_EXTRACT: {
    ...baseVitamin,
    id: 29,
    name: "Kurkuma Extrakt",
    subtitle: "300mg Curcumin",
    longTitle: "Kurkuma Extrakt - 300mg Curcumin",
    headline: "Traditioneller Pflanzenstoff trifft Wissenschaft.",
    shopifyId: "kurkuma",
    color: "#FBB806",
    effects: [
      { text: "Haut", icon: User },
      { text: "Gelenke", icon: Activity },
    ],
    price: 5.0,
    variantId: "44614531252488",
  },
  OPC_TRAUBENKERNEXTKRAKT: {
    ...baseVitamin,
    id: 30,
    name: "OPC Traubenkernextrakt",
    subtitle: "40% OPC",
    longTitle: "OPC Traubenkernextrakt - 380mg",
    headline: "Das starke Antioxidans aus der Natur.",
    shopifyId: "opc-traubenkernextrakt",
    color: "#823C8A",
    effects: [
      { text: "Haut", icon: User },
      { text: "Gelenke", icon: Activity },
    ],
    price: 6.0,
    variantId: "44615919632648",
  },
  VIT_D3_K2: {
    ...baseVitamin,
    id: 41,
    name: "Vitamin D3+K2",
    subtitle: "1.000IE D3 + 200µg K2",
    longTitle: "Vitamin D3 1.000IE + K2 200µg",
    headline: "Das Sonnenvitamin für starke Knochen und ein gesundes Immunsystem.",
    shopifyId: "vitamin-d2k3",
    color: "#FBBE5C",
    effects: [
      { text: "Knochen", icon: Activity },
      { text: "Muskeln", icon: Activity },
    ],
    price: 7.0,
    variantId: "44615909900552",
  },
  COENZYM_Q10: {
    ...baseVitamin,
    id: 44,
    name: "Coenzym Q10",
    subtitle: "200mg Q10",
    longTitle: "Coenzym Q10 - 200mg",
    headline: "Natürlicher Energielieferant für Herz, Muskeln und Nervensystem.",
    shopifyId: "q10",
    color: "#f4c245",
    effects: [
      { text: "Herzgesundheit", icon: Heart },
      { text: "Muskeln", icon: Activity },
    ],
    price: 3.0,
    variantId: "44615922286856",
  },
  ZINK: {
    ...baseVitamin,
    id: 55,
    name: "Zink",
    subtitle: "25mg Zink",
    longTitle: "Zink - 25mg",
    headline: "Essentielles Spurenelement für Immunsystem, Haut und Hormone.",
    shopifyId: "zink",
    color: "#C4DAD1",
    effects: [
      { text: "Haut", icon: User },
      { text: "Haare", icon: CircleUser },
    ],
    price: 2.0,
    variantId: "44615904035080",
  },
  VIT_B12_KOMPLEX: {
    ...baseVitamin,
    id: 56,
    name: "Vitamin B12 + Komplex",
    subtitle: "B12 + Komplex",
    longTitle: "Vitamin B12 250µg + Folat 400µg + Komplex",
    headline: "Der B-Vitamin Komplex für Energie, Nervensystem und Blutbildung.",
    shopifyId: "vitamin-b12-folat",
    color: "#D53140",
    effects: [
      { text: "Muskeln", icon: Activity },
      { text: "Gelenke", icon: Activity },
    ],
    price: 5.0,
    variantId: "44615919993096",
  },
  ASHWAGANDHA: {
    ...baseVitamin,
    id: 60,
    name: "Ashwagandha",
    subtitle: "mit 25mg Withanoliden",
    longTitle: "Ashwaghandha 500mg reines Wurzelextrakt",
    headline: "Traditionelles Adaptogen für Entspannung und mentale Balance.",
    shopifyId: "ashwagandha",
    color: "#AECAE7",
    effects: [
      { text: "Haut", icon: User },
      { text: "Gelenke", icon: Activity },
    ],
    price: 4.0,
    variantId: "45230393557256",
  },
} as const;

export type Vitamin = (typeof vitamins)[keyof typeof vitamins];

export const vitaminsArray = Object.keys(vitamins).map((id: any) => {
  return vitamins[id as keyof typeof vitamins];
});

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
    conditions: {},
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
    conditions: {},
    chapter: "Gesundheitsziele",
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
    conditions: {},
    chapter: "Gesundheitsziele",
  },
  {
    id: 4,
    text: "Erzähle uns mehr über dich, sodass wir dir ein personalisiertes Tagespack zusammenstellen können.",
    type: QuestionType.TagespackPlaceholder,
    answers: [],
    conditions: {},
    chapter: "Gesundheitsziele",
  },
  {
    id: 5,
    text: "Lass uns zuerst deinen Namen hinzufügen.",
    subtitle: "Dein Name wird auf dein Tagespack gedruckt.",
    variables: { name: "name" },
    type: QuestionType.NameInput,
    maxSteps: 1,
    answers: [],
    conditions: {},
    chapter: "Allgemeine Informationen Allgemeine Informationen Allgemeine Informationen",
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
    conditions: {},
    chapter: "Allgemeine Informationen",
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
    conditions: {},
    chapter: "Allgemeine Informationen",
  },
  {
    id: 8,
    text: "Bist du schwanger, planst du bald schwanger zu werden oder bist du in der Stillzeit?",
    type: QuestionType.Select,
    maxSteps: 1,
    answers: [
      {
        value: { text: "Ich bin aktuell schwanger", value: "pregnant" },
        scores: {},
      },
      {
        value: { text: "Ich plane eine Schwangerschaft", value: "planned_pregnant" },
        scores: {},
      },
      {
        value: { text: "In der Stillzeit", value: "breastfeeding" },
        scores: {},
      },
      { value: { text: "Nein, weder noch", value: "no" }, scores: {} },
    ],
    conditions: {
      // Gender must be female
      7: "female",
    },
    chapter: "Allgemeine Informationen",
  },
  {
    id: 9,
    text: "Wie würdest du dein aktuelles Stresslevel der letzten 1-2 Wochen einschätzen?",
    type: QuestionType.Select,
    maxSteps: 1,
    answers: [
      {
        value: { text: "Entspannt und ausgeglichen", value: "normal" },
        scores: {},
      },
      {
        value: { text: "Leicht angespannt", value: "light_stress" },
        scores: {
          [vitamins.KURKUMA_EXTRACT.id]: 2,
          [vitamins.VIT_D3_K2.id]: 2,
          [vitamins.MAGNESIUM.id]: 2,
          [vitamins.VIT_B12_KOMPLEX.id]: 2,
        },
      },
      {
        value: { text: "Häufig gestresst", value: "medium_stress" },
        scores: {
          [vitamins.KURKUMA_EXTRACT.id]: 4,
          [vitamins.ASHWAGANDHA.id]: 4,
          [vitamins.COENZYM_Q10.id]: 2,
          [vitamins.VIT_D3_K2.id]: 4,
          [vitamins.MAGNESIUM.id]: 4,
          [vitamins.VIT_B12_KOMPLEX.id]: 4,
          [vitamins.VIT_C.id]: 2,
        },
      },
      {
        value: { text: "Im Dauerstress", value: "heavy_stress" },
        scores: {
          [vitamins.KURKUMA_EXTRACT.id]: 6,
          [vitamins.ASHWAGANDHA.id]: 8,
          [vitamins.COENZYM_Q10.id]: 4,
          [vitamins.VIT_D3_K2.id]: 6,
          [vitamins.MAGNESIUM.id]: 6,
          [vitamins.VIT_B12_KOMPLEX.id]: 6,
          [vitamins.VIT_C.id]: 4,
        },
      },
    ],
    chapter: "Gesundheit & Wohlbefinden",
  },
  {
    id: 10,
    text: "Alles klar. Und wie ist dein Schlaf?",
    type: QuestionType.Select,
    maxSteps: 1,
    answers: [
      {
        value: {
          text: "Prima! Ich schlafe super ein. Morgens stehe ich erholt auf.",
          value: "normal",
        },
        scores: {},
      },
      {
        value: {
          text: "OK. Bis auf wenige Ausnahmen schlafe ich gut.",
          value: "light_issues",
        },
        scores: {
          [vitamins.SELEN.id]: 1,
          [vitamins.VIT_D3_K2.id]: 1,
          [vitamins.MAGNESIUM.id]: 3,
          [vitamins.VIT_B12_KOMPLEX.id]: 1,
        },
      },
      {
        value: {
          text: "Nicht so gut. Ich schlafe schlecht ein oder wache nachts auf.",
          value: "medium_issues",
        },
        scores: {
          [vitamins.ASHWAGANDHA.id]: 2,
          [vitamins.SELEN.id]: 2,
          [vitamins.VIT_D3_K2.id]: 3,
          [vitamins.MAGNESIUM.id]: 5,
          [vitamins.VIT_B12_KOMPLEX.id]: 3,
        },
      },
      {
        value: {
          text: "Schlaf? Schön wäre es. Das klappt aktuell fast nie.",
          value: "strong_issues",
        },
        scores: {
          [vitamins.ASHWAGANDHA.id]: 4,
          [vitamins.COENZYM_Q10.id]: 3,
          [vitamins.SELEN.id]: 3,
          [vitamins.VIT_D3_K2.id]: 5,
          [vitamins.MAGNESIUM.id]: 10,
          [vitamins.VIT_B12_KOMPLEX.id]: 5,
        },
      },
    ],
    chapter: "Gesundheit & Wohlbefinden",
  },
  {
    id: 11,
    text: "Wie steht es bei dir um Kraft und Energie?",
    type: QuestionType.Select,
    maxSteps: 1,
    answers: [
      {
        value: {
          text: "Optimal. Genau wie es sein sollte.",
          value: "normal",
        },
        scores: {},
      },
      {
        value: {
          text: "Grundsätzlich habe ich ganz gut Energie, bis auf wenige Ausnahmen.",
          value: "light_issues",
        },
        scores: {
          [vitamins.KURKUMA_EXTRACT.id]: 2,
          [vitamins.COENZYM_Q10.id]: 3,
          [vitamins.SELEN.id]: 3,
          [vitamins.EISEN_VIT_C.id]: 2,
          [vitamins.VIT_D3_K2.id]: 3,
          [vitamins.ZINK.id]: 1,
          [vitamins.VIT_B12_KOMPLEX.id]: 3,
        },
      },
      {
        value: {
          text: "Meistens fühle ich mich eher schlapp. Es gibt aber auch gute Tage.",
          value: "medium_issues",
        },
        scores: {
          [vitamins.KURKUMA_EXTRACT.id]: 4,
          [vitamins.COENZYM_Q10.id]: 7,
          [vitamins.SELEN.id]: 6,
          [vitamins.EISEN_VIT_C.id]: 4,
          [vitamins.VIT_D3_K2.id]: 6,
          [vitamins.ZINK.id]: 2,
          [vitamins.VIT_B12_KOMPLEX.id]: 6,
        },
      },
      {
        value: {
          text: "Mein Akkus sind komplett leer und ich erhole mich nicht richtig.",
          value: "strong_issues",
        },
        scores: {
          [vitamins.KURKUMA_EXTRACT.id]: 6,
          [vitamins.COENZYM_Q10.id]: 10,
          [vitamins.SELEN.id]: 10,
          [vitamins.EISEN_VIT_C.id]: 6,
          [vitamins.VIT_D3_K2.id]: 10,
          [vitamins.ZINK.id]: 3,
          [vitamins.VIT_B12_KOMPLEX.id]: 10,
        },
      },
    ],
    chapter: "Gesundheit & Wohlbefinden",
  },
  {
    id: 12,
    text: "Wie oft treibst du Sport?",
    type: QuestionType.Select,
    maxSteps: 1,
    answers: [
      {
        value: {
          text: "Gar nicht, oder das ist lange her.",
          value: "never",
        },
        scores: {},
      },
      {
        value: {
          text: "Etwa 1x pro Woche - gelegentlich.",
          value: "1x_week",
        },
        scores: {
          [vitamins.KURKUMA_EXTRACT.id]: 2,
          [vitamins.OPC_TRAUBENKERNEXTKRAKT.id]: 2,
          [vitamins.COENZYM_Q10.id]: 2,
          [vitamins.MSM.id]: 2,
          [vitamins.KALIUM.id]: 3,
          [vitamins.L_ARGININ.id]: 2,
          [vitamins.HYALURONSAURE.id]: 2,
          [vitamins.OMEGA_3.id]: 2,
          [vitamins.SELEN.id]: 2,
          [vitamins.EISEN_VIT_C.id]: 2,
          [vitamins.VIT_D3_K2.id]: 2,
          [vitamins.MAGNESIUM.id]: 99,
          [vitamins.ZINK.id]: 2,
          [vitamins.VIT_B12_KOMPLEX.id]: 2,
          [vitamins.VIT_C.id]: 2,
        },
      },
      {
        value: {
          text: "2-3x pro Woche - regelmäßig.",
          value: "2_3x_week",
        },
        scores: {
          [vitamins.KURKUMA_EXTRACT.id]: 4,
          [vitamins.OPC_TRAUBENKERNEXTKRAKT.id]: 4,
          [vitamins.ASHWAGANDHA.id]: 4,
          [vitamins.COENZYM_Q10.id]: 4,
          [vitamins.MSM.id]: 4,
          [vitamins.KALIUM.id]: 5,
          [vitamins.L_ARGININ.id]: 4,
          [vitamins.HYALURONSAURE.id]: 4,
          [vitamins.OMEGA_3.id]: 4,
          [vitamins.SELEN.id]: 4,
          [vitamins.EISEN_VIT_C.id]: 4,
          [vitamins.VIT_D3_K2.id]: 99,
          [vitamins.MAGNESIUM.id]: 99,
          [vitamins.ZINK.id]: 4,
          [vitamins.VIT_B12_KOMPLEX.id]: 4,
          [vitamins.VIT_C.id]: 4,
        },
      },
      {
        value: {
          text: "Fast täglich.",
          value: "daily",
        },
        scores: {
          [vitamins.KURKUMA_EXTRACT.id]: 6,
          [vitamins.OPC_TRAUBENKERNEXTKRAKT.id]: 6,
          [vitamins.ASHWAGANDHA.id]: 6,
          [vitamins.COENZYM_Q10.id]: 6,
          [vitamins.MSM.id]: 6,
          [vitamins.KALIUM.id]: 8,
          [vitamins.L_ARGININ.id]: 6,
          [vitamins.HYALURONSAURE.id]: 6,
          [vitamins.OMEGA_3.id]: 6,
          [vitamins.SELEN.id]: 6,
          [vitamins.EISEN_VIT_C.id]: 6,
          [vitamins.VIT_D3_K2.id]: 99,
          [vitamins.MAGNESIUM.id]: 99,
          [vitamins.ZINK.id]: 6,
          [vitamins.VIT_B12_KOMPLEX.id]: 6,
          [vitamins.VIT_C.id]: 6,
        },
      },
    ],
    chapter: "Aktivitätslevel",
  },
  {
    id: 13,
    text: "Was ist Sport für dich?",
    type: QuestionType.Select,
    maxSteps: 1,
    answers: [
      {
        value: {
          text: "Unnötig und zeitraubend.",
          value: "unnecessary",
        },
        scores: {
          [vitamins.VIT_D3_K2.id]: 1,
          [vitamins.ZINK.id]: 1,
          [vitamins.VIT_B12_KOMPLEX.id]: 1,
        },
      },
      {
        value: {
          text: "Netter Zeitvertreib - ohne Priorität.",
          value: "time_spender",
        },
        scores: {
          [vitamins.KALIUM.id]: 2,
          [vitamins.OMEGA_3.id]: 2,
          [vitamins.VIT_D3_K2.id]: 1,
          [vitamins.MAGNESIUM.id]: 99,
          [vitamins.ZINK.id]: 1,
          [vitamins.VIT_B12_KOMPLEX.id]: 1,
        },
      },
      {
        value: {
          text: "Sport ist fester Bestandteil meines Lebens.",
          value: "important",
        },
        scores: {
          [vitamins.KALIUM.id]: 4,
          [vitamins.OMEGA_3.id]: 4,
          [vitamins.VIT_D3_K2.id]: 99,
          [vitamins.MAGNESIUM.id]: 99,
          [vitamins.ZINK.id]: 2,
          [vitamins.VIT_B12_KOMPLEX.id]: 2,
        },
      },
      {
        value: {
          text: "Das Wichtigste für mich, ich habe sehr ambitionierte Ziele.",
          value: "ambitious",
        },
        scores: {
          [vitamins.KALIUM.id]: 6,
          [vitamins.OMEGA_3.id]: 6,
          [vitamins.VIT_D3_K2.id]: 99,
          [vitamins.MAGNESIUM.id]: 99,
          [vitamins.ZINK.id]: 3,
          [vitamins.VIT_B12_KOMPLEX.id]: 3,
        },
      },
    ],
    conditions: {},
    chapter: "Aktivitätslevel",
  },
  {
    id: 14,
    text: "Rauchst du oder konsumierst du Produkte mit Nikotin?",
    type: QuestionType.Select,
    maxSteps: 1,
    answers: [
      {
        value: {
          text: "Niemals.",
          value: "never",
        },
        scores: {},
      },
      {
        value: {
          text: "Gelegentlich.",
          value: "occasional",
        },
        scores: {
          [vitamins.OPC_TRAUBENKERNEXTKRAKT.id]: 2,
          [vitamins.COENZYM_Q10.id]: 1,
          [vitamins.OMEGA_3.id]: 1,
          [vitamins.VIT_D3_K2.id]: 1,
          [vitamins.ZINK.id]: 2,
          [vitamins.VIT_B12_KOMPLEX.id]: 2,
          [vitamins.VIT_C.id]: 4,
        },
      },
      {
        value: {
          text: "Täglich, aber weniger als 10 Zigaretten.",
          value: "daily_less_than_10",
        },
        scores: {
          [vitamins.OPC_TRAUBENKERNEXTKRAKT.id]: 4,
          [vitamins.COENZYM_Q10.id]: 2,
          [vitamins.OMEGA_3.id]: 2,
          [vitamins.VIT_D3_K2.id]: 2,
          [vitamins.ZINK.id]: 4,
          [vitamins.VIT_B12_KOMPLEX.id]: 4,
          [vitamins.VIT_C.id]: 6,
        },
      },
      {
        value: {
          text: "Ich rauche mehr als 10 Zigaretten täglich.",
          value: "daily_more_than_10",
        },
        scores: {
          [vitamins.OPC_TRAUBENKERNEXTKRAKT.id]: 6,
          [vitamins.COENZYM_Q10.id]: 3,
          [vitamins.OMEGA_3.id]: 3,
          [vitamins.VIT_D3_K2.id]: 3,
          [vitamins.ZINK.id]: 6,
          [vitamins.VIT_B12_KOMPLEX.id]: 6,
          [vitamins.VIT_C.id]: 10,
        },
      },
    ],
    conditions: {},
    chapter: "Gewohnheiten",
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
  conditions?: Partial<Record<QuestionId, AnswerType<QuestionId>>>;
  chapter?: string;
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
  answers: AnswerType<QuestionId>[];
}

export interface QuestionnaireState<T extends QuestionId> {
  currentQuestionIndex: number;
  history: { [K in QuestionId]?: HistoryItem<T>[] }; // HistoryItem<T>[];
  direction: "forward" | "backward";
  isAnimating: boolean;
}

export const healthGoalIcons = {
  overall_health: ShieldCheck,
  energy: Zap,
  concentration: Focus,
  performance: Dumbbell,
  endurance: Timer,
  beauty: Sparkles,
  immunity: ShieldPlus,
} as const;

export type HealthGoal = keyof typeof healthGoalIcons;

export const vitaminCategories = {
  GENERAL: {
    id: "general",
    title: "Allgemeine Gesundheit",
    vitaminIds: [vitamins.VIT_D3_K2.id, vitamins.VIT_B12_KOMPLEX.id, vitamins.ZINK.id],
  },
  ENERGY: {
    id: "energy",
    title: "Energie & Leistung",
    vitaminIds: [vitamins.COENZYM_Q10.id, vitamins.EISEN_VIT_C.id, vitamins.MAGNESIUM.id],
  },
  IMMUNITY_BEAUTY: {
    id: "immunity_beauty",
    title: "Immunsystem & Schönheit",
    vitaminIds: [
      vitamins.VIT_C.id,
      vitamins.HYALURONSAURE.id,
      vitamins.OPC_TRAUBENKERNEXTKRAKT.id,
    ],
  },
  JOINTS_RELAX: {
    id: "joints_relax",
    title: "Gelenke & Entspannung",
    vitaminIds: [vitamins.MSM.id, vitamins.OMEGA_3.id, vitamins.ASHWAGANDHA.id],
  },
} as const;

export type VitaminCategory = (typeof vitaminCategories)[keyof typeof vitaminCategories];

export const getVitaminImage = (vitamin: Vitamin): string => {
  return `/images/pills/${vitamin.shopifyId}.png`;
};
