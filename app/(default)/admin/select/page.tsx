"use client";

import SelectQuestion from "@/app/questionnaire/SelectQuestion";
import { questionnaireData } from "@/app/questionnaire/types";

export default function page() {
  return (
    <div className="max-w-2xl mx-auto p-6 space-y-6">
      <SelectQuestion
        question={questionnaireData[1]}
        onAnswer={() => {}}
        variables={{ name: "Max" }}
      />
    </div>
  );
}
