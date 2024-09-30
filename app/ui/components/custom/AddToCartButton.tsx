"use client";

import { addToCart } from "@/app/api/fetch";
import { useCart } from "@/app/utils/hooks";
import { Button } from "@/components/ui/button";

export default function AddToCartButton(props: { variantId: string }) {
  const { cartId } = useCart();

  const handleAddToCart = async () => {
    if (cartId) {
      await addToCart(cartId, props.variantId);
    }
  };

  return <Button onClick={handleAddToCart}>Add to Cart</Button>;
}
