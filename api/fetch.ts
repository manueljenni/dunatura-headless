"use server";

import { createStorefrontApiClient } from "@shopify/storefront-api-client";
import axios from "axios";
import fs from "fs/promises";
import path from "path";
import { Ingredient } from "./types";

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

export async function getThemenpacksWithIngredients() {
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
            }
            images(first: 1) {
              edges {
                node {
                  originalSrc
                }
              }
            }
            variants(first: 1) {
              edges {
                node {
                  id
                  availableForSale
                  price {
                    amount
                    currencyCode
                  }
                  unitPrice {
                    amount
                    currencyCode
                  }
                }
              }
            }
            tags
            ingredients: metafield(namespace: "custom", key: "ingredients_product_list") {
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
      .filter((product) => product.tags.includes("Themenpack"))
      .filter((product) => !product.title.includes("Barber Shop")) || [];

  return await Promise.all(
    products.map(async (product) => {
      const ingredientIds = JSON.parse(product.ingredients?.value || "[]");
      const ingredients = await Promise.all(
        ingredientIds.map(async (id: string) => {
          const ingredient = await getIngredients(id);
          return ingredient;
        }),
      );

      return {
        ...product,
        shopifyId: product.variants.edges[0].node.id,
        price: parseFloat(product.variants.edges[0].node.price.amount),
        pricePer100g: parseFloat(product.variants.edges[0].node.unitPrice?.amount || "0"),
        ingredients,
      };
    }),
  );
}

export type Tagespack = Awaited<ReturnType<typeof getThemenpacksWithIngredients>>[number];

export async function getIngredients(ingredientsString: string): Promise<Ingredient> {
  const { data } = await client.request(
    `#graphql
    query GetIngredients($id: ID!) {
      product(id: $id) {
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
  `,
    {
      variables: {
        id: ingredientsString,
      },
    },
  );

  if (!data?.product) {
    throw new Error(`Product with id ${ingredientsString} not found`);
  }

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
          products(sortKey: TITLE, first: 250, query: "available_for_sale:true") {
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
                metafield(namespace: "custom", key: "cover_image") {
                  reference {
                    ... on MediaImage {
                      image {
                        originalSrc
                      }
                    }
                  }
                }
              }
            }
          }
        }
      `);

  return data?.products.edges.map((edge) => edge.node) || [];
}

export async function getAllVitamins() {
  const { data } = await client.request(`#graphql
    query GetAllVitamins {
      products(sortKey: TITLE, first: 250, query: "available_for_sale:true AND product_type:'Rohstoff'") {
        edges {
          node {
            id
            title
            images(first: 10) {
              edges {
                node {
                  originalSrc
                }
              }
            }
          }
        }
      }
    }
  `);

  return data?.products.edges.map((edge) => edge.node) || [];
}

export async function createCart() {
  try {
    console.log("Creating new cart...");
    const { data } = await client.request(`#graphql
      mutation CreateNewCart {
        cartCreate {
          cart {
            id
            checkoutUrl
            lines(first: 10) {
              edges {
                node {
                  quantity
                  merchandise {
                    ... on ProductVariant {
                      id
                    }
                  }
                }
              }
            }
          }
        }
      }
    `);

    console.log("Cart creation response:", data);

    if (!data?.cartCreate?.cart?.id) {
      throw new Error("Failed to create cart");
    }

    return {
      cartId: data.cartCreate.cart.id,
      checkoutUrl: data.cartCreate.cart.checkoutUrl,
    };
  } catch (error) {
    console.error("Cart creation failed:", error);
    throw error;
  }
}

export async function addToCart(cartId: string, variantId: string, quantity = 1) {
  try {
    console.log(
      `Adding to cart - CartID: ${cartId}, VariantID: ${variantId}, Quantity: ${quantity}`,
    );

    const { data } = await client.request(
      `#graphql
      mutation AddItemToCart($cartId: ID!, $lines: [CartLineInput!]!) {
        cartLinesAdd(cartId: $cartId, lines: $lines) {
          cart {
            id
            lines(first: 10) {
              edges {
                node {
                  quantity
                  merchandise {
                    ... on ProductVariant {
                      id
                    }
                  }
                }
              }
            }
          }
          userErrors {
            field
            message
          }
        }
      }
    `,
      {
        variables: {
          cartId,
          lines: [
            {
              merchandiseId: variantId,
              quantity,
            },
          ],
        },
      },
    );

    console.log("Add to cart response:", data);
    return data;
  } catch (error) {
    console.error("Add to cart failed:", error);
    throw error;
  }
}

export async function getCheckoutUrl(cartId: string) {
  try {
    console.log(`Getting checkout URL for cart: ${cartId}`);

    const { data } = await client.request(
      `#graphql
      query GetCartDetails($cartId: ID!) {
        cart(id: $cartId) {
          checkoutUrl
          lines(first: 10) {
            edges {
              node {
                quantity
                merchandise {
                  ... on ProductVariant {
                    id
                  }
                }
              }
            }
          }
        }
      }`,
      {
        variables: {
          cartId,
        },
      },
    );

    console.log("Cart checkout response:", data);

    if (!data?.cart?.checkoutUrl) {
      console.log(
        "Cart not found or expired, creating new cart and transferring items...",
      );

      const items =
        data?.cart?.lines?.edges?.map((edge: any) => ({
          variantId: edge.node.merchandise.id,
          quantity: edge.node.quantity,
        })) || [];

      const { data: newCartData } = await client.request(`#graphql
        mutation CreateReplacementCart {
          cartCreate {
            cart {
              id
              checkoutUrl
            }
          }
        }
      `);

      const newCartId = newCartData?.cartCreate?.cart?.id;
      if (!newCartId) {
        throw new Error("Failed to create new cart");
      }

      if (items.length > 0) {
        console.log("Transferring items to new cart:", items);
        const { data: addItemsData } = await client.request(
          `#graphql
          mutation TransferItemsToCart($cartId: ID!, $lines: [CartLineInput!]!) {
            cartLinesAdd(cartId: $cartId, lines: $lines) {
              cart {
                checkoutUrl
              }
            }
          }
        `,
          {
            variables: {
              cartId: newCartId,
              lines: items.map((item) => ({
                merchandiseId: item.variantId,
                quantity: item.quantity,
              })),
            },
          },
        );

        return addItemsData?.cartLinesAdd?.cart?.checkoutUrl;
      }

      return newCartData?.cartCreate?.cart?.checkoutUrl;
    }

    return data.cart.checkoutUrl;
  } catch (error) {
    console.error("Get checkout URL failed:", error);
    throw error;
  }
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
