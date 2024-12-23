"use client";

import { useCart } from "@/app/utils/hooks";
import { Button } from "@/components/primitives/button";

export default function ClearCartButton() {
  const { cartId } = useCart();

  const handleClearCart = async () => {
    if (cartId) {
    }
  };

  return <Button onClick={handleClearCart}>Clear Cart</Button>;
}
