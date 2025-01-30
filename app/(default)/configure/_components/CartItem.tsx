import { type Vitamin } from "@/app/questionnaire/types";
import { motion } from "framer-motion";
import Image from "next/image";

interface CartItemProps {
  vitamin: Vitamin;
  quantity: number;
  onUpdateQuantity: (vitamin: Vitamin, delta: number) => void;
}

export function CartItem({ vitamin, quantity, onUpdateQuantity }: CartItemProps) {
  return (
    <motion.div
      layout="position"
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.95 }}
      transition={{
        duration: 0.2,
        layout: {
          duration: 0.2,
        },
      }}
      className="flex items-center justify-between py-3 first:pt-0 last:pb-0 overflow-hidden">
      <div className="flex items-center gap-3">
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.1 }}>
          <Image
            src={vitamin.getImageSrc()}
            alt={vitamin.name}
            className="w-10 h-10 object-contain"
            width={40}
            height={40}
          />
        </motion.div>
        <motion.div
          initial={{ opacity: 0, x: -10 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.15 }}>
          <p className="font-medium font-denimink">{vitamin.name}</p>
          <p className="text-gray-500 text-sm">
            €{(vitamin.price * quantity).toFixed(2)}
          </p>
        </motion.div>
      </div>
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.2 }}
        className="flex items-center gap-2">
        <button
          onClick={() => onUpdateQuantity(vitamin, -1)}
          className="w-8 h-8 rounded-full bg-[#F6F6F3] flex items-center justify-center text-gray-600 hover:bg-[#EEEEE9]">
          -
        </button>
        <span className="w-6 text-center">{quantity}</span>
        <button
          onClick={() => onUpdateQuantity(vitamin, 1)}
          className="w-8 h-8 rounded-full bg-[#F6F6F3] flex items-center justify-center text-gray-600 hover:bg-[#EEEEE9]">
          +
        </button>
      </motion.div>
    </motion.div>
  );
}
