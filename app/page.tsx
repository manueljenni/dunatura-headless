import Experts from "../components/landing/Experts";
import FAQ from "../components/landing/FAQ";
import Hero from "../components/landing/Hero";
import Mission from "../components/landing/Mission";
import PreconfiguredView from "../components/landing/PreconfiguredView";
import RoundedSectionEnding from "../components/landing/RoundedSectionEnding";
import Steps from "../components/landing/Steps";
import TagespackWithIngredients from "../components/landing/TagespackIngredients";
import Testimonials from "../components/landing/Testimonials";

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
