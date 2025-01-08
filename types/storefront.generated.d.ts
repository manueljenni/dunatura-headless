/* eslint-disable eslint-comments/disable-enable-pair */
/* eslint-disable eslint-comments/no-unlimited-disable */
/* eslint-disable */
import type * as StorefrontTypes from './storefront.types';

export type GetAllProductsWithMetafieldsQueryVariables = StorefrontTypes.Exact<{ [key: string]: never; }>;


export type GetAllProductsWithMetafieldsQuery = { products: { edges: Array<{ node: (
        Pick<StorefrontTypes.Product, 'id' | 'title' | 'description' | 'handle' | 'tags'>
        & { priceRange: { minVariantPrice: Pick<StorefrontTypes.MoneyV2, 'amount' | 'currencyCode'>, maxVariantPrice: Pick<StorefrontTypes.MoneyV2, 'amount' | 'currencyCode'> }, variants: { edges: Array<{ node: (
              Pick<StorefrontTypes.ProductVariant, 'id' | 'title' | 'availableForSale'>
              & { unitPrice?: StorefrontTypes.Maybe<Pick<StorefrontTypes.MoneyV2, 'amount' | 'currencyCode'>>, unitPriceMeasurement?: StorefrontTypes.Maybe<Pick<StorefrontTypes.UnitPriceMeasurement, 'referenceUnit' | 'referenceValue' | 'quantityUnit' | 'quantityValue'>> }
            ) }> }, ingredients?: StorefrontTypes.Maybe<Pick<StorefrontTypes.Metafield, 'value'>>, shortDescription?: StorefrontTypes.Maybe<Pick<StorefrontTypes.Metafield, 'value'>> }
      ) }> } };

export type GetIngredientsQueryVariables = StorefrontTypes.Exact<{
  id: StorefrontTypes.Scalars['ID']['input'];
}>;


export type GetIngredientsQuery = { product?: StorefrontTypes.Maybe<(
    Pick<StorefrontTypes.Product, 'id' | 'title'>
    & { images: { edges: Array<{ node: Pick<StorefrontTypes.Image, 'originalSrc'> }> } }
  )> };

export type GetAllProductsQueryVariables = StorefrontTypes.Exact<{ [key: string]: never; }>;


export type GetAllProductsQuery = { products: { edges: Array<{ node: (
        Pick<StorefrontTypes.Product, 'id' | 'title' | 'description' | 'handle' | 'tags'>
        & { priceRange: { minVariantPrice: Pick<StorefrontTypes.MoneyV2, 'amount' | 'currencyCode'>, maxVariantPrice: Pick<StorefrontTypes.MoneyV2, 'amount' | 'currencyCode'> }, images: { edges: Array<{ node: Pick<StorefrontTypes.Image, 'originalSrc' | 'altText'> }> }, variants: { edges: Array<{ node: Pick<StorefrontTypes.ProductVariant, 'id' | 'title' | 'availableForSale'> }> }, metafield?: StorefrontTypes.Maybe<{ reference?: StorefrontTypes.Maybe<{ image?: StorefrontTypes.Maybe<Pick<StorefrontTypes.Image, 'originalSrc'>> }> }> }
      ) }> } };

export type CartCreateMutationVariables = StorefrontTypes.Exact<{
  input: StorefrontTypes.CartInput;
  country?: StorefrontTypes.InputMaybe<StorefrontTypes.CountryCode>;
  language?: StorefrontTypes.InputMaybe<StorefrontTypes.LanguageCode>;
}>;


export type CartCreateMutation = { cartCreate?: StorefrontTypes.Maybe<{ userErrors: Array<Pick<StorefrontTypes.CartUserError, 'message' | 'code' | 'field'>>, cart?: StorefrontTypes.Maybe<Pick<StorefrontTypes.Cart, 'id' | 'checkoutUrl'>> }> };

export type CartLinesAddMutationVariables = StorefrontTypes.Exact<{
  cartId: StorefrontTypes.Scalars['ID']['input'];
  variantId: StorefrontTypes.Scalars['ID']['input'];
}>;


export type CartLinesAddMutation = { cartLinesAdd?: StorefrontTypes.Maybe<{ cart?: StorefrontTypes.Maybe<Pick<StorefrontTypes.Cart, 'id'>> }> };

