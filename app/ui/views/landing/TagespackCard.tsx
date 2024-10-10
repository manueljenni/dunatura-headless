import tagespack from "@/public/images/landing/tagespack.png";
import Image from "next/image";

export default function TagespackCard() {
  return (
    <div className="flex flex-col md:flex-row justify-center items-center px-4 w-full">
      <div className="relative w-full max-w-[700px] bg-gradient-to-b from-[#232E23] to-[#374735] rounded-[36px] p-6 text-white flex flex-col justify-end space-y-2 overflow-visible mb-12 drop-shadow-[0_35px_35px_rgba(56,71,55,0.5)] h-fit z-30 lg:rotate-[-1deg]">
        <Image
          src={tagespack}
          alt="tagespack"
          className="transform w-full object-contain md:pb-6 z-20 h-fit -translate-y-[12vh] mb-[-12vh]"
        />
        <div className="space-y-4 z-40">
          <p className="text-5xl font-medium">
            Keine unnötigen Füllstoffe und möglichst natürlich.
          </p>
          <p className="text-[#D3D7D2] text-lg">
            Bei dunatura stehen Sorgfalt und Nährstoff&shy;experten&shy;wissen an erster
            Stelle in der Produktentwicklung. Durchgängig laborgeprüft.
          </p>
        </div>
      </div>
    </div>
  );
}
