"use client";

import { addItemsToCart, createCart, getCheckoutUrl } from "@/api/fetch";
import { createContext, useContext, useEffect, useState } from "react";

interface CartItem {
  variantId: string;
  quantity: number;
  sellingPlanId: number | null;
  title: string;
  price: number;
  image: string;
  properties: {
    _bundleId?: string;
    Name?: string;
    Protocol?: string;
    [key: string]: string | undefined;
  };
}

interface CartContextType {
  items: CartItem[];
  cartId: string | null;
  isLoading: boolean;
  addItem: (item: CartItem) => Promise<void>;
  removeItem: (variantId: string) => Promise<void>;
  updateQuantity: (variantId: string, quantity: number) => Promise<void>;
  clearCart: () => Promise<void>;
  checkout: () => Promise<void>;
}

const CartContext = createContext<CartContextType>({
  items: [],
  cartId: null,
  isLoading: false,
  addItem: async () => {},
  removeItem: async () => {},
  updateQuantity: async () => {},
  clearCart: async () => {},
  checkout: async () => {},
});

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [cartId, setCartId] = useState<string | null>(null);
  const [items, setItems] = useState<CartItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const initializeCart = async () => {
      try {
        const { cartId: newCartId } = await createCart();
        setCartId(newCartId);
      } catch (error) {
        console.error("Failed to initialize cart:", error);
      } finally {
        setIsLoading(false);
      }
    };

    if (!cartId) {
      initializeCart();
    }
  }, [cartId]);

  const addItem = async (item: CartItem) => {
    if (!cartId) return;

    setIsLoading(true);
    try {
      const cartItems = [
        {
          id: item.variantId,
          quantity: item.quantity,
          selling_plan: item.sellingPlanId,
          properties: item.properties,
        },
      ];

      await addItemsToCart(cartId, cartItems);
      setItems((prev) => [...prev, item]);
    } finally {
      setIsLoading(false);
    }
  };

  const updateQuantity = async (variantId: string, quantity: number) => {
    if (!cartId) return;

    setIsLoading(true);
    try {
      const cartItems = [
        {
          id: variantId,
          quantity,
          selling_plan:
            items.find((item) => item.variantId === variantId)?.sellingPlanId || null,
          properties:
            items.find((item) => item.variantId === variantId)?.properties || {},
        },
      ];

      await addItemsToCart(cartId, cartItems);
      setItems((prev) =>
        prev.map((item) => (item.variantId === variantId ? { ...item, quantity } : item)),
      );
    } finally {
      setIsLoading(false);
    }
  };

  const clearCart = async () => {
    setIsLoading(true);
    try {
      const { cartId: newCartId } = await createCart();
      setCartId(newCartId);
      setItems([]);
    } finally {
      setIsLoading(false);
    }
  };

  const checkout = async () => {
    if (!cartId) return;
    const checkoutUrl = await getCheckoutUrl(cartId);
    window.location.href = checkoutUrl;
  };

  return (
    <CartContext.Provider
      value={{
        items,
        cartId,
        isLoading,
        addItem,
        removeItem: async () => {},
        updateQuantity,
        clearCart,
        checkout,
      }}>
      {children}
    </CartContext.Provider>
  );
}

export const useCart = () => useContext(CartContext);
