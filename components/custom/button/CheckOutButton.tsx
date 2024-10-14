"use client";

import { getCheckoutUrl } from "@/api/fetch";
import { useCart } from "@/app/utils/hooks";
import { Button } from "@/components/primitives/button";

export default function CheckOutButton() {
  const { cartId } = useCart();
  const handleCheckout = async () => {
    const checkoutData = await getCheckoutUrl(cartId!);
    window.open(checkoutData, "_blank");
  };

  return <Button onClick={handleCheckout}>Checkout</Button>;
}
