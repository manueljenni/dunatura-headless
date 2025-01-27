/* eslint-disable eslint-comments/disable-enable-pair */
/* eslint-disable eslint-comments/no-unlimited-disable */
/* eslint-disable */
import type * as StorefrontTypes from './storefront.types';

export type GetAllProductsWithMetafieldsQueryVariables = StorefrontTypes.Exact<{ [key: string]: never; }>;


export type GetAllProductsWithMetafieldsQuery = { products: { edges: Array<{ node: (
        Pick<StorefrontTypes.Product, 'id' | 'title' | 'description' | 'handle' | 'tags'>
        & { priceRange: { minVariantPrice: Pick<StorefrontTypes.MoneyV2, 'amount' | 'currencyCode'> }, images: { edges: Array<{ node: Pick<StorefrontTypes.Image, 'originalSrc'> }> }, variants: { edges: Array<{ node: (
              Pick<StorefrontTypes.ProductVariant, 'id' | 'availableForSale'>
              & { price: Pick<StorefrontTypes.MoneyV2, 'amount' | 'currencyCode'>, unitPrice?: StorefrontTypes.Maybe<Pick<StorefrontTypes.MoneyV2, 'amount' | 'currencyCode'>> }
            ) }> }, ingredients?: StorefrontTypes.Maybe<Pick<StorefrontTypes.Metafield, 'value'>> }
      ) }> } };

export type GetIngredientsQueryVariables = StorefrontTypes.Exact<{
  id: StorefrontTypes.Scalars['ID']['input'];
}>;


export type GetIngredientsQuery = { product?: StorefrontTypes.Maybe<(
    Pick<StorefrontTypes.Product, 'id' | 'title'>
    & { images: { edges: Array<{ node: Pick<StorefrontTypes.Image, 'originalSrc'> }> } }
  )> };

export type ProductsQueryVariables = StorefrontTypes.Exact<{ [key: string]: never; }>;


export type ProductsQuery = { products: { edges: Array<{ node: (
        Pick<StorefrontTypes.Product, 'id' | 'title' | 'handle' | 'description' | 'tags'>
        & { priceRange: { minVariantPrice: Pick<StorefrontTypes.MoneyV2, 'amount' | 'currencyCode'>, maxVariantPrice: Pick<StorefrontTypes.MoneyV2, 'amount' | 'currencyCode'> }, images: { edges: Array<{ node: Pick<StorefrontTypes.Image, 'originalSrc' | 'altText'> }> }, variants: { edges: Array<{ node: (
              Pick<StorefrontTypes.ProductVariant, 'id' | 'title' | 'availableForSale'>
              & { price: Pick<StorefrontTypes.MoneyV2, 'amount'>, unitPrice?: StorefrontTypes.Maybe<Pick<StorefrontTypes.MoneyV2, 'amount'>> }
            ) }> }, metafields: Array<StorefrontTypes.Maybe<Pick<StorefrontTypes.Metafield, 'key' | 'value'>>> }
      ) }> } };

export type GetAllVitaminsQueryVariables = StorefrontTypes.Exact<{ [key: string]: never; }>;


export type GetAllVitaminsQuery = { products: { edges: Array<{ node: (
        Pick<StorefrontTypes.Product, 'id' | 'title'>
        & { images: { edges: Array<{ node: Pick<StorefrontTypes.Image, 'originalSrc'> }> } }
      ) }> } };

export type CreateNewCartMutationVariables = StorefrontTypes.Exact<{ [key: string]: never; }>;


export type CreateNewCartMutation = { cartCreate?: StorefrontTypes.Maybe<{ cart?: StorefrontTypes.Maybe<(
      Pick<StorefrontTypes.Cart, 'id' | 'checkoutUrl'>
      & { lines: { edges: Array<{ node: (
            Pick<StorefrontTypes.CartLine, 'quantity'>
            & { merchandise: Pick<StorefrontTypes.ProductVariant, 'id'> }
          ) | (
            Pick<StorefrontTypes.ComponentizableCartLine, 'quantity'>
            & { merchandise: Pick<StorefrontTypes.ProductVariant, 'id'> }
          ) }> } }
    )> }> };

