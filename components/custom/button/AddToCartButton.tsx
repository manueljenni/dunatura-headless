"use client";

import { Button } from "@/components/primitives/button";
import { useCart } from "@/contexts/CartContext";
import { useToast } from "@/hooks/use-toast";
import { ShoppingCart } from "lucide-react";

interface AddToCartButtonProps {
  variantId: string;
  variant?: "default" | "pill";
  size?: "default" | "pill-lg" | "pill-xl";
  className?: string;
}

export default function AddToCartButton({
  variantId,
  variant = "default",
  size = "default",
  className,
}: AddToCartButtonProps) {
  const { addItem } = useCart();
  const { toast } = useToast();

  const handleAddToCart = async () => {
    try {
      await addItem(variantId);
      toast({
        title: "Produkt hinzugefügt",
        description: "Das Produkt wurde deinem Warenkorb hinzugefügt.",
      });
    } catch (error) {
      toast({
        title: "Fehler",
        description: "Das Produkt konnte nicht hinzugefügt werden.",
        variant: "destructive",
      });
    }
  };

  return (
    <Button onClick={handleAddToCart} variant={variant} size={size} className={className}>
      <ShoppingCart className="w-4 h-4 mr-2" />
      In den Warenkorb
    </Button>
  );
}
