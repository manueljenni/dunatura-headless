import Hero from "./ui/views/landing/Hero";
import StepsHorizontal from "./ui/views/landing/StepsHorizontal";
import StepsVertical from "./ui/views/landing/StepsVertical";

export default function Home() {
  return (
    <div className="w-full h-full bg-lightBackground flex justify-center items-center">
      <div className="px-4 overflow-hidden w-full">
        <div className="h-full bg-background rounded-t-[32px]">
          <Hero />
          <div className="container max-w-6xl h-full mx-auto">
            <div className="hidden md:block">
              <StepsHorizontal />
            </div>
            <div className="md:hidden">
              <StepsVertical />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