export type AddItemToCartMutationVariables = StorefrontTypes.Exact<{
  cartId: StorefrontTypes.Scalars['ID']['input'];
  lines: Array<StorefrontTypes.CartLineInput> | StorefrontTypes.CartLineInput;
}>;


export type AddItemToCartMutation = { cartLinesAdd?: StorefrontTypes.Maybe<{ cart?: StorefrontTypes.Maybe<(
      Pick<StorefrontTypes.Cart, 'id'>
      & { lines: { edges: Array<{ node: (
            Pick<StorefrontTypes.CartLine, 'quantity'>
            & { merchandise: Pick<StorefrontTypes.ProductVariant, 'id'> }
          ) | (
            Pick<StorefrontTypes.ComponentizableCartLine, 'quantity'>
            & { merchandise: Pick<StorefrontTypes.ProductVariant, 'id'> }
          ) }> } }
    )>, userErrors: Array<Pick<StorefrontTypes.CartUserError, 'field' | 'message'>> }> };

export type GetCartDetailsQueryVariables = StorefrontTypes.Exact<{
  cartId: StorefrontTypes.Scalars['ID']['input'];
}>;


export type GetCartDetailsQuery = { cart?: StorefrontTypes.Maybe<(
    Pick<StorefrontTypes.Cart, 'checkoutUrl'>
    & { lines: { edges: Array<{ node: (
          Pick<StorefrontTypes.CartLine, 'quantity'>
          & { merchandise: Pick<StorefrontTypes.ProductVariant, 'id'> }
        ) | (
          Pick<StorefrontTypes.ComponentizableCartLine, 'quantity'>
          & { merchandise: Pick<StorefrontTypes.ProductVariant, 'id'> }
        ) }> } }
  )> };

export type CreateReplacementCartMutationVariables = StorefrontTypes.Exact<{ [key: string]: never; }>;


export type CreateReplacementCartMutation = { cartCreate?: StorefrontTypes.Maybe<{ cart?: StorefrontTypes.Maybe<Pick<StorefrontTypes.Cart, 'id' | 'checkoutUrl'>> }> };

export type TransferItemsToCartMutationVariables = StorefrontTypes.Exact<{
  cartId: StorefrontTypes.Scalars['ID']['input'];
  lines: Array<StorefrontTypes.CartLineInput> | StorefrontTypes.CartLineInput;
}>;


export type TransferItemsToCartMutation = { cartLinesAdd?: StorefrontTypes.Maybe<{ cart?: StorefrontTypes.Maybe<Pick<StorefrontTypes.Cart, 'checkoutUrl'>> }> };

