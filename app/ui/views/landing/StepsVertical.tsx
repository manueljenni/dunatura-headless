"use client";
import alwaysByYourSide from "@/public/images/landing/always-by-your-side.png";
import makeTheTest from "@/public/images/landing/quiz-image.png";
import tailoredToYou from "@/public/images/landing/tailored-image.png";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";

export default function StepsVertical() {
  const [lineStyle, setLineStyle] = useState({ top: 0, height: 0 });
  const containerRef = useRef<HTMLDivElement>(null);
  const firstIconRef = useRef<HTMLDivElement>(null);
  const lastIconRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const calculateLinePosition = () => {
      if (containerRef.current && firstIconRef.current && lastIconRef.current) {
        const containerRect = containerRef.current.getBoundingClientRect();
        const firstIconRect = firstIconRef.current.getBoundingClientRect();
        const lastIconRect = lastIconRef.current.getBoundingClientRect();

        setLineStyle({
          top: firstIconRect.top - containerRect.top,
          height: lastIconRect.bottom - firstIconRect.top - firstIconRect.height / 2,
        });
      }
    };

    const resizeObserver = new ResizeObserver(calculateLinePosition);
    if (containerRef.current) {
      resizeObserver.observe(containerRef.current);
    }

    calculateLinePosition();
    window.addEventListener("resize", calculateLinePosition);

    return () => {
      resizeObserver.disconnect();
      window.removeEventListener("resize", calculateLinePosition);
    };
  }, []);

  return (
    <div ref={containerRef} className="flex flex-col relative p-4 w-full">
      <div
        className="absolute left-[21px] w-[2px] m-4 bg-[#D7E0D7] z-0"
        style={{
          top: `${lineStyle.top}px`,
          height: `${lineStyle.height}px`,
        }}></div>

      {/* First step item */}
      <div className="flex flex-col h-full items-start text-left step-item step-item-1 pl-16 pr-4 mb-8 relative space-y-1">
        <Image
          src={makeTheTest}
          alt="Mache den Test"
          className="w-[85%] object-contain mb-4"
          width="192"
          height="192"
          style={{
            maxWidth: "100%",
            height: "auto"
          }} />
        <div className="flex items-center mb-2 relative">
          <div
            className="step-icon w-[42px] h-[42px] bg-white rounded-full flex justify-center items-center absolute -left-16 z-10"
            ref={firstIconRef}>
            <svg
              width="24"
              height="24"
              viewBox="0 0 19 19"
              fill="none"
              xmlns="http://www.w3.org/2000/svg">
              <path
                d="M2.16406 9.71448C2.16406 5.57234 5.52192 2.21448 9.66406 2.21448C13.8062 2.21448 17.1641 5.57234 17.1641 9.71448C17.1641 13.8566 13.8062 17.2145 9.66406 17.2145H2.16406L4.36076 15.0178C3.00353 13.6605 2.16406 11.7855 2.16406 9.71448ZM5.78539 15.7145H9.66406C12.9778 15.7145 15.6641 13.0282 15.6641 9.71448C15.6641 6.40077 12.9778 3.71448 9.66406 3.71448C6.35035 3.71448 3.66406 6.40077 3.66406 9.71448C3.66406 11.3288 4.30249 12.8382 5.42143 13.9572L6.48208 15.0178L5.78539 15.7145ZM6.66406 10.4645H12.6641C12.6641 12.1213 11.3209 13.4645 9.66406 13.4645C8.00721 13.4645 6.66406 12.1213 6.66406 10.4645Z"
                fill="#232E23"
              />
            </svg>
          </div>
          <h3 className="text-[20px] text-primary font-semibold">Mache den Test</h3>
        </div>
        <p className="text-[18px] text-secondary mt-4">
          Erzähle uns über Dich, deine Ziele und deinen Lifestyle.
        </p>
      </div>

      {/* Second step item */}
      <div className="flex flex-col h-full items-start text-left step-item step-item-2 pl-16 pr-4 mb-8 relative space-y-1">
        <Image
          src={tailoredToYou}
          alt="Tailored to you"
          className="w-[85%] object-contain mb-4"
          width="192"
          height="192"
          style={{
            maxWidth: "100%",
            height: "auto"
          }} />
        <div className="flex items-center mb-2 relative">
          <div className="step-icon w-[42px] h-[42px] bg-white rounded-full flex justify-center items-center absolute -left-16 z-10">
            <svg
              width="24"
              height="24"
              viewBox="0 0 18 18"
              fill="none"
              xmlns="http://www.w3.org/2000/svg">
              <path
                d="M12.75 14.25H14.25V10.5H7.5V3.75H3.75V5.25H5.25V6.75H3.75V8.25H6V9.75H3.75V11.25H5.25V12.75H3.75V14.25H5.25V12.75H6.75V14.25H8.25V12H9.75V14.25H11.25V12.75H12.75V14.25ZM9 9H15C15.4142 9 15.75 9.33577 15.75 9.75V15C15.75 15.4142 15.4142 15.75 15 15.75H3C2.58579 15.75 2.25 15.4142 2.25 15V3C2.25 2.58579 2.58579 2.25 3 2.25H8.25C8.66423 2.25 9 2.58579 9 3V9Z"
                fill="#232E23"
              />
            </svg>
          </div>
          <h3 className="text-[20px] text-primary font-semibold">
            Konfiguriert für dich
          </h3>
        </div>
        <p className="text-[18px] text-secondary mt-4">
          Wir erstellen ein Vitamin- & Mikronährstoff-Tagespack, das auf Dich und deine
          Ziele zugeschnitten ist.
        </p>
      </div>

      {/* Third step item */}
      <div className="flex flex-col h-full items-start text-left step-item step-item-3 pl-16 pr-4 space-y-1 relative">
        <Image
          src={alwaysByYourSide}
          alt="Always by your side"
          className="w-[85%] object-contain mb-4"
          width="192"
          height="192"
          style={{
            maxWidth: "100%",
            height: "auto"
          }} />
        <div className="flex items-center mb-2 relative">
          <div
            ref={lastIconRef}
            className="step-icon w-[42px] h-[42px] bg-white rounded-full flex justify-center items-center absolute -left-16 z-10">
            <svg
              width="24"
              height="24"
              viewBox="0 0 27 22"
              fill="none"
              xmlns="http://www.w3.org/2000/svg">
              <path
                d="M0 16.6406C0 17.2266 0.433594 17.6133 1.07812 17.6133H3.75C5.69531 17.6133 6.80859 17.0625 8.22656 15.4219L15.3281 7.13672C16.3359 5.96484 17.1797 5.53125 18.4688 5.53125H20.8594V8.17969C20.8594 8.64844 21.1289 8.91797 21.6094 8.91797C21.832 8.91797 22.043 8.83594 22.2188 8.69531L26.6484 5.02734C27.0234 4.72266 27.0234 4.24219 26.6484 3.91406L22.2188 0.234375C22.043 0.09375 21.832 0.0234375 21.6094 0.0234375C21.1289 0.0234375 20.8594 0.28125 20.8594 0.75V3.57422H18.4102C16.4531 3.57422 15.3281 4.125 13.9219 5.76562L6.83203 14.0508C5.8125 15.2344 5.00391 15.668 3.80859 15.668H1.07812C0.445312 15.668 0 16.0547 0 16.6406ZM0 4.55859C0 5.13281 0.445312 5.53125 1.07812 5.53125H3.80859C5.01562 5.53125 5.82422 5.96484 6.83203 7.14844L13.9219 15.4336C15.3281 17.0625 16.4531 17.6133 18.4102 17.6133H20.8594V20.5195C20.8594 20.9883 21.1289 21.2461 21.6094 21.2461C21.832 21.2461 22.043 21.1758 22.2188 21.0352L26.6484 17.3672C27.0234 17.0508 27.0234 16.582 26.6484 16.2539L22.2188 12.5742C22.043 12.4336 21.832 12.3516 21.6094 12.3516C21.1289 12.3516 20.8594 12.6211 20.8594 13.0898V15.668H18.4688C17.1797 15.668 16.3359 15.2344 15.3281 14.0508L8.22656 5.76562C6.80859 4.13672 5.69531 3.58594 3.75 3.58594H1.07812C0.433594 3.58594 0 3.97266 0 4.55859Z"
                fill="#232E23"
              />
            </svg>
          </div>
          <h3 className="text-[20px] text-primary font-semibold">Flexible Anpassung</h3>
        </div>
        <p className="text-[18px] text-secondary mt-4">
          Ändere jederzeit deine Kombination, wie es für dich passt.
        </p>
      </div>
    </div>
  );
}
