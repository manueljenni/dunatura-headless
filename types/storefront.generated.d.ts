/* eslint-disable eslint-comments/disable-enable-pair */
/* eslint-disable eslint-comments/no-unlimited-disable */
/* eslint-disable */
import type * as StorefrontTypes from './storefront.types';

export type GetAllProductsQueryVariables = StorefrontTypes.Exact<{ [key: string]: never; }>;


export type GetAllProductsQuery = { products: { edges: Array<{ node: (
        Pick<StorefrontTypes.Product, 'id' | 'title' | 'description' | 'handle' | 'tags'>
        & { priceRange: { minVariantPrice: Pick<StorefrontTypes.MoneyV2, 'amount' | 'currencyCode'>, maxVariantPrice: Pick<StorefrontTypes.MoneyV2, 'amount' | 'currencyCode'> }, images: { edges: Array<{ node: Pick<StorefrontTypes.Image, 'originalSrc' | 'altText'> }> }, variants: { edges: Array<{ node: Pick<StorefrontTypes.ProductVariant, 'id' | 'title' | 'availableForSale'> }> } }
      ) }> } };

export type CreateCartMutationVariables = StorefrontTypes.Exact<{
  input: StorefrontTypes.CartInput;
  country?: StorefrontTypes.InputMaybe<StorefrontTypes.CountryCode>;
  language?: StorefrontTypes.InputMaybe<StorefrontTypes.LanguageCode>;
}>;


export type CreateCartMutation = { cartCreate?: StorefrontTypes.Maybe<{ userErrors: Array<Pick<StorefrontTypes.CartUserError, 'message' | 'code' | 'field'>>, cart?: StorefrontTypes.Maybe<Pick<StorefrontTypes.Cart, 'id' | 'checkoutUrl'>> }> };

export type AddToCartMutationVariables = StorefrontTypes.Exact<{ [key: string]: never; }>;


export type AddToCartMutation = { cartLinesAdd?: StorefrontTypes.Maybe<{ cart?: StorefrontTypes.Maybe<Pick<StorefrontTypes.Cart, 'id'>> }> };

export type GetCartUrlQueryVariables = StorefrontTypes.Exact<{ [key: string]: never; }>;


export type GetCartUrlQuery = { cart?: StorefrontTypes.Maybe<Pick<StorefrontTypes.Cart, 'checkoutUrl'>> };

interface GeneratedQueryTypes {
  "#graphql\n        query GetAllProducts {\n          products(sortKey: TITLE, first: 250) {\n            edges {\n              node {\n                id\n                title\n                description\n                handle\n                priceRange {\n                  minVariantPrice {\n                    amount\n                    currencyCode\n                  }\n                  maxVariantPrice {\n                    amount\n                    currencyCode\n                  }\n                }\n                images(first: 1) {\n                  edges {\n                    node {\n                      originalSrc\n                      altText\n                    }\n                  }\n                }\n                variants(first: 1) {\n                  edges {\n                    node {\n                      id\n                      title\n                      availableForSale\n                    }\n                  }\n                }\n                tags\n              }\n            }\n          }\n        }\n      ": {return: GetAllProductsQuery, variables: GetAllProductsQueryVariables},
  "#graphql\n    query GetCartUrl {\n      cart(id: \"#REQUIRED_VAR=cartId\") {\n        checkoutUrl\n      }\n    }": {return: GetCartUrlQuery, variables: GetCartUrlQueryVariables},
}

interface GeneratedMutationTypes {
  "#graphql\n  mutation CreateCart($input: CartInput!, $country: CountryCode, $language: LanguageCode) \n  @inContext(country: $country, language: $language) {\n    cartCreate(input: $input) {\n      userErrors {\n        message\n        code\n        field\n      }\n      cart {\n        id\n        checkoutUrl\n      }\n    }\n  }\n": {return: CreateCartMutation, variables: CreateCartMutationVariables},
  "#graphql\n    mutation AddToCart {\n      cartLinesAdd(cartId: \"#REQUIRED_VAR=cartId\", lines: [{\n        quantity: 1,\n        merchandiseId: \"#REQUIRED_VAR=variantId\"\n      }]) {\n        cart {\n          id\n        }\n      }\n    }\n  ": {return: AddToCartMutation, variables: AddToCartMutationVariables},
}
declare module '@shopify/storefront-api-client' {
  type InputMaybe<T> = StorefrontTypes.InputMaybe<T>;
  interface StorefrontQueries extends GeneratedQueryTypes {}
  interface StorefrontMutations extends GeneratedMutationTypes {}
}
