"use client";

import { Button } from "@/components/primitives/button";
import { useCart } from "@/contexts/CartContext";
import { useToast } from "@/hooks/use-toast";
import { ShoppingCart } from "lucide-react";

interface AddToCartButtonProps {
  variantId: string;
  variant?: "default" | "pill";
  size?: "default" | "sm" | "lg" | "pill-xl" | "pill-2xl";
  className?: string;
  title?: string;
  image?: string;
  price?: number;
  showSubscriptionOptions?: boolean;
}

export default function AddToCartButton({
  variantId,
  variant = "default",
  size = "default",
  className,
  title,
  image,
  price,
  showSubscriptionOptions = false,
}: AddToCartButtonProps) {
  const { addItem } = useCart();
  const { toast } = useToast();

  const handleAddToCart = async () => {
    try {
      await addItem({
        variantId,
        quantity: 1,
        sellingPlanId: null,
        title: title || "",
        price: price || 0,
        image: image || "",
        properties: {},
      });

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
    <Button variant={variant} size={size} className={className} onClick={handleAddToCart}>
      <ShoppingCart className="w-4 h-4 mr-2" />
      In den Warenkorb
    </Button>
  );
}
