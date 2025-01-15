import { ChevronRight } from "lucide-react";
import Image from "next/image";
import { type SelectedVitamin } from "../page";

interface FloatingPillProps {
  show: boolean;
  selectedVitamins: SelectedVitamin[];
  onClick: () => void;
}

export function FloatingPill({ show, selectedVitamins, onClick }: FloatingPillProps) {
  return (
    <div
      className={`fixed bottom-4 left-1/2 -translate-x-1/2 bg-white rounded-full shadow-lg py-1.5 px-3 flex items-center gap-2 lg:hidden cursor-pointer border border-neutral-300 transition-all duration-300 ${
        show && selectedVitamins.length > 0
          ? "opacity-100 translate-y-0"
          : "opacity-0 translate-y-4 pointer-events-none"
      }`}
      onClick={onClick}>
      <div className="flex items-center">
        {selectedVitamins.slice(0, 2).map((item, index) => (
          <div
            key={item.vitamin.id}
            className={`w-8 h-8 rounded-full bg-[#F6F6F3] flex items-center justify-center border-2 border-white ${
              index > 0 ? "-ml-3" : ""
            }`}>
            <Image
              src={item.vitamin.getImageSrc()}
              alt={item.vitamin.name}
              width={20}
              height={20}
              className="w-5 h-5 object-contain"
            />
          </div>
        ))}
        {selectedVitamins.length > 2 && (
          <div className="w-8 h-8 rounded-full bg-[#F6F6F3] flex items-center justify-center text-xs font-medium -ml-3 border-2 border-white">
            +{selectedVitamins.length - 2}
          </div>
        )}
      </div>
      <div className="flex items-center gap-1">
        <span className="font-medium text-primary">Weiter</span>
        <ChevronRight size={16} className="text-primary" />
      </div>
    </div>
  );
}
