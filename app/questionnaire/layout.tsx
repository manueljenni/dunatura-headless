"use client";

import { useSearchParams } from "next/navigation";
import React from "react";

export default function QuestionnaireLayout({ children }: { children: React.ReactNode }) {
  const searchParams = useSearchParams();
  const isCompleted = searchParams.get("step") === "completed";

  return (
    <div className="min-h-screen relative bg-[#FBFCF8]">
      <div
        className={`relative z-10 w-full ${isCompleted ? "overflow-y-auto h-screen" : "overflow-y-scroll"}`}>
        {children}
      </div>
      <div
        className="fixed bottom-0 left-0 w-full h-[45%] bg-cover bg-center"
        style={
          {
            backgroundImage: "url('/images/landing/landscape.png')",
            "--gradient-overlay":
              "linear-gradient(to bottom, #FBFCF8 0%, rgba(251, 252, 248, 0.8) 60%, rgba(251, 252, 248, 0.8) 30%, rgba(251, 252, 248, 0) 100%)",
          } as React.CSSProperties
        }>
        <div
          className="absolute inset-0 h-full"
          style={{ background: "var(--gradient-overlay)" }}
        />
      </div>
    </div>
  );
}
