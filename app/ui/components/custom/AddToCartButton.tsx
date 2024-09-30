"use client";

import { addToCart } from "@/api/fetch";
import { useCart } from "@/app/utils/hooks";
import { Button } from "@/components/primitives/button";

export default function AddToCartButton(props: { variantId: string }) {
  const { cartId } = useCart();

  const handleAddToCart = async () => {
    if (cartId) {
      await addToCart(cartId, props.variantId);
    }
  };

  return <Button onClick={handleAddToCart}>Add to Cart</Button>;
}
