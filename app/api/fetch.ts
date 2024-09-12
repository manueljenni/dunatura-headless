import { createStorefrontApiClient } from "@shopify/storefront-api-client";

const storeDomain = process.env.SHOPIFY_STORE_DOMAIN!;
const publicAccessToken = process.env.SHOPIFY_STOREFRONT_ACCESS_TOKEN!;

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
  return data.products.edges.map((edge) => edge.node);
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

  const { data } = await client.request(cartCreateMutation, {
    variables: {
      input: {},
      country: "JP",
      language: "JA",
    },
  });

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

export async function getCartUrl(cartId: string) {
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
