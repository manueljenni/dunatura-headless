import { Button } from "@/components/primitives/button";
import Ingredient from "../../components/custom/Ingredient";

export default function Mission() {
  return (
    <div className="flex justify-center items-center bg-[#FBFCF8] pb-12 mt-18 px-6 lg:px-12">
      <div className="flex flex-col md:flex-row justify-between max-w-6xl w-full space-y-8 md:space-y-0 md:space-x-4">
        <div className="space-y-4 text-center md:text-left max-w-4xl">
          <h1 className="text-[#232E23] text-5xl font-semibold md:leading-tight">
            Unsere Mission ist es, Dir zu einem gesünderen Lebensstil zu verhelfen
          </h1>
          <p className="pb-4 text-lg">
            Mache den ersten Schritt mit unserem fünfminütigen Test und erhalte Deine
            persönliche Empfehlung von Vitaminen und Mikronährstoffen.
          </p>
          <Button variant="pill" size={"pill-lg"}>
            Jetzt Test starten
          </Button>
        </div>
        <div className="flex justify-start items-start w-full">
          <div className="relative w-full z-50">
            <div className="flex md:flex-col flex-row gap-4 items-center justify-start overflow-x-auto no-scrollbar w-full z-50 h-full py-2">
              <Ingredient
                image=""
                title="2x Vitamin C"
                text="Der Klassiker für das Immunsystem und die Kollagenbildung."
                className="md:-rotate-2"
              />
              <Ingredient
                image=""
                title="1x Omega 3"
                text="Für die Entwicklung von Gehirn und Augen."
              />
              <Ingredient
                image=""
                title="1x Tri-Magnesiumdicitrat"
                text="Der Elektrolyt für die Muskelfunktion."
                className="md:rotate-2"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
