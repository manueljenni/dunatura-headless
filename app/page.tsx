import Hero from "./ui/views/landing/Hero";
import RoundedSectionEnding from "./ui/views/landing/RoundedSectionEnding";
import StepsHorizontal from "./ui/views/landing/StepsHorizontal";
import StepsVertical from "./ui/views/landing/StepsVertical";
import TagespackIngredients from "./ui/views/landing/TagespackIngredients";

export default function Home() {
  return (
    <div className="w-full h-full bg-lightBackground flex justify-center items-center">
      <div className="px-4 overflow-hidden w-full">
        <div className="h-full bg-background rounded-t-[32px]">
          <Hero />
          <div className="container max-w-6xl h-full mx-auto">
            {/* Responsive Steps Component */}
            <div className="hidden md:block">
              <StepsHorizontal />
            </div>
            <div className="block md:hidden">
              <StepsVertical />
            </div>
          </div>
        </div>
        <RoundedSectionEnding />
        <TagespackIngredients />
      </div>
    </div>
  );
}
