import { Button } from "@/components/primitives/button";
import pillBrown from "@/public/images/pills/pill-brown.png";
import pillHyaluron from "@/public/images/pills/pill-hyaluron.png";
import pillOmega from "@/public/images/pills/pill-omega.png";
import pillOrange from "@/public/images/pills/pill-orange.png";
import pillVitc from "@/public/images/pills/pill-vitc.png";
import pillWhite from "@/public/images/pills/pill-white.png";
import pillYellow from "@/public/images/pills/pill-yellow.png";
import Image from "next/image";

export default function Hero() {
  return (
    <div className="relative flex justify-center items-center flex-col pt-12 min-h-[600px] h-[45svh] lg:h-[80svh] max-w-6xl mx-auto">
      <div className="flex flex-col items-center justify-center h-full w-full space-y-12 relative z-10 my-[400px]">
        <h1 className="text-primary text-[40px] md:text-[50px] lg:text-[78px] font-semibold leading-none text-center lg:px-4 max-w-[800px]">
          Mikronährstoffe & Vitamine, für dich zusammengestellt
        </h1>
        <Button variant="pill" size="pill-2xl">
          Jetzt Test starten
        </Button>
      </div>
      <Image
        src={pillWhite}
        alt="Pill 1"
        className="absolute top-[50%] lg:top-[17%] left-[-30px] lg:left-[8%] w-20 md:w-28 h-auto z-0"
        style={{
          maxWidth: "100%",
          height: "auto"
        }} />
      <Image
        src={pillYellow}
        alt="Pill 2"
        className="absolute top-[38%] right-[-40px] md:right-[-25px] lg:top-[20%] lg:right-[2%] w-20 md:w-24 h-auto z-0"
        style={{
          maxWidth: "100%",
          height: "auto"
        }} />
      <Image
        src={pillOrange}
        alt="Pill 3"
        className="absolute hidden lg:block bottom-[15%] left-[-5%] lg:left-[25%] w-22 h-auto z-0"
        style={{
          maxWidth: "100%",
          height: "auto"
        }} />
      <Image
        src={pillHyaluron}
        alt="Pill 4"
        className="absolute hidden lg:block bottom-[27%] right-[0%] lg:right-[0%] w-30 h-auto z-0"
        style={{
          maxWidth: "100%",
          height: "auto"
        }} />
      <Image
        src={pillBrown}
        alt="Pill 5"
        className="absolute top-[10%] left-[-1%] lg:top-[48%] lg:left-[2%] w-24 md:w-32 h-auto z-0"
        style={{
          maxWidth: "100%",
          height: "auto"
        }} />
      <Image
        src={pillVitc}
        alt="Pill 6"
        className="absolute hidden lg:block top-[40%] right-[-10%] lg:right-[10%] w-28 h-auto z-0"
        style={{
          maxWidth: "100%",
          height: "auto"
        }} />
      <Image
        src={pillOmega}
        alt="Pill 7"
        className="absolute top-[15%] lg:top-[15%] right-[20%] lg:right-[40%] w-20 md:w-28 h-auto z-0"
        style={{
          maxWidth: "100%",
          height: "auto"
        }} />
    </div>
  );
}
