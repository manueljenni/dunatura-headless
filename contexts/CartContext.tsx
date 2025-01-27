"use client";

import { createContext, useContext, useEffect, useState } from "react";

interface CartItem {
  variantId: string;
  quantity: number;
  title: string;
  image: string;
  price: number;
}

interface ShopifyCartInput {
  merchandiseId: string;
  quantity: number;
}

interface CartContextType {
  items: CartItem[];
  addItem: (item: Omit<CartItem, "quantity">) => Promise<void>;
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

  // Debug logging for state changes
  useEffect(() => {
    console.log("Cart items changed:", items);
  }, [items]);

  useEffect(() => {
    console.log("Cart ID changed:", cartId);
  }, [cartId]);

  // Initial load from localStorage
  useEffect(() => {
    console.log("CartProvider mounted, loading from localStorage");
    const savedCart = localStorage.getItem("cart");
    const savedCartId = localStorage.getItem("cartId");

    console.log("localStorage state:", { savedCart, savedCartId });

    if (savedCart) {
      const parsedCart = JSON.parse(savedCart);
      console.log("Setting items from localStorage:", parsedCart);
      setItems(parsedCart);
    }
    if (savedCartId) {
      console.log("Setting cartId from localStorage:", savedCartId);
      setCartId(savedCartId);
    }
  }, []);

  const addItem = async (newItem: Omit<CartItem, "quantity">) => {
    try {
      console.log("Adding item to cart:", newItem);
      let currentCartId = cartId;

      if (!currentCartId) {
        console.log("No cartId, creating new cart");
        const response = await fetch("/api/cart/create", { method: "POST" });
        const data = await response.json();
        console.log("Cart creation response:", data);

        currentCartId =
          typeof data.cartId === "object" ? data.cartId.toString() : data.cartId;
        console.log("Processed new cartId:", currentCartId);

        setCartId(currentCartId);
        setCheckoutUrl(data.checkoutUrl);
        if (currentCartId) {
          localStorage.setItem("cartId", currentCartId);
        }
      }

      // Send only necessary data to Shopify
      const shopifyCartInput: ShopifyCartInput = {
        merchandiseId: newItem.variantId,
        quantity: 1,
      };

      console.log("Making API request to add item", shopifyCartInput);
      const response = await fetch("/api/cart/add", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          cartId: currentCartId,
          variantId: shopifyCartInput.merchandiseId,
        }),
      });
      const data = await response.json();
      console.log("Add to cart API response:", data);

      // Handle local cart state with full metadata
      const existingItem = items.find((item) => item.variantId === newItem.variantId);

      if (existingItem) {
        console.log("Updating existing item quantity");
        const newItems = items.map((item) =>
          item.variantId === newItem.variantId
            ? { ...item, quantity: item.quantity + 1 }
            : item,
        );
        console.log("New items state:", newItems);
        setItems(newItems);
        localStorage.setItem("cart", JSON.stringify(newItems));
      } else {
        console.log("Adding new item to cart");
        const newItems = [...items, { ...newItem, quantity: 1 }];
        console.log("New items state:", newItems);
        setItems(newItems);
        localStorage.setItem("cart", JSON.stringify(newItems));
      }
    } catch (error) {
      console.error("Failed to add item to cart:", error);
      throw error;
    }
  };

  const removeItem = async (variantId: string) => {
    try {
      console.log("Removing item from cart:", variantId);

      await fetch("/api/cart/remove", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ cartId, variantId }),
      });

      const newItems = items.filter((item) => item.variantId !== variantId);
      console.log("New items state after removal:", newItems);
      setItems(newItems);
      localStorage.setItem("cart", JSON.stringify(newItems));
    } catch (error) {
      console.error("Failed to remove item from cart:", error);
      throw error;
    }
  };

  const updateQuantity = async (variantId: string, quantity: number) => {
    try {
      console.log("Updating quantity:", { variantId, quantity });

      if (quantity < 1) {
        console.log("Quantity < 1, removing item");
        return removeItem(variantId);
      }

      await fetch("/api/cart/update", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ cartId, variantId, quantity }),
      });

      const newItems = items.map((item) =>
        item.variantId === variantId ? { ...item, quantity } : item,
      );
      console.log("New items state after quantity update:", newItems);
      setItems(newItems);
      localStorage.setItem("cart", JSON.stringify(newItems));
    } catch (error) {
      console.error("Failed to update cart item:", error);
      throw error;
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
        window.location.href = url;
      }
    } catch (error) {
      console.error("Failed to checkout:", error);
    }
  };

  const clearCart = () => {
    console.log("Clearing cart");
    setItems([]);
    setCartId(null);
    setCheckoutUrl(null);
    localStorage.removeItem("cart");
    localStorage.removeItem("cartId");
  };

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
