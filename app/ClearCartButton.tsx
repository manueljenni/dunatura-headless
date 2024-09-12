"use client";
import { clearCart } from "./api/fetch";
import { useCart } from "./utils/hooks";

export default function ClearCartButton() {
  const { cartId } = useCart();

  const handleClearCart = async () => {
    if (cartId) {
      await clearCart(cartId);
    }
  };

  return (
    <button
      onClick={() => handleClearCart()}
      className="mt-2 bg-blue-500 text-white rounded px-4 py-2">
      Clear Cart
    </button>
  );
}