export type GetCartQueryVariables = StorefrontTypes.Exact<{ [key: string]: never; }>;


export type GetCartQuery = { cart?: StorefrontTypes.Maybe<Pick<StorefrontTypes.Cart, 'checkoutUrl'>> };

interface GeneratedQueryTypes {
  "#graphql\n        query GetAllProductsWithMetafields {\n          products(sortKey: TITLE, first: 250) {\n            edges {\n              node {\n                id\n                title\n                description\n                handle\n                priceRange {\n                  minVariantPrice {\n                    amount\n                    currencyCode\n                  }\n                  maxVariantPrice {\n                    amount\n                    currencyCode\n                  }\n                }\n                variants(first: 1) {\n                  edges {\n                    node {\n                      id\n                      title\n                      availableForSale\n                      unitPrice {\n                        amount\n                        currencyCode\n                      }\n                      unitPriceMeasurement {\n                        referenceUnit\n                        referenceValue\n                        quantityUnit\n                        quantityValue\n                      }\n                    }\n                  }\n                }\n                tags\n                ingredients: metafield(namespace: \"custom\", key: \"ingredients_product_list\") {\n                  value\n                }\n                shortDescription: metafield(namespace: \"product\", key: \"short_desc\") {\n                  value\n                }\n              }\n            }\n          }\n        }\n      ": {return: GetAllProductsWithMetafieldsQuery, variables: GetAllProductsWithMetafieldsQueryVariables},
  "#graphql\n    query GetIngredients($id: ID!) {\n      product(id: $id) {\n        id\n        title\n        images(first: 1) {\n          edges {\n            node {\n              originalSrc\n            }\n          }\n        }\n      }\n    }\n  ": {return: GetIngredientsQuery, variables: GetIngredientsQueryVariables},
  "#graphql\n        query GetAllProducts {\n          products(sortKey: TITLE, first: 250, query: \"available_for_sale:true\") {\n            edges {\n              node {\n                id\n                title\n                description\n                handle\n                priceRange {\n                  minVariantPrice {\n                    amount\n                    currencyCode\n                  }\n                  maxVariantPrice {\n                    amount\n                    currencyCode\n                  }\n                }\n                images(first: 1) {\n                  edges {\n                    node {\n                      originalSrc\n                      altText\n                    }\n                  }\n                }\n                variants(first: 1) {\n                  edges {\n                    node {\n                      id\n                      title\n                      availableForSale\n                    }\n                  }\n                }\n                tags\n                metafield(namespace: \"custom\", key: \"cover_image\") {\n                  reference {\n                    ... on MediaImage {\n                      image {\n                        originalSrc\n                      }\n                    }\n                  }\n                }\n              }\n            }\n          }\n        }\n      ": {return: GetAllProductsQuery, variables: GetAllProductsQueryVariables},
  "#graphql\n    query GetCart {\n      cart(id: \"#REQUIRED_VAR=cartId\") {\n        checkoutUrl\n      }\n    }": {return: GetCartQuery, variables: GetCartQueryVariables},
}

interface GeneratedMutationTypes {
  "#graphql\n  mutation CartCreate($input: CartInput!, $country: CountryCode, $language: LanguageCode) \n  @inContext(country: $country, language: $language) {\n    cartCreate(input: $input) {\n      userErrors {\n        message\n        code\n        field\n      }\n      cart {\n        id\n        checkoutUrl\n      }\n    }\n  }\n": {return: CartCreateMutation, variables: CartCreateMutationVariables},
  "#graphql\n    mutation CartLinesAdd($cartId: ID!, $variantId: ID!) {\n      cartLinesAdd(cartId: $cartId, lines: [{\n        quantity: 1,\n        merchandiseId: $variantId\n      }]) {\n        cart {\n          id\n        }\n      }\n    }\n  ": {return: CartLinesAddMutation, variables: CartLinesAddMutationVariables},
}
declare module '@shopify/storefront-api-client' {
  type InputMaybe<T> = StorefrontTypes.InputMaybe<T>;
  interface StorefrontQueries extends GeneratedQueryTypes {}
  interface StorefrontMutations extends GeneratedMutationTypes {}
}
