"use client";

import QuestionnaireComplete from "@/components/custom/questionnaire/QuestionnaireComplete";
import { Answers, vitamins } from "../types";

export const dynamic = "force-dynamic";

export default function Completed() {
  const randomAnswers: Answers = {
    1: ["consent"],
    2: ["overall_health", "energy", "concentration"],
    3: ["20_30"],
    5: [],
    6: ["20_30"],
    7: ["male"],
    9: ["medium_stress"],
    10: ["normal"],
    11: ["light_issues"],
    12: ["2_3x_week"],
    13: ["important"],
    14: ["never"],
  };

  const scores: Record<number, number> = {
    // From answer 6: "20_30"
    [vitamins.COENZYM_Q10.id]: 3, // Taking highest between 2 and 3
    [vitamins.VIT_D3_K2.id]: 99, // Taking highest between 6 and 99
    [vitamins.ZINK.id]: 6,
    [vitamins.VIT_B12_KOMPLEX.id]: 5,
    // From answer 7: "male"
    [vitamins.L_ARGININ.id]: 5,
    [vitamins.SELEN.id]: 5, // Taking highest between 3 and 5
    [vitamins.EISEN_VIT_C.id]: 8, // Taking highest between 2 and 8
    [vitamins.HYALURONSAURE.id]: 5,
    // From answer 9: "medium_stress"
    [vitamins.KURKUMA_EXTRACT.id]: 4,
    [vitamins.ASHWAGANDHA.id]: 4,
    [vitamins.MAGNESIUM.id]: 99, // Taking highest between 4 and 99
    [vitamins.VIT_C.id]: 2,
    // From answer 12: "2_3x_week"
    [vitamins.OPC_TRAUBENKERNEXTKRAKT.id]: 4,
    [vitamins.MSM.id]: 4,
    [vitamins.KALIUM.id]: 5, // Taking highest between 4 and 5
    [vitamins.OMEGA_3.id]: 4, // Taking highest between 4 and 4
  };

  return (
    <QuestionnaireComplete
      scores={scores}
      answers={randomAnswers}
      onBack={() => {}}
      name="John Doe"
    />
  );
}
