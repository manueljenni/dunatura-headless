"use client";

import { useToast } from "@/hooks/use-toast";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect } from "react";

export default function CheckoutSuccessPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { toast } = useToast();

  useEffect(() => {
    const status = searchParams.get("status");

    if (status === "success") {
      // Clear cart
      localStorage.removeItem("cart");
      localStorage.removeItem("cartId");

      toast({
        title: "Bestellung erfolgreich",
        description: "Vielen Dank für deine Bestellung!",
      });

      // Redirect to home after 3 seconds
      setTimeout(() => {
        router.push("/");
      }, 3000);
    }
  }, [searchParams, router, toast]);

  return (
    <div className="max-w-6xl mx-auto px-4 py-16">
      <h1 className="text-4xl font-medium mb-8">Bestellung erfolgreich</h1>
      <p className="text-gray-500">
        Vielen Dank für deine Bestellung! Du wirst in Kürze eine Bestätigungs-E-Mail
        erhalten.
      </p>
    </div>
  );
}
