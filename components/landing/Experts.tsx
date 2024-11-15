"use client";

import christianMetz from "@/public/images/experts/christian-metz.jpg";
import christianeSauret from "@/public/images/experts/christiane-sauret.png";
import nataliaBelaiche from "@/public/images/experts/natatalia-belaiche.png";
import stefanRhein from "@/public/images/experts/stefan-rhein.jpg";
import drThomasKlein from "@/public/images/experts/thomas-klein.png";
import Image from "next/image";

import { useEffect, useRef } from "react";

export default function Experts() {
  return (
    <div className="flex flex-col justify-center items-center pt-24 pb-12">
      <div className="text-center max-w-5xl space-y-8 mb-12 px-4 w-full">
        <div className="flex justify-center items-center">
          <div className="bg-primaryBackground px-3 py-1 rounded-full inline-flex">
            <p className="text-primary font-medium whitespace-normal">
              Basierend auf den aktuellen wissenschaftlichen Erkennt&shy;nissen
            </p>
          </div>
        </div>
        <h1 className="text-primary text-5xl font-semibold leading-tight">
          Unser&nbsp;Team&nbsp;von Ernährungs&shy;experten
        </h1>
        <p className="text-lg">
          Eine Gruppe von Experten unterstützt uns dabei, die besten Ergebnisse und
          Qualität sicherzustellen.
        </p>
      </div>
      <ExpertSlider />
    </div>
  );
}

function ExpertSlider() {
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const scrollContainer = scrollContainerRef.current;
    if (!scrollContainer) return;
    const scrollContent = scrollContainer.firstElementChild as HTMLDivElement;
    if (!scrollContent) return;

    const cloneContent = () => {
      const originalContent = scrollContent.cloneNode(true) as HTMLDivElement;
      scrollContainer.appendChild(originalContent);
    };

    cloneContent();
  }, []);

  return (
    <div
      className="scroll-container no-scrollbar overflow-x-hidden whitespace-nowrap pb-20"
      ref={scrollContainerRef}>
      <div className="scroll-content flex gap-0.5 animate-scroll">
        {experts.map((expert, idx) => (
          <div
            key={idx}
            className="scroll-item relative w-72 rounded-[24px] overflow-hidden flex-shrink-0 mx-1 flex flex-col justify-end">
            <Image
              src={expert.imgSrc}
              alt={expert.name}
              className="w-full h-[400px] object-cover"
            />
            <div className="absolute bottom-0 left-0 w-full p-4 bg-gradient-to-t from-[rgba(0,0,0,0.9)] via-[rgba(0,0,0,0.75)] to-transparent flex flex-col justify-start h-[45%]">
              <p className="text-white text-lg mb-1 mt-auto">{expert.name}</p>
              <p className="text-sm whitespace-normal text-neutral-400 mb-2">
                {expert.title}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

const experts = [
  {
    name: "Natalia Belaiche",
    imgSrc: nataliaBelaiche,
    title: "Integrativer Ernährungs-Gesundheitscoach",
    description: "„Gesund ist das neue Sexy“, Autor mehrerer Ernährungsbücher",
  },
  {
    name: "Christiane Sauret",
    imgSrc: christianeSauret,
    title: "Unabhängige Expertin & Coachin für Pharmazie, Vital- & Mikronährstoffe",
    description: "Polymedikation & Verblisterung, Therapieoptimierung & Pflege",
  },
  {
    name: "Christian Metz",
    imgSrc: christianMetz,
    title: "Approbierter Apotheker, MBA (Pharmazie), Ex-Novartis",
    description: "MBA (Pharmazie), Ex-Novartis, Ludwig-Max.-Universität München",
  },
  {
    name: "Stefan Rhein",
    imgSrc: stefanRhein,
    title: "Ernährungsexperte, Autor mehrerer Ernährungsbücher",
    description: "Betriebliches Gesundheitsmanagement, Autor mehrerer Ernährungsbücher",
  },
  {
    name: "Dr. Thomas Klein",
    imgSrc: drThomasKlein,
    title: "CEO firmovo GmbH, Prävention und Rehabilitation, TU München",
    description:
      "Betriebl. Gesundheit (BGM), Prävention und Rehabilitation, Technische Universität München",
  },
];
