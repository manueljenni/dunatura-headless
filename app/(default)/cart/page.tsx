"use client";

import { Button } from "@/components/primitives/button";
import { useCart } from "@/contexts/CartContext";
import { useToast } from "@/hooks/use-toast";
import { Minus, Plus, Trash2 } from "lucide-react";
import Image from "next/image";
import { useEffect, useState } from "react";

export default function CartPage() {
  const { items, removeItem, updateQuantity, checkout, cartId, clearCart } = useCart();
  const { toast } = useToast();
  const [localStorageData, setLocalStorageData] = useState<{
    cart: string | null;
    cartId: string | null;
  }>({ cart: null, cartId: null });

  useEffect(() => {
    setLocalStorageData({
      cart: localStorage.getItem("cart") || "null",
      cartId: localStorage.getItem("cartId") || "null",
    });
  }, []);

  const handleCheckout = async () => {
    try {
      await checkout();
    } catch (error) {
      toast({
        title: "Fehler",
        description: "Checkout konnte nicht gestartet werden.",
        variant: "destructive",
      });
    }
  };

  const handleClearCart = () => {
    clearCart();
    toast({
      title: "Warenkorb geleert",
      description: "Alle Produkte wurden aus deinem Warenkorb entfernt.",
    });
  };

  // Debug section component
  const DebugSection = () => {
    if (process.env.NODE_ENV === "production") return null;

    console.log("Cart Page Debug:", {
      cartId,
      items,
      localStorage: {
        cart: localStorage.getItem("cart"),
        cartId: localStorage.getItem("cartId"),
      },
    });

    return (
      <div className="mt-8 p-4 bg-gray-50 rounded-lg">
        <h2 className="text-sm font-mono mb-2">Debug Information</h2>
        <div className="space-y-2 text-xs font-mono">
          <div>
            <strong>Cart ID:</strong>
            <pre className="bg-white p-2 rounded mt-1 overflow-auto">
              {JSON.stringify(cartId, null, 2)}
            </pre>
          </div>
          <div>
            <strong>Items:</strong>
            <pre className="bg-white p-2 rounded mt-1 overflow-auto">
              {JSON.stringify(items, null, 2)}
            </pre>
          </div>
          <div>
            <strong>localStorage:</strong>
            <pre className="bg-white p-2 rounded mt-1 overflow-auto">
              {JSON.stringify(localStorageData, null, 2)}
            </pre>
          </div>
          <div>
            <strong>Context Provider Value:</strong>
            <pre className="bg-white p-2 rounded mt-1 overflow-auto">
              {JSON.stringify(useCart(), null, 2)}
            </pre>
          </div>
        </div>
      </div>
    );
  };

  if (items.length === 0) {
    return (
      <div className="max-w-6xl mx-auto px-4 py-16">
        <h1 className="text-4xl font-medium mb-8">Dein Warenkorb</h1>
        <p className="text-gray-500">Dein Warenkorb ist leer.</p>
        <DebugSection />
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto px-4 py-16">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-4xl font-medium">Dein Warenkorb</h1>
        <Button
          variant="outline"
          size="default"
          onClick={handleClearCart}
          className="text-red-500 hover:text-red-600">
          <Trash2 className="w-4 h-4 mr-2" />
          Warenkorb leeren
        </Button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-4">
          {items.map((item) => (
            <div
              key={item.variantId}
              className="flex items-center gap-4 bg-[#FCFCF8] rounded-3xl border border-[#E2E1DC] p-6">
              <Image
                src="/images/placeholder.jpg"
                alt="Product"
                width={80}
                height={80}
                className="rounded-lg"
              />
              <div className="flex-1">
                <h3 className="font-medium">{item.variantId}</h3>
                <div className="flex items-center gap-2 mt-2">
                  <button
                    onClick={() => updateQuantity(item.variantId, item.quantity - 1)}
                    className="w-8 h-8 rounded-full bg-[#F6F6F3] flex items-center justify-center">
                    <Minus className="w-4 h-4" />
                  </button>
                  <span>{item.quantity}</span>
                  <button
                    onClick={() => updateQuantity(item.variantId, item.quantity + 1)}
                    className="w-8 h-8 rounded-full bg-[#F6F6F3] flex items-center justify-center">
                    <Plus className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => removeItem(item.variantId)}
                    className="ml-auto text-red-500">
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="bg-[#FCFCF8] rounded-3xl border border-[#E2E1DC] p-6 h-fit">
          <h2 className="text-xl font-medium mb-4">Zusammenfassung</h2>
          <Button
            variant="pill"
            size="pill-xl"
            className="w-full"
            onClick={handleCheckout}>
            Zur Kasse
          </Button>
        </div>
      </div>

      <DebugSection />
    </div>
  );
}
