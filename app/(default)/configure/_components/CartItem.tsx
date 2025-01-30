import { type Vitamin } from "@/app/questionnaire/types";
import { PLAN_DISCOUNTS, SellingPlanType } from "@/types/selling-plans";
import { motion } from "framer-motion";
import { Minus, Plus } from "lucide-react";
import Image from "next/image";

interface CartItemProps {
  vitamin: Vitamin;
  quantity: number;
  onUpdateQuantity: (vitamin: Vitamin, delta: number) => void;
  selectedPlan?: SellingPlanType;
}

export function CartItem({
  vitamin,
  quantity,
  onUpdateQuantity,
  selectedPlan = SellingPlanType.Monthly,
}: CartItemProps) {
  const discount = PLAN_DISCOUNTS[selectedPlan];
  const discountedPrice = vitamin.price * (1 - discount / 100);
  const totalPrice = discountedPrice * quantity;

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
          <div className="text-sm text-gray-600">
            {discount > 0 ? (
              <span>
                €{discountedPrice.toFixed(2)}
                <span className="text-gray-400 line-through ml-2">
                  €{vitamin.price.toFixed(2)}
                </span>
              </span>
            ) : (
              `€${vitamin.price.toFixed(2)}`
            )}
          </div>
        </motion.div>
      </div>
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.2 }}
        className="flex items-center gap-2">
        <button
          onClick={() => onUpdateQuantity(vitamin, -1)}
          className="p-1 hover:bg-gray-100 rounded-full transition-colors">
          <Minus size={16} />
        </button>
        <span className="w-6 text-center">{quantity}</span>
        <button
          onClick={() => onUpdateQuantity(vitamin, 1)}
          className="p-1 hover:bg-gray-100 rounded-full transition-colors">
          <Plus size={16} />
        </button>
      </motion.div>
    </motion.div>
  );
}
