import { createCart } from "@/api/fetch";
import { NextResponse } from "next/server";

export async function POST() {
  try {
    const { cartId, checkoutUrl } = await createCart();
    return NextResponse.json({
      cartId: cartId,
      checkoutUrl,
    });
  } catch (error) {
    console.error("Cart creation failed:", error);
    return NextResponse.json({ error: "Failed to create cart" }, { status: 500 });
  }
}
