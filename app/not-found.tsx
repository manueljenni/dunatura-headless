"use client";
import { Button } from "@/components/primitives/button";
import { useRouter } from "next/navigation";

export default function NotFoundPage() {
  const router = useRouter();
  return (
    <div className="flex-1 flex justify-center items-center">
      <div className="flex flex-col gap-6">
        <p className="text-4xl font-medium text-primary text-center">
          Diese Seite existiert nicht :(
        </p>
        <div className="w-full flex justify-center">
          <Button variant="pill" size={"xl"} onClick={() => router.push("/products")}>
            Alle Produkte
          </Button>
        </div>
      </div>
    </div>
  );
}
