import Experts from "./ui/views/landing/Experts";
import FAQ from "./ui/views/landing/FAQ";
import Hero from "./ui/views/landing/Hero";
import Mission from "./ui/views/landing/Mission";
import PreconfiguredView from "./ui/views/landing/PreconfiguredView";
import RoundedSectionEnding from "./ui/views/landing/RoundedSectionEnding";
import Steps from "./ui/views/landing/Steps";
import TagespackWithIngredients from "./ui/views/landing/TagespackIngredients";
import Testimonials from "./ui/views/landing/Testimonials";

export default function Home() {
  return (
    <div className="w-full h-full bg-lightBackground flex justify-center items-center">
      <div className="overflow-hidden w-full">
        <div className="h-full bg-background rounded-t-[32px] mx-4">
          <Hero />
          <Steps />
          <RoundedSectionEnding />
        </div>
        <div className="mx-4">
          <TagespackWithIngredients />
          <Testimonials />
        </div>
        <PreconfiguredView />
        <Experts />
        <Mission />
        <FAQ />
      </div>
    </div>
  );
}
