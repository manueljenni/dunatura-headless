import { getCheckoutUrl } from "@/api/fetch";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    const body = await request.json();

    const { cartId } = body;
    if (!cartId) {
      throw new Error("No cartId provided");
    }

    const checkoutUrl = await getCheckoutUrl(cartId);

    return NextResponse.json({ checkoutUrl });
  } catch (error) {
    console.error("Checkout failed:", error);
    return NextResponse.json({ error: "Failed to create checkout" }, { status: 500 });
  }
}
