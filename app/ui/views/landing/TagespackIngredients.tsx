import { Button } from "@/components/primitives/button";
import Ingredient from "../../components/custom/Ingredient";
import TagespackCard from "./TagespackCard";

export default function TagespackWithIngredients() {
  return (
    <div className="flex justify-center items-center pb-12 relative pt-12">
      <div className="grid grid-cols-1 lg:grid-cols-2 items-center justify-center gap-4 max-w-[1200px] w-full">
        <div className="flex justify-center items-center px-4">
          <TagespackCard />
        </div>

        <div className="flex justify-center items-center w-full">
          <div className="relative w-full z-50 justify-end">
            <div className="flex lg:flex-col flex-row gap-4 items-center justify-start overflow-x-auto no-scrollbar w-full z-50 py-4">
              <Ingredient
                image="/images/pills/vitamin-c-background.png"
                title="Vitamin C"
                text="Stärkt das Immunsystem und fördert die Kollagenbildung."
                roundedImage
              />
              <Ingredient
                image="/images/pills/kalium-background.png"
                title="Kalium"
                text="Unterstützt die Muskel- und Nervenfunktion."
                roundedImage
              />
              <Ingredient
                image="/images/pills/vitamin-b-komplex-background.png"
                title="Vitamin B Komplex"
                text="Fördert den Energiestoffwechsel und die geistige Klarheit."
                roundedImage
              />
              <Ingredient
                image="/images/pills/zink-background.png"
                title="Zink"
                text="Fördert die Hautgesundheit und unterstützt das Immunsystem."
                roundedImage
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
