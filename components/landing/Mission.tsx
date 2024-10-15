import { Button } from "@/components/primitives/button";
import magnesium from "@/public/images/pills/magnesium-pumpkin-seeds.png";
import omega3 from "@/public/images/pills/omega-3-chia-seeds.png";
import vitaminC from "@/public/images/pills/vitamin-c-orange-juice.png";
import Link from "next/link";
import Ingredient from "../custom/Ingredient";
import OpenLetter from "../custom/OpenLetter";

export default function Mission() {
  return (
    <div className="flex flex-col justify-center items-center bg-lightBackground pb-12 mt-18 px-6 lg:px-12 space-y-16">
      <div className="flex flex-col justify-center items-center w-full">
        <div className="flex flex-col lg:flex-row justify-between max-w-6xl w-full space-y-8 lg:space-y-0 lg:space-x-4">
          <div className="space-y-4 text-center lg:text-left max-w-2xl mx-auto">
            <h1 className="text-primary text-5xl font-semibold lg:leading-tight ">
              Unsere Mission ist es, Dir zu einem gesünderen Lebensstil zu verhelfen
            </h1>
            <p className="pb-4 text-lg">
              Mache den ersten Schritt mit unserem fünfminütigen Test und erhalte Deine
              persönliche Empfehlung von Vitaminen und Mikronährstoffen.
            </p>
            <Link href="/questionnaire">
              <Button variant="pill" size={"pill-xl"}>
                Jetzt Test starten
              </Button>
            </Link>
          </div>
          <div className="flex justify-start items-start w-full lg:w-auto overflow-x-auto">
            <div className="relative w-full z-50">
              <div className="flex lg:flex-col flex-row gap-4 items-center justify-start overflow-x-auto no-scrollbar w-full z-50 h-full py-2 px-1">
                <Ingredient
                  image={vitaminC}
                  title="2x Vitamin C"
                  text="Der Klassiker für das Immunsystem und die Kollagenbildung."
                  className="lg:-rotate-2"
                />
                <Ingredient
                  image={omega3}
                  title="1x Omega 3"
                  text="Für die Entwicklung von Gehirn und Augen."
                />
                <Ingredient
                  image={magnesium}
                  title="1x Tri-Magnesiumdicitrat"
                  text="Der Elektrolyt für die Muskelfunktion."
                  className="lg:rotate-2"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
      <OpenLetter />
    </div>
  );
}
