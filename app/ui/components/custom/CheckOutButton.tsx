"use client";

import { getCheckoutUrl } from "@/app/api/fetch";
import { useCart } from "@/app/utils/hooks";

export default function CheckOutButton() {
  const { cartId } = useCart();
  const handleCheckout = async () => {
    const checkoutData = await getCheckoutUrl(cartId!);
    window.open(checkoutData, "_blank");
  };

  return (
    <button
      onClick={handleCheckout}
      className="mt-2 bg-blue-500 text-white rounded px-4 py-2">
      Checkout
    </button>
  );
}
