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
        & { variants: { edges: Array<{ node: (
              Pick<StorefrontTypes.ProductVariant, 'id'>
              & { price: Pick<StorefrontTypes.MoneyV2, 'amount'>, sellingPlanAllocations: { edges: Array<{ node: { sellingPlan: (
                      Pick<StorefrontTypes.SellingPlan, 'id' | 'name' | 'description'>
                      & { options: Array<Pick<StorefrontTypes.SellingPlanOption, 'name' | 'value'>> }
                    ), priceAdjustments: Array<{ price: Pick<StorefrontTypes.MoneyV2, 'amount'>, compareAtPrice: Pick<StorefrontTypes.MoneyV2, 'amount'>, perDeliveryPrice: Pick<StorefrontTypes.MoneyV2, 'amount'> }> } }> } }
            ) }> } }
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

export type AddItemsToCartMutationVariables = StorefrontTypes.Exact<{
  cartId: StorefrontTypes.Scalars['ID']['input'];
  lines: Array<StorefrontTypes.CartLineInput> | StorefrontTypes.CartLineInput;
}>;


export type AddItemsToCartMutation = { cartLinesAdd?: StorefrontTypes.Maybe<{ cart?: StorefrontTypes.Maybe<(
      Pick<StorefrontTypes.Cart, 'id' | 'totalQuantity'>
      & { lines: { edges: Array<{ node: Pick<StorefrontTypes.CartLine, 'id' | 'quantity'> | Pick<StorefrontTypes.ComponentizableCartLine, 'id' | 'quantity'> }> } }
    )>, userErrors: Array<Pick<StorefrontTypes.CartUserError, 'field' | 'message' | 'code'>> }> };

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

export type GetCartQueryVariables = StorefrontTypes.Exact<{
  cartId: StorefrontTypes.Scalars['ID']['input'];
}>;


export type GetCartQuery = { cart?: StorefrontTypes.Maybe<(
    Pick<StorefrontTypes.Cart, 'id' | 'totalQuantity'>
    & { cost: { totalAmount: Pick<StorefrontTypes.MoneyV2, 'amount'> }, lines: { edges: Array<{ node: (
          Pick<StorefrontTypes.CartLine, 'id' | 'quantity'>
          & { cost: { totalAmount: Pick<StorefrontTypes.MoneyV2, 'amount'> }, merchandise: (
            Pick<StorefrontTypes.ProductVariant, 'id' | 'title'>
            & { product: Pick<StorefrontTypes.Product, 'title'> }
          ), sellingPlanAllocation?: StorefrontTypes.Maybe<{ sellingPlan: Pick<StorefrontTypes.SellingPlan, 'id' | 'name'> }>, attributes: Array<Pick<StorefrontTypes.Attribute, 'key' | 'value'>> }
        ) | (
          Pick<StorefrontTypes.ComponentizableCartLine, 'id' | 'quantity'>
          & { cost: { totalAmount: Pick<StorefrontTypes.MoneyV2, 'amount'> }, merchandise: (
            Pick<StorefrontTypes.ProductVariant, 'id' | 'title'>
            & { product: Pick<StorefrontTypes.Product, 'title'> }
          ), sellingPlanAllocation?: StorefrontTypes.Maybe<{ sellingPlan: Pick<StorefrontTypes.SellingPlan, 'id' | 'name'> }>, attributes: Array<Pick<StorefrontTypes.Attribute, 'key' | 'value'>> }
        ) }> } }
  )> };

