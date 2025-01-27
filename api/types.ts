export type Ingredient = {
  shopifyId: string;
  title: string;
  image: string;
};

export interface ShopifyOrder {
  id: string;
  orderNumber: number;
  email: string;
  createdAt: string;
  totalPrice: string;
  customer?: {
    firstName: string;
    lastName: string;
    email: string;
  };
  lineItems: {
    edges: Array<{
      node: {
        title: string;
        quantity: number;
        originalTotalPrice: {
          amount: string;
        };
      };
    }>;
  };
  fulfillmentStatus: string;
  financialStatus: string;
}
