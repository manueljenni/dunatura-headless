"use server";

import { createStorefrontApiClient } from "@shopify/storefront-api-client";

const storeDomain = process.env.SHOPIFY_STORE_DOMAIN;
const publicAccessToken = process.env.SHOPIFY_STOREFRONT_ACCESS_TOKEN;

if (!storeDomain || !publicAccessToken) {
  throw new Error("Missing Shopify store domain or public access token");
}

const client = createStorefrontApiClient({
  storeDomain: storeDomain,
  apiVersion: "2023-10",
  publicAccessToken: publicAccessToken,
});

export async function getAllProducts() {
  const { data } = await client.request(`#graphql
        query GetAllProducts {
          products(sortKey: TITLE, first: 250) {
            edges {
              node {
                id
                title
                description
                handle
                priceRange {
                  minVariantPrice {
                    amount
                    currencyCode
                  }
                  maxVariantPrice {
                    amount
                    currencyCode
                  }
                }
                images(first: 1) {
                  edges {
                    node {
                      originalSrc
                      altText
                    }
                  }
                }
                variants(first: 1) {
                  edges {
                    node {
                      id
                      title
                      availableForSale
                    }
                  }
                }
                tags
              }
            }
          }
        }
      `);
  return (
    data?.products.edges
      .map((edge) => edge.node)
      .filter((product) => product.variants.edges[0]?.node.availableForSale)
      .filter((product) => product.tags.includes("Themenpack")) || []
  );
}

export async function createCart() {
  const cartCreateMutation = `#graphql
  mutation CreateCart($input: CartInput!, $country: CountryCode, $language: LanguageCode) 
  @inContext(country: $country, language: $language) {
    cartCreate(input: $input) {
      userErrors {
        message
        code
        field
      }
      cart {
        id
        checkoutUrl
      }
    }
  }
`;

  const { data } = await client.request(cartCreateMutation);
  if (!data?.cartCreate?.cart?.id) {
    throw new Error("Failed to create cart");
  }

  return data.cartCreate.cart.id;
}

export async function addToCart(cartId: string, variantId: string) {
  if (!cartId) {
    cartId = await createCart();
  }
  const response = await client.request(`#graphql
    mutation AddToCart {
      cartLinesAdd(cartId: "${cartId}", lines: [{
        quantity: 1,
        merchandiseId: "${variantId}"
      }]) {
        cart {
          id
        }
      }
    }
  `);
  return response;
}

export async function getCheckoutUrl(cartId: string) {
  const response = await client.request(
    `#graphql
    query GetCartUrl {
      cart(id: "${cartId}") {
        checkoutUrl
      }
    }`,
  );

  return response.data.cart.checkoutUrl;
}

export async function clearCart(cartId: string) {
  const { data, errors } = await client.request(`#graphql
    query GetCartLines {
      cart(id: "${cartId}") {
        lines(first: 250) {
          edges {
            node {
              id
            }
          }
        }
      }
    }
  `);

  const lineIds = data.cart.lines.edges.map((line: any) => line.node.id);

  if (lineIds.length > 0) {
    const response = await client.request(`#graphql
      mutation RemoveCartLines {
        cartLinesRemove(cartId: "${cartId}", lineIds: ${JSON.stringify(lineIds)}) {
          cart {
            id
          }
          userErrors {
            field
            message
          }
        }
      }
    `);
    return response;
  }

  return { message: "Cart is already empty." };
}
