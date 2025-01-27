import { addToCart } from "@/api/fetch";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    const { cartId, variantId } = await request.json();
    await addToCart(cartId, variantId);
    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json({ error: "Failed to add item to cart" }, { status: 500 });
  }
}
