"use client";

import { useEffect, useRef, useState } from "react";
import Testimonial from "../../components/custom/Testimonial";

export default function Testimonials() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const testimonialSliderRef = useRef<HTMLDivElement>(null);

  const testimonials = [
    {
      text: "Dank der praktischen Verpackung vergesse ich so gut wie nie, meine Vitamine zu nehmen - auch auf Reisen oder an stressigen Tagen!",
      author: "Katharina",
      className: "transform lg:-rotate-2 testimonial-card-left-offset",
    },
    {
      text: "Seit ich die individuell für mich konfigurierten Tagespacks von dunatura nehme, fühle ich mich fitter und habe den ganzen Tag mehr Energie.",
      author: "Julia",
      className: "",
    },
    {
      text: "Auch im Abo kann man sein Tagespack jederzeit anpassen. Der Kundenservice ist sehr hilfreich und nett - ich kann das nur empfehlen!",
      author: "Sarah",
      className: "transform lg:rotate-2 testimonial-card-right-offset",
    },
  ];

  useEffect(() => {
    const adjustTestimonialHeights = () => {
      if (testimonialSliderRef.current) {
        const testimonialElements =
          testimonialSliderRef.current.querySelectorAll(".testimonial");
        let maxHeight = 0;
        testimonialElements.forEach((testimonial) => {
          (testimonial as HTMLElement).style.height = "auto";
          maxHeight = Math.max(maxHeight, testimonial.clientHeight);
        });
        testimonialElements.forEach((testimonial) => {
          (testimonial as HTMLElement).style.height = `${maxHeight}px`;
        });
      }
    };

    adjustTestimonialHeights();
    window.addEventListener("resize", adjustTestimonialHeights);

    return () => {
      window.removeEventListener("resize", adjustTestimonialHeights);
    };
  }, []);

  const handlePrev = () => {
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1);
    }
  };

  const handleNext = () => {
    if (currentIndex < testimonials.length - 1) {
      setCurrentIndex(currentIndex + 1);
    }
  };

  return (
    <div className="flex flex-col items-center space-y-4 w-full bg-[#FBFCF8]">
      <div className="bg-[#EDE8E8] px-3 py-1 rounded-full w-fit">
        <span className="text-[#2E2323] font-medium">4.7 von 5 Sternen</span>
      </div>
      <h1 className="text-[#232E23] text-5xl font-semibold leading-tight text-center max-w-4xl px-4">
        Unsere Mission bei <span className="underline underline-offset-4">du</span>natura:
        Gesundheit täglich und praktisch fördern
      </h1>
      <div className="flex flex-col lg:flex-row items-center space-y-4 lg:space-y-0 lg:space-x-12 w-full lg:px-12 px-4 py-12 relative max-w-[1200px] overflow-hidden">
        <div
          id="testimonial-slider"
          ref={testimonialSliderRef}
          className="flex overflow-x-auto overflow-y-hidden no-scrollbar w-full lg:gap-12 h-full md:py-4 px-2">
          {testimonials.map((testimonial, index) => (
            <Testimonial
              key={index}
              index={index}
              currentIndex={currentIndex}
              testimonial={testimonial}
            />
          ))}
        </div>
        <div className="flex justify-center space-x-4 mt-12 lg:hidden">
          <button
            id="prev-testimonial"
            className={`testimonial-nav ${currentIndex === 0 ? "disabled-button" : ""}`}
            onClick={handlePrev}>
            <svg
              width="65"
              height="65"
              viewBox="0 0 65 65"
              fill="none"
              xmlns="http://www.w3.org/2000/svg">
              <rect
                x="1"
                y="0.740967"
                width="63"
                height="63"
                rx="31.5"
                stroke="#E8EBE0"
              />
              <path
                d="M26.9405 30.9075H43.1693V33.5742H26.9405L34.0925 40.726L32.2069 42.6116L21.8359 32.2408L32.2069 21.8699L34.0925 23.7555L26.9405 30.9075Z"
                fill="#413232"
              />
            </svg>
          </button>
          <button
            id="next-testimonial"
            className={`testimonial-nav ${
              currentIndex === testimonials.length - 1 ? "disabled-button" : ""
            }`}
            onClick={handleNext}>
            <svg
              width="65"
              height="65"
              viewBox="0 0 65 65"
              fill="none"
              xmlns="http://www.w3.org/2000/svg">
              <rect
                x="1"
                y="0.740967"
                width="63"
                height="63"
                rx="31.5"
                stroke="#E8EBE0"
              />
              <path
                d="M38.0647 30.9075L30.9127 23.7555L32.7983 21.8699L43.1693 32.2408L32.7983 42.6116L30.9127 40.726L38.0647 33.5742H21.8359V30.9075H38.0647Z"
                fill="#413232"
              />
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
}
