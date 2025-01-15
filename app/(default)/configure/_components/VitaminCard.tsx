import { type Vitamin } from "@/app/questionnaire/types";
import { Check, Circle } from "lucide-react";
import Image from "next/image";

interface VitaminCardProps {
  vitamin: Vitamin;
  isSelected: boolean;
  onSelect: (vitamin: Vitamin) => void;
}

export function VitaminCard({ vitamin, isSelected, onSelect }: VitaminCardProps) {
  return (
    <div
      className={`relative p-4 lg:p-6 rounded-3xl cursor-pointer transition-all select-none
        ${
          isSelected
            ? "bg-[#F2F7F3] ring-2 ring-primary"
            : "bg-[#FCFCF8] ring-1 ring-[#E2E1DC]"
        }`}
      onClick={() => onSelect(vitamin)}>
      {isSelected ? (
        <div className="absolute top-4 left-4">
          <div className="bg-primary rounded-full w-6 h-6 flex items-center justify-center">
            <Check size={14} className="text-white" strokeWidth={3} />
          </div>
        </div>
      ) : (
        <div className="absolute top-4 left-4">
          <div className="rounded-full w-6 h-6 flex items-center justify-center">
            <Circle size={22} className="text-[#E2E1DC]" strokeWidth={3} />
          </div>
        </div>
      )}
      <div className="flex flex-col items-center text-center select-none">
        <Image
          src={vitamin.getImageSrc()}
          alt={vitamin.name}
          className="w-[72px] h-[72px] lg:w-20 lg:h-20 object-contain mb-4"
          width={80}
          height={80}
          draggable={false}
        />
        <h3 className="font-medium font-denimink text-xl mb-2 lg:mb-6 text-primary">
          {vitamin.name}
        </h3>
        <p className="text-gray-500 text-xs lg:text-sm">{vitamin.headline}</p>
      </div>
    </div>
  );
}
