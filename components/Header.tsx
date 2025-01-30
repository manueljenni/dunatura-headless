"use client";
import logoBlack from "@/public/images/logos/logo-black.svg";
import Image from "next/image";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import CartSheet from "./custom/cart/CartSheet";
import MobileHeader from "./MobileHeader";
import { Button } from "./primitives/button";

export default function Header() {
  const pathname = usePathname();
  const router = useRouter();
  const isProductsRoute = pathname.startsWith("/products");
  const isConfigureRoute = pathname.startsWith("/configure");

  return (
    <div
      className={`w-full text-primary ${isProductsRoute || isConfigureRoute ? "bg-[#F2F1E9]" : "bg-lightBackground"}`}>
      <nav className="flex justify-between items-center px-4 py-4 h-18 font-medium max-w-6xl mx-auto">
        <div className="flex items-center gap-6">
          <Link href="/">
            <Image
              src={logoBlack}
              alt="logo"
              width={120}
              height={24}
              className="object-contain"
              style={{
                maxWidth: "100%",
                height: "auto",
              }}
            />
          </Link>
          <div className="hidden lg:flex items-center gap-6">
            <Link href="/configure">Jetzt konfigurieren</Link>
            <Link href="/products">Alle Produkte</Link>
          </div>
        </div>
        <div className="flex items-center gap-4">
          <div className="hidden lg:inline-block">
            <Button
              variant="pill"
              size="pill-lg"
              onClick={() => router.push("/questionnaire")}>
              Jetzt Test starten
            </Button>
          </div>
          <CartSheet />
          <MobileHeader onToggle={() => {}} />
        </div>
      </nav>
    </div>
  );
}
