import { createAdminApiClient } from "@shopify/admin-api-client";
import { NextResponse } from "next/server";

const adminClient = createAdminApiClient({
  storeDomain: process.env.SHOPIFY_STORE_DOMAIN!,
  accessToken: process.env.SHOPIFY_ADMIN_ACCESS_TOKEN!,
  apiVersion: "2024-01",
});

export async function GET() {
  try {
    const { data } = await adminClient.request(
      `query {
        orders(first: 50, reverse: true) {
          edges {
            node {
              id
              name
              email
              createdAt
              totalPriceSet {
                shopMoney {
                  amount
                }
              }
              customer {
                firstName
                lastName
                email
              }
              lineItems(first: 10) {
                edges {
                  node {
                    title
                    quantity
                    originalTotalSet {
                      shopMoney {
                        amount
                      }
                    }
                  }
                }
              }
              displayFulfillmentStatus
              displayFinancialStatus
            }
          }
        }
      }`,
    );

    return NextResponse.json(data.orders.edges);
  } catch (error) {
    console.error("Error fetching orders:", error);
    return NextResponse.json({ error: "Failed to fetch orders" }, { status: 500 });
  }
}
