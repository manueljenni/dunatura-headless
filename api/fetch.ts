"use server";

import { createStorefrontApiClient } from "@shopify/storefront-api-client";
import axios from "axios";
import fs from "fs/promises";
import path from "path";
import { Ingredient, Tagespack } from "./types";

const storeDomain = process.env.SHOPIFY_STORE_DOMAIN;
const publicAccessToken = process.env.SHOPIFY_STOREFRONT_ACCESS_TOKEN;

if (!storeDomain || !publicAccessToken) {
  throw new Error("Missing Shopify store domain or public access token");
}

const client = createStorefrontApiClient({
  storeDomain: storeDomain,
  apiVersion: "2024-10",
  publicAccessToken: publicAccessToken,
});

export async function getThemenpacksWithIngredients(): Promise<Tagespack[]> {
  const { data } = await client.request(`#graphql
        query GetAllProductsWithMetafields {
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
                variants(first: 1) {
                  edges {
                    node {
                      id
                      title
                      availableForSale
                      unitPrice {
                        amount
                        currencyCode
                      }
                      unitPriceMeasurement {
                        referenceUnit
                        referenceValue
                        quantityUnit
                        quantityValue
                      }
                    }
                  }
                }
                tags
                ingredients: metafield(namespace: "custom", key: "ingredients_product_list") {
                  value
                }
                shortDescription: metafield(namespace: "product", key: "short_desc") {
                  value
                }
              }
            }
          }
        }
      `);

  const products =
    data?.products.edges
      .map((edge) => edge.node)
      .filter((product) => product.variants.edges[0]?.node.availableForSale)
      .filter((product) => product.tags.includes("Themenpack")) || [];

  const themenpacks = await Promise.all(
    products.map(async (product) => {
      let ingredientIds = [];
      try {
        ingredientIds = JSON.parse(product.ingredients?.value || "[]");
      } catch (error) {
        console.error(`Error parsing ingredients for product ${product.id}:`, error);
      }

      const ingredients = await Promise.all(ingredientIds.map(getIngredients));

      return {
        shopifyId: product.id,
        title: product.title,
        description: product.shortDescription?.value || null,
        price: product.priceRange.minVariantPrice.amount,
        pricePer100g:
          product.variants.edges[0]?.node.unitPriceMeasurement?.quantityValue || 0,
        ingredients: ingredients,
      };
    }),
  );

  return themenpacks;
}

export async function getIngredients(ingredientsString: string): Promise<Ingredient> {
  const { data } = await client.request(`#graphql
    query GetIngredients {
      product(id: "${ingredientsString}") {
        id
        title
        images(first: 1) {
          edges {
            node {
              originalSrc
            }
          }
        }
      }
    }
  `);

  const imageSrc = data.product.images.edges[0]?.node.originalSrc;
  let localImagePath = null;

  if (imageSrc) {
    const fileName = `${data.product.id.split("/").pop()}.jpg`;
    const localPath = path.join(
      process.cwd(),
      "public",
      "images",
      "ingredients",
      fileName,
    );

    try {
      const response = await axios.get(imageSrc, { responseType: "arraybuffer" });
      await fs.mkdir(path.dirname(localPath), { recursive: true });
      await fs.writeFile(localPath, response.data);
      localImagePath = `/images/ingredients/${fileName}`;
    } catch (error) {
      console.error(`Error downloading image for product ${data.product.id}:`, error);
    }
  }

  return {
    shopifyId: data.product.id,
    title: data.product.title,
    image: localImagePath || imageSrc, // Use local path if available, otherwise fallback to original URL
  };
}

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
  mutation CartCreate($input: CartInput!, $country: CountryCode, $language: LanguageCode) 
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
    mutation CartLinesAdd {
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
    query GetCart {
      cart(id: "${cartId}") {
        checkoutUrl
      }
    }`,
  );

  return response.data.cart.checkoutUrl;
}

// export async function clearCart(cartId: string) {
//   const { data, errors } = await client.request(
//     `#graphql
//     query GetCartLines($cartId: ID!) {
//       cart(id: $cartId) {
//         lines(first: 250) {
//           edges {
//             node {
//               id
//             }
//           }
//         }
//       }
//     }
//     `,
//     { cartId: cartId as never },
//   );

//   const lineIds = data.cart.lines.edges.map((line: any) => line.node.id);

//   if (lineIds.length > 0) {
//     const response = await client.request(
//       `#graphql
//       mutation CartLinesRemove($cartId: ID!, $lineIds: [ID!]!) {
//         cartLinesRemove(cartId: $cartId, lineIds: $lineIds) {
//           cart {
//             id
//           }
//           userErrors {
//             field
//             message
//           }
//         }
//       }
//     `,
//       {
//         variables: {
//           cartId,
//           lineIds,
//         },
//       },
//     );
//     return response;
//   }

//   return { message: "Cart is already empty." };
// }
