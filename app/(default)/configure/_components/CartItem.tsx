import { type Vitamin } from "@/app/questionnaire/types";
import Image from "next/image";

interface CartItemProps {
  vitamin: Vitamin;
  quantity: number;
  onUpdateQuantity: (vitamin: Vitamin, delta: number) => void;
}

export function CartItem({ vitamin, quantity, onUpdateQuantity }: CartItemProps) {
  return (
    <div className="flex items-center justify-between py-3 first:pt-0 last:pb-0">
      <div className="flex items-center gap-3">
        <Image
          src={vitamin.getImageSrc()}
          alt={vitamin.name}
          className="w-10 h-10 object-contain"
          width={40}
          height={40}
        />
        <div>
          <p className="font-medium font-denimink">{vitamin.name}</p>
          <p className="text-gray-500 text-sm">€{(7.2 * quantity).toFixed(2)}</p>
        </div>
      </div>
      <div className="flex items-center gap-2">
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
      </div>
    </div>
  );
}
