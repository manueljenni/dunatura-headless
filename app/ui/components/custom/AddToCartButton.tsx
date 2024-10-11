"use client";

import { addToCart } from "@/api/fetch";
import { useCart } from "@/app/utils/hooks";
import { Button, ButtonProps } from "@/components/primitives/button";

export default function AddToCartButton(props: {
  variantId: string;
  variant?: ButtonProps["variant"];
  size?: ButtonProps["size"];
  className?: string;
}) {
  const { cartId } = useCart();

  const handleAddToCart = async () => {
    if (cartId) {
      await addToCart(cartId, props.variantId);
    }
  };

  return (
    <Button
      onClick={handleAddToCart}
      variant={props.variant ?? "default"}
      size={props.size ?? "default"}
      className={props.className}>
      Add to Cart
    </Button>
  );
}
