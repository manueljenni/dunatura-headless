"use client";

import { addToCart } from "./api/fetch";
import { useCart } from "./utils/hooks";

export default function AddToCartButton(props: { variantId: string }) {
  const { cartId } = useCart();

  const handleAddToCart = async () => {
    if (cartId) {
      await addToCart(cartId, props.variantId);
    }
  };

  return (
    <button
      onClick={handleAddToCart}
      className="bg-blue-500 text-white rounded px-4 py-2">
      Add to Cart
    </button>
  );
}
