"use client";

import { createContext, useContext, useEffect, useState } from "react";

interface CartItem {
  variantId: string;
  quantity: number;
}

interface CartContextType {
  items: CartItem[];
  addItem: (variantId: string) => Promise<void>;
  removeItem: (variantId: string) => Promise<void>;
  updateQuantity: (variantId: string, quantity: number) => Promise<void>;
  cartId: string | null;
  checkoutUrl: string | null;
  checkout: () => Promise<void>;
  clearCart: () => void;
}

const CartContext = createContext<CartContextType | null>(null);

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([]);
  const [cartId, setCartId] = useState<string | null>(null);
  const [checkoutUrl, setCheckoutUrl] = useState<string | null>(null);

  useEffect(() => {
    console.log("CartContext mounted");
    // Load cart from localStorage
    const savedCart = localStorage.getItem("cart");
    const savedCartId = localStorage.getItem("cartId");

    console.log("Initial localStorage state:", { savedCart, savedCartId });

    if (savedCart) {
      setItems(JSON.parse(savedCart));
    }
    if (savedCartId) {
      setCartId(savedCartId);
      console.log("Setting cartId from localStorage:", savedCartId);
    }
  }, []);

  useEffect(() => {
    console.log("cartId changed:", cartId);
  }, [cartId]);

  const addItem = async (variantId: string) => {
    try {
      if (!cartId) {
        console.log("No cartId, creating new cart...");
        const response = await fetch("/api/cart/create", { method: "POST" });
        const data = await response.json();
        console.log("Cart creation response:", data);

        // Ensure cartId is a string
        const newCartId =
          typeof data.cartId === "object" ? data.cartId.toString() : data.cartId;
        console.log("Processed cartId:", newCartId);

        setCartId(newCartId);
        setCheckoutUrl(data.checkoutUrl);
        localStorage.setItem("cartId", newCartId);
      }

      await fetch("/api/cart/add", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          cartId: cartId,
          variantId,
        }),
      });

      const newItems = [...items, { variantId, quantity: 1 }];
      setItems(newItems);
      localStorage.setItem("cart", JSON.stringify(newItems));
    } catch (error) {
      console.error("Failed to add item to cart:", error);
    }
  };

  const removeItem = async (variantId: string) => {
    try {
      await fetch("/api/cart/remove", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ cartId, variantId }),
      });

      const newItems = items.filter((item) => item.variantId !== variantId);
      setItems(newItems);
      localStorage.setItem("cart", JSON.stringify(newItems));
    } catch (error) {
      console.error("Failed to remove item from cart:", error);
    }
  };

  const updateQuantity = async (variantId: string, quantity: number) => {
    try {
      await fetch("/api/cart/update", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ cartId, variantId, quantity }),
      });

      const newItems = items.map((item) =>
        item.variantId === variantId ? { ...item, quantity } : item,
      );
      setItems(newItems);
      localStorage.setItem("cart", JSON.stringify(newItems));
    } catch (error) {
      console.error("Failed to update cart item:", error);
    }
  };

  const checkout = async () => {
    try {
      if (!cartId) return;

      const response = await fetch(`/api/cart/checkout`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          cartId: cartId,
        }),
      });

      const { checkoutUrl: url } = await response.json();
      if (url) {
        const successUrl = `${window.location.origin}/checkout/success?status=success`;
        const checkoutUrlWithCallback = `${url}&return_to=${encodeURIComponent(successUrl)}`;
        window.location.href = checkoutUrlWithCallback;
      }
    } catch (error) {
      console.error("Failed to checkout:", error);
    }
  };

  const clearCart = () => {
    setItems([]);
    setCartId(null);
    setCheckoutUrl(null);
    localStorage.removeItem("cart");
    localStorage.removeItem("cartId");
  };

  console.log(cartId);

  return (
    <CartContext.Provider
      value={{
        items,
        addItem,
        removeItem,
        updateQuantity,
        cartId,
        checkoutUrl,
        checkout,
        clearCart,
      }}>
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error("useCart must be used within a CartProvider");
  }
  return context;
}
