import { createCart } from "@/api/fetch";
import { NextResponse } from "next/server";

export async function POST() {
  try {
    const { cartId, checkoutUrl } = await createCart();

    // Debug the response
    console.log("Cart creation API response:", { cartId, checkoutUrl });

    // Ensure we're returning a string for cartId
    return NextResponse.json({
      cartId: typeof cartId === "object" ? cartId.toString() : cartId,
      checkoutUrl,
    });
  } catch (error) {
    console.error("Cart creation failed:", error);
    return NextResponse.json({ error: "Failed to create cart" }, { status: 500 });
  }
}
