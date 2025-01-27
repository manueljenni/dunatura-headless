"use client";

import { Button } from "@/components/primitives/button";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/primitives/sheet";
import { useCart } from "@/contexts/CartContext";
import { useToast } from "@/hooks/use-toast";
import { Minus, Plus, ShoppingCart, Trash2 } from "lucide-react";
import Image from "next/image";

export default function CartSheet() {
  const { items, removeItem, updateQuantity, checkout, clearCart } = useCart();
  const { toast } = useToast();

  const totalQuantity = items.reduce((sum, item) => sum + item.quantity, 0);

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

  console.log(items);

  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant="ghost" size="icon" className="relative">
          <ShoppingCart className="h-5 w-5" />
          {totalQuantity > 0 && (
            <span className="absolute -top-1 -right-1 h-4 w-4 rounded-full bg-primary text-[10px] font-medium text-white flex items-center justify-center">
              {totalQuantity}
            </span>
          )}
        </Button>
      </SheetTrigger>
      <SheetContent className="w-full sm:max-w-lg flex flex-col p-0">
        <div className="px-6 pt-6">
          <SheetHeader>
            <div className="flex justify-between items-center">
              <SheetTitle>Dein Warenkorb</SheetTitle>
            </div>
          </SheetHeader>
        </div>

        <div className="flex-1 overflow-y-auto">
          {items.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-full">
              <p className="text-gray-500">Dein Warenkorb ist leer.</p>
            </div>
          ) : (
            <div className="p-6 space-y-4">
              {items.map((item) => (
                <div
                  key={item.variantId}
                  className="flex items-center gap-4 bg-[#FCFCF8] rounded-3xl border border-[#E2E1DC] p-6">
                  <Image
                    src={item.image}
                    alt="Product"
                    width={80}
                    height={80}
                    className="rounded-lg"
                  />
                  <div className="flex-1">
                    <h3 className="font-medium">{item.title}</h3>
                    <p className="text-sm text-gray-600 mb-2">€{item.price.toFixed(2)}</p>
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
          )}
        </div>

        {items.length > 0 && (
          <div className="p-6">
            <Button
              variant="pill"
              size="pill-xl"
              className="w-full"
              onClick={handleCheckout}>
              Zur Kasse
            </Button>
          </div>
        )}

        {items.length > 0 && (
          <Button
            variant="outline"
            size="sm"
            onClick={handleClearCart}
            className="text-red-500 hover:text-red-600">
            <Trash2 className="w-4 h-4 mr-2" />
            Warenkorb leeren
          </Button>
        )}
      </SheetContent>
    </Sheet>
  );
}
