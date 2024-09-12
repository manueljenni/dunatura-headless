"use client";
import { getCheckoutUrl } from "./api/fetch";
import { useCart } from "./utils/hooks";

export default function CheckOutButton(props: { variantId: string }) {
  const { cartId } = useCart();
  const handleCheckout = async (variantId: string) => {
    const checkoutData = await getCheckoutUrl(cartId!);
    window.open(checkoutData, "_blank");
  };

  return (
    <button
      onClick={() => handleCheckout(props.variantId)}
      className="mt-2 bg-blue-500 text-white rounded px-4 py-2">
      Checkout
    </button>
  );
}
