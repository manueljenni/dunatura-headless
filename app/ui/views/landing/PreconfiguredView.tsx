import { Button } from "@/components/primitives/button";
import leaf from "@/public/images/icons/leaf.png";
import tree from "@/public/images/icons/tree.png";
import Image from "next/image";
import PreconfiguredPacks from "./PreconfiguredPacks";

export default function PreconfiguredView() {
  return (
    <div
      className="relative w-full md:min-h-[900px] pb-4 bg-cover bg-center"
      style={{ backgroundImage: "url('/images/landing/landscape.png')" }}>
      <div className="absolute inset-0 bg-gradient-to-b from-[#FBFCF8] to-transparent"></div>

      <div className="relative z-10 top-0 right-0 m-4 md:m-12 left-0 space-y-12 pt-8">
        <PreconfiguredPacks />
        <div className="flex justify-center items-center">
          <div className="flex justify-around items-center flex-col space-y-4 md:space-y-0 md:flex-row text-white lg:w-1/2 text-xl space-x-4 font-medium">
            <div className="flex justify-center items-center space-x-4">
              <Image src={tree} alt="Icon 1" className="w-8 h-8" />
              <p>Natürliche Inhaltsstoffe</p>
            </div>
            <div className="flex justify-center items-center space-x-4">
              <Image src={leaf} alt="Icon 1" className="w-8 h-8" />
              <p>Alle Produkte vegan</p>
            </div>
          </div>
        </div>
        <div className="flex justify-center items-center pb-12">
          <div className="px-12 py-8 bg-[#E7EAD7] rounded-[32px] lg:w-5/6 shadow-xl flex justify-between md:items-center flex-col md:flex-row space-y-6 md:space-y-0 max-w-[1000px]">
            <p className="text-3xl font-medium text-primary hyphens-auto">
              Lieber doch selber zusammenstellen?
            </p>
            <Button variant="pill" size={"pill-xl"}>
              Erstelle dein persönliches Tagespack
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
