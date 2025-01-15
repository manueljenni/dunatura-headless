import { type Vitamin } from "@/app/questionnaire/types";
import { motion } from "framer-motion";
import { Check, Circle } from "lucide-react";
import Image from "next/image";

interface VitaminCardProps {
  vitamin: Vitamin;
  isSelected: boolean;
  onSelect: (vitamin: Vitamin) => void;
}

export function VitaminCard({ vitamin, isSelected, onSelect }: VitaminCardProps) {
  return (
    <motion.div
      layout
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      whileHover={{ scale: isSelected ? 1.02 : 1.01 }}
      className={`relative p-4 lg:p-6 rounded-3xl cursor-pointer select-none
        ${
          isSelected
            ? "bg-[#F2F7F3] ring-2 ring-primary"
            : "bg-[#FCFCF8] ring-1 ring-[#E2E1DC]"
        }`}
      onClick={() => onSelect(vitamin)}>
      <motion.div
        initial={false}
        animate={{
          opacity: isSelected ? 1 : 0,
          scale: isSelected ? 1 : 0.75,
        }}
        transition={{ duration: 0.2 }}
        className="absolute top-4 left-4">
        <div className="bg-primary rounded-full w-6 h-6 flex items-center justify-center">
          <Check size={14} className="text-white" strokeWidth={3} />
        </div>
      </motion.div>
      <motion.div
        initial={false}
        animate={{
          opacity: isSelected ? 0 : 1,
          scale: isSelected ? 1.25 : 1,
        }}
        transition={{ duration: 0.2 }}
        className="absolute top-4 left-4">
        <div className="rounded-full w-6 h-6 flex items-center justify-center">
          <Circle size={22} className="text-[#E2E1DC]" strokeWidth={3} />
        </div>
      </motion.div>
      <div className="flex flex-col items-center text-center select-none">
        <motion.div
          animate={{ scale: isSelected ? 1.05 : 1 }}
          transition={{ type: "spring", stiffness: 300, damping: 20 }}>
          <Image
            src={vitamin.getImageSrc()}
            alt={vitamin.name}
            className="w-[72px] h-[72px] lg:w-20 lg:h-20 object-contain mb-4"
            width={80}
            height={80}
            draggable={false}
          />
        </motion.div>
        <h3 className="font-medium font-denimink text-xl mb-2 lg:mb-6 text-primary">
          {vitamin.name}
        </h3>
        <p className="text-gray-500 text-xs lg:text-sm">{vitamin.headline}</p>
      </div>
    </motion.div>
  );
}