interface GeneratedQueryTypes {
  "#graphql\n    query GetAllProductsWithMetafields {\n      products(sortKey: TITLE, first: 250) {\n        edges {\n          node {\n            id\n            title\n            description\n            handle\n            priceRange {\n              minVariantPrice {\n                amount\n                currencyCode\n              }\n            }\n            images(first: 1) {\n              edges {\n                node {\n                  originalSrc\n                }\n              }\n            }\n            variants(first: 1) {\n              edges {\n                node {\n                  id\n                  availableForSale\n                  price {\n                    amount\n                    currencyCode\n                  }\n                  unitPrice {\n                    amount\n                    currencyCode\n                  }\n                }\n              }\n            }\n            tags\n            ingredients: metafield(namespace: \"custom\", key: \"ingredients_product_list\") {\n              value\n            }\n          }\n        }\n      }\n    }\n  ": {return: GetAllProductsWithMetafieldsQuery, variables: GetAllProductsWithMetafieldsQueryVariables},
  "#graphql\n    query GetIngredients($id: ID!) {\n      product(id: $id) {\n        id\n        title\n        images(first: 1) {\n          edges {\n            node {\n              originalSrc\n            }\n          }\n        }\n      }\n    }\n  ": {return: GetIngredientsQuery, variables: GetIngredientsQueryVariables},
  "#graphql\n    query Products {\n      products(first: 50) {\n        edges {\n          node {\n            id\n            title\n            handle\n            description\n            tags\n            priceRange {\n              minVariantPrice {\n                amount\n                currencyCode\n              }\n              maxVariantPrice {\n                amount\n                currencyCode\n              }\n            }\n            images(first: 10) {\n              edges {\n                node {\n                  originalSrc\n                  altText\n                }\n              }\n            }\n            variants(first: 1) {\n              edges {\n                node {\n                  id\n                  title\n                  availableForSale\n                  price {\n                    amount\n                  }\n                  unitPrice {\n                    amount\n                  }\n                }\n              }\n            }\n            metafields(\n              identifiers: [\n                { namespace: \"custom\", key: \"ingredients_product_list\" }\n              ]\n            ) {\n              key\n              value\n            }\n          }\n        }\n      }\n    }": {return: ProductsQuery, variables: ProductsQueryVariables},
  "#graphql\n    query GetAllVitamins {\n      products(sortKey: TITLE, first: 250, query: \"available_for_sale:true AND product_type:'Rohstoff'\") {\n        edges {\n          node {\n            id\n            title\n            images(first: 10) {\n              edges {\n                node {\n                  originalSrc\n                }\n              }\n            }\n          }\n        }\n      }\n    }\n  ": {return: GetAllVitaminsQuery, variables: GetAllVitaminsQueryVariables},
  "#graphql\n      query GetCartDetails($cartId: ID!) {\n        cart(id: $cartId) {\n          checkoutUrl\n          lines(first: 10) {\n            edges {\n              node {\n                quantity\n                merchandise {\n                  ... on ProductVariant {\n                    id\n                  }\n                }\n              }\n            }\n          }\n        }\n      }": {return: GetCartDetailsQuery, variables: GetCartDetailsQueryVariables},
}

interface GeneratedMutationTypes {
  "#graphql\n      mutation CreateNewCart {\n        cartCreate {\n          cart {\n            id\n            checkoutUrl\n            lines(first: 10) {\n              edges {\n                node {\n                  quantity\n                  merchandise {\n                    ... on ProductVariant {\n                      id\n                    }\n                  }\n                }\n              }\n            }\n          }\n        }\n      }\n    ": {return: CreateNewCartMutation, variables: CreateNewCartMutationVariables},
  "#graphql\n      mutation AddItemToCart($cartId: ID!, $lines: [CartLineInput!]!) {\n        cartLinesAdd(cartId: $cartId, lines: $lines) {\n          cart {\n            id\n            lines(first: 10) {\n              edges {\n                node {\n                  quantity\n                  merchandise {\n                    ... on ProductVariant {\n                      id\n                    }\n                  }\n                }\n              }\n            }\n          }\n          userErrors {\n            field\n            message\n          }\n        }\n      }\n    ": {return: AddItemToCartMutation, variables: AddItemToCartMutationVariables},
  "#graphql\n        mutation CreateReplacementCart {\n          cartCreate {\n            cart {\n              id\n              checkoutUrl\n            }\n          }\n        }\n      ": {return: CreateReplacementCartMutation, variables: CreateReplacementCartMutationVariables},
  "#graphql\n          mutation TransferItemsToCart($cartId: ID!, $lines: [CartLineInput!]!) {\n            cartLinesAdd(cartId: $cartId, lines: $lines) {\n              cart {\n                checkoutUrl\n              }\n            }\n          }\n        ": {return: TransferItemsToCartMutation, variables: TransferItemsToCartMutationVariables},
}
declare module '@shopify/storefront-api-client' {
  type InputMaybe<T> = StorefrontTypes.InputMaybe<T>;
  interface StorefrontQueries extends GeneratedQueryTypes {}
  interface StorefrontMutations extends GeneratedMutationTypes {}
}
