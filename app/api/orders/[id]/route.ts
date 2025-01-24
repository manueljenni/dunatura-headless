import { createAdminApiClient } from "@shopify/admin-api-client";
import { NextResponse } from "next/server";

const adminClient = createAdminApiClient({
  storeDomain: process.env.SHOPIFY_STORE_DOMAIN!,
  accessToken: process.env.SHOPIFY_ADMIN_ACCESS_TOKEN!,
  apiVersion: "2024-01",
});

export async function GET(request: Request, { params }: { params: { id: string } }) {
  try {
    const decodedId = decodeURIComponent(params.id);
    const { data } = await adminClient.request(
      `query getOrder($id: ID!) {
        order(id: $id) {
          id
          name
          email
          phone
          createdAt
          note
          totalPriceSet {
            shopMoney {
              amount
            }
          }
          subtotalPriceSet {
            shopMoney {
              amount
            }
          }
          totalShippingPriceSet {
            shopMoney {
              amount
            }
          }
          customer {
            firstName
            lastName
            email
            phone
          }
          shippingAddress {
            address1
            address2
            city
            zip
            country
          }
          lineItems(first: 50) {
            edges {
              node {
                title
                quantity
                originalTotalSet {
                  shopMoney {
                    amount
                  }
                }
                variant {
                  title
                  price
                  image {
                    url
                  }
                }
              }
            }
          }
          displayFulfillmentStatus
          displayFinancialStatus
        }
      }`,
      {
        variables: {
          id: decodedId,
        },
      },
    );

    return NextResponse.json(data.order);
  } catch (error) {
    console.error("Error fetching order:", error);
    return NextResponse.json({ error: "Failed to fetch order" }, { status: 500 });
  }
}
