import { Button } from "@/components/primitives/button";
import Ingredient from "../../components/custom/Ingredient";
import TagespackCard from "./TagespackCard";

export default function TagespackIngredients() {
  return (
    <div className="flex justify-center items-center pb-12 relative">
      <div className="grid grid-cols-1 lg:grid-cols-2 items-center justify-center gap-4 max-w-[1200px] w-full">
        <div className="flex justify-center items-center px-4">
          <TagespackCard />
        </div>

        <div className="flex justify-center items-center w-full">
          <div className="relative w-full z-50 justify-end">
            <div className="flex lg:flex-col flex-row gap-4 items-center justify-start overflow-x-auto no-scrollbar w-full z-50 py-4">
              <div className="h-full w-24"></div>
              <Ingredient
                image="/images/landing/vitamin-c.png"
                title="Vitamin C"
                text="Stärkt das Immunsystem und fördert die Kollagenbildung."
              />
              <Ingredient
                image="/images/landing/kalium.png"
                title="Kalium"
                text="Unterstützt die Muskel- und Nervenfunktion."
              />
              <Ingredient
                image="/images/landing/vitamin-b-komplex.png"
                title="Vitamin B Komplex"
                text="Fördert den Energiestoffwechsel und die geistige Klarheit."
              />
              <Ingredient
                image="/images/landing/zink.png"
                title="Zink"
                text="Fördert die Hautgesundheit und unterstützt das Immunsystem."
              />
            </div>
            <div className="justify-center flex pt-6">
              <Button variant="pill" className="" size={"pill-lg"}>
                Erstelle dein persönliches Tagespack
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