interface GeneratedQueryTypes {
  "#graphql\n    query GetAllProductsWithMetafields {\n      products(sortKey: TITLE, first: 250) {\n        edges {\n          node {\n            id\n            title\n            description\n            handle\n            priceRange {\n              minVariantPrice {\n                amount\n                currencyCode\n              }\n            }\n            images(first: 1) {\n              edges {\n                node {\n                  originalSrc\n                }\n              }\n            }\n            variants(first: 1) {\n              edges {\n                node {\n                  id\n                  availableForSale\n                  price {\n                    amount\n                    currencyCode\n                  }\n                  unitPrice {\n                    amount\n                    currencyCode\n                  }\n                }\n              }\n            }\n            tags\n            ingredients: metafield(namespace: \"custom\", key: \"ingredients_product_list\") {\n              value\n            }\n          }\n        }\n      }\n    }\n  ": {return: GetAllProductsWithMetafieldsQuery, variables: GetAllProductsWithMetafieldsQueryVariables},
  "#graphql\n    query GetIngredients($id: ID!) {\n      product(id: $id) {\n        id\n        title\n        images(first: 1) {\n          edges {\n            node {\n              originalSrc\n            }\n          }\n        }\n      }\n    }\n  ": {return: GetIngredientsQuery, variables: GetIngredientsQueryVariables},
  "#graphql\n    query Products {\n      products(first: 50) {\n        edges {\n          node {\n            id\n            title\n            handle\n            description\n            tags\n            priceRange {\n              minVariantPrice {\n                amount\n                currencyCode\n              }\n              maxVariantPrice {\n                amount\n                currencyCode\n              }\n            }\n            images(first: 10) {\n              edges {\n                node {\n                  originalSrc\n                  altText\n                }\n              }\n            }\n            variants(first: 1) {\n              edges {\n                node {\n                  id\n                  title\n                  availableForSale\n                  price {\n                    amount\n                  }\n                  unitPrice {\n                    amount\n                  }\n                }\n              }\n            }\n            metafields(\n              identifiers: [\n                { namespace: \"custom\", key: \"ingredients_product_list\" }\n              ]\n            ) {\n              key\n              value\n            }\n          }\n        }\n      }\n    }": {return: ProductsQuery, variables: ProductsQueryVariables},
  "#graphql\n    query GetAllVitamins {\n      products(sortKey: TITLE, first: 250, query: \"available_for_sale:true AND product_type:'Rohstoff'\") {\n        edges {\n          node {\n            id\n            title\n            variants(first: 1) {\n              edges {\n                node {\n                  id\n                  price {\n                    amount\n                  }\n                  sellingPlanAllocations(first: 10) {\n                    edges {\n                      node {\n                        sellingPlan {\n                          id\n                          name\n                          description\n                          options {\n                            name\n                            value\n                          }\n                        }\n                        priceAdjustments {\n                          price {\n                            amount\n                          }\n                          compareAtPrice {\n                            amount\n                          }\n                          perDeliveryPrice {\n                            amount\n                          }\n                        }\n                      }\n                    }\n                  }\n                }\n              }\n            }\n          }\n        }\n      }\n    }\n  ": {return: GetAllVitaminsQuery, variables: GetAllVitaminsQueryVariables},
  "#graphql\n      query GetCartDetails($cartId: ID!) {\n        cart(id: $cartId) {\n          checkoutUrl\n          lines(first: 10) {\n            edges {\n              node {\n                quantity\n                merchandise {\n                  ... on ProductVariant {\n                    id\n                  }\n                }\n              }\n            }\n          }\n        }\n      }": {return: GetCartDetailsQuery, variables: GetCartDetailsQueryVariables},
  "#graphql\n    query GetCart($cartId: ID!) {\n      cart(id: $cartId) {\n        id\n        totalQuantity\n        cost {\n          totalAmount {\n            amount\n          }\n        }\n        lines(first: 100) {\n          edges {\n            node {\n              id\n              quantity\n              cost {\n                totalAmount {\n                  amount\n                }\n              }\n              merchandise {\n                ... on ProductVariant {\n                  id\n                  title\n                  product {\n                    title\n                  }\n                }\n              }\n              sellingPlanAllocation {\n                sellingPlan {\n                  id\n                  name\n                }\n              }\n              attributes {\n                key\n                value\n              }\n            }\n          }\n        }\n      }\n    }": {return: GetCartQuery, variables: GetCartQueryVariables},
}

interface GeneratedMutationTypes {
  "#graphql\n      mutation CreateNewCart {\n        cartCreate {\n          cart {\n            id\n            checkoutUrl\n            lines(first: 10) {\n              edges {\n                node {\n                  quantity\n                  merchandise {\n                    ... on ProductVariant {\n                      id\n                    }\n                  }\n                }\n              }\n            }\n          }\n        }\n      }\n    ": {return: CreateNewCartMutation, variables: CreateNewCartMutationVariables},
  "#graphql\n        mutation AddItemsToCart($cartId: ID!, $lines: [CartLineInput!]!) {\n          cartLinesAdd(cartId: $cartId, lines: $lines) {\n            cart {\n              id\n              totalQuantity\n              lines(first: 100) {\n                edges {\n                  node {\n                    id\n                    quantity\n                  }\n                }\n              }\n            }\n            userErrors {\n              field\n              message\n              code\n            }\n          }\n        }\n      ": {return: AddItemsToCartMutation, variables: AddItemsToCartMutationVariables},
  "#graphql\n        mutation CreateReplacementCart {\n          cartCreate {\n            cart {\n              id\n              checkoutUrl\n            }\n          }\n        }\n      ": {return: CreateReplacementCartMutation, variables: CreateReplacementCartMutationVariables},
  "#graphql\n          mutation TransferItemsToCart($cartId: ID!, $lines: [CartLineInput!]!) {\n            cartLinesAdd(cartId: $cartId, lines: $lines) {\n              cart {\n                checkoutUrl\n              }\n            }\n          }\n        ": {return: TransferItemsToCartMutation, variables: TransferItemsToCartMutationVariables},
}
declare module '@shopify/storefront-api-client' {
  type InputMaybe<T> = StorefrontTypes.InputMaybe<T>;
  interface StorefrontQueries extends GeneratedQueryTypes {}
  interface StorefrontMutations extends GeneratedMutationTypes {}
}
