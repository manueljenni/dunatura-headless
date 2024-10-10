import Hero from "./ui/views/landing/Hero";
import RoundedSectionEnding from "./ui/views/landing/RoundedSectionEnding";
import Steps from "./ui/views/landing/Steps";
import TagespackWithIngredients from "./ui/views/landing/TagespackIngredients";
import Testimonials from "./ui/views/landing/Testimonials";

export default function Home() {
  return (
    <div className="w-full h-full bg-lightBackground flex justify-center items-center">
      <div className="px-4 overflow-hidden w-full">
        <div className="h-full bg-background rounded-t-[32px]">
          <Hero />
          <Steps />
        </div>
        <RoundedSectionEnding />
        <TagespackWithIngredients />
        <Testimonials />
      </div>
    </div>
  );
}
