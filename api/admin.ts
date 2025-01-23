"use client";

import type { ShopifyOrder } from "@/types/admin";

export async function getShopifyOrders(): Promise<ShopifyOrder[]> {
  try {
    const response = await fetch("/api/orders");
    if (!response.ok) throw new Error("Failed to fetch orders");

    const edges = await response.json();

    return edges.map((edge: any) => ({
      id: edge.node.id,
      orderNumber: edge.node.name.replace("#", ""),
      email: edge.node.email,
      createdAt: edge.node.createdAt,
      totalPrice: edge.node.totalPriceSet.shopMoney.amount,
      customer: edge.node.customer,
      lineItems: {
        edges: edge.node.lineItems.edges,
      },
      fulfillmentStatus:
        edge.node.displayFulfillmentStatus?.toLowerCase() || "unfulfilled",
      financialStatus: edge.node.displayFinancialStatus,
    }));
  } catch (error) {
    console.error("Error fetching orders:", error);
    throw error;
  }
}
