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
        ingredients: ingredients as Ingredient[],
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
  const { data } = await client.request(
    `#graphql
    query Products {
      products(first: 50) {
        edges {
          node {
            id
            title
            handle
            description
            tags
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
            images(first: 10) {
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
                  price {
                    amount
                  }
                  unitPrice {
                    amount
                  }
                }
              }
            }
            metafields(
              identifiers: [
                { namespace: "custom", key: "ingredients_product_list" }
              ]
            ) {
              key
              value
            }
          }
        }
      }
    }`,
  );

  const products = await Promise.all(
    data?.products.edges.map(async (edge) => {
      const ingredientsMetafield = edge.node.metafields.find(
        (metafield) => metafield?.key === "ingredients_product_list",
      );

      const ingredientsIds: string[] = ingredientsMetafield
        ? JSON.parse(ingredientsMetafield.value)
        : [];

      const ingredients = await Promise.all(
        ingredientsIds.map(async (id) => getIngredients(id)),
      );

      return {
        id: edge.node.id,
        title: edge.node.title,
        handle: edge.node.handle,
        description: edge.node.description,
        tags: edge.node.tags,
        priceRange: edge.node.priceRange,
        shopifyId: edge.node.variants.edges[0].node.id,
        price: parseFloat(edge.node.variants.edges[0].node.price.amount),
        pricePer100g: parseFloat(
          edge.node.variants.edges[0].node.unitPrice?.amount || "0",
        ),
        images: edge.node.images,
        variants: edge.node.variants,
        ingredients,
      };
    }) || [],
  );

  return products;
}

export type Product = Awaited<ReturnType<typeof getAllProducts>>[number];

export async function getAllVitamins() {
  const { data } = await client.request(`#graphql
    query GetAllVitamins {
      products(sortKey: TITLE, first: 250, query: "available_for_sale:true AND product_type:'Rohstoff'") {
        edges {
          node {
            id
            title
            variants(first: 1) {
              edges {
                node {
                  id
                  price {
                    amount
                  }
                  sellingPlanAllocations(first: 10) {
                    edges {
                      node {
                        sellingPlan {
                          id
                          name
                          description
                          options {
                            name
                            value
                          }
                        }
                        priceAdjustments {
                          price {
                            amount
                          }
                          compareAtPrice {
                            amount
                          }
                          perDeliveryPrice {
                            amount
                          }
                        }
                      }
                    }
                  }
                }
              }
            }
          }
        }
      }
    }
  `);

  return data?.products.edges.map((edge) => edge.node);
}

export async function createCart() {
  try {
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

interface CartLineProperties {
  _bundleId?: string;
  Name?: string;
  Protocol?: string;
}

interface CartItem {
  id: string;
  quantity: number;
  selling_plan: number | null;
  properties: CartLineProperties;
}

export async function addItemsToCart(cartId: string, items: CartItem[]) {
  try {
    const validItems = items.filter((item) => item.quantity > 0);
    const lines = validItems.map((item) => ({
      merchandiseId: item.id.startsWith("gid://")
        ? item.id
        : `gid://shopify/ProductVariant/${item.id}`,
      quantity: item.quantity,
      sellingPlanId: item.selling_plan
        ? `gid://shopify/SellingPlan/${item.selling_plan}`
        : undefined,
      attributes: Object.entries(item.properties).map(([key, value]) => ({
        key,
        value: String(value),
      })),
    }));

    console.log("Adding items to cart:", { cartId, lines });

    try {
      const { data, errors } = await client.request(
        `#graphql
        mutation AddItemsToCart($cartId: ID!, $lines: [CartLineInput!]!) {
          cartLinesAdd(cartId: $cartId, lines: $lines) {
            cart {
              id
              totalQuantity
              lines(first: 100) {
                edges {
                  node {
                    id
                    quantity
                  }
                }
              }
            }
            userErrors {
              field
              message
              code
            }
          }
        }
      `,
        {
          variables: {
            cartId,
            lines,
          },
        },
      );

      console.log("GraphQL errors:", errors);
      console.log("Raw response:", { data, errors });

      if (errors) {
        throw new Error(`GraphQL Errors: ${JSON.stringify(errors)}`);
      }

      const cart = data?.cartLinesAdd?.cart;
      if (!cart) {
        throw new Error("Cart data missing from response");
      }

      return cart;
    } catch (graphqlError) {
      console.error("GraphQL request failed:", graphqlError);
      throw graphqlError;
    }
  } catch (error) {
    console.error("Add to cart failed:", error);
    throw error;
  }
}

export async function getCheckoutUrl(cartId: string) {
  try {
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

    if (!data?.cart?.checkoutUrl) {
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

export async function getCart(cartId: string) {
  try {
    const { data } = await client.request(
      `#graphql
      query GetCart($cartId: ID!) {
        cart(id: $cartId) {
          id
          lines(first: 100) {
            edges {
              node {
                id
                quantity
                merchandise {
                  ... on ProductVariant {
                    id
                    price {
                      amount
                    }
                    image {
                      url
                    }
                    product {
                      title
                    }
                  }
                }
                sellingPlan {
                  id
                }
                attributes {
                  key
                  value
                }
              }
            }
          }
        }
      }
      `,
      {
        variables: {
          cartId: `gid://shopify/Cart/${cartId}`,
        },
      },
    );

    if (!data?.cart) {
      // Cart not found or expired, return null so CartContext can create a new one
      return null;
    }

    return data.cart;
  } catch (error) {
    console.error("Failed to get cart:", error);
    return null;
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
//     `
