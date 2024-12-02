"use client";
import logoBlack from "@/public/images/logos/logo-black.svg";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import MobileHeader from "./MobileHeader";
import { Button } from "./primitives/button";

export default function Header() {
  const pathname = usePathname();
  const isProductsRoute = pathname.startsWith("/products");

  return (
    <div className={`w-full ${isProductsRoute ? "bg-[#F2F1E9]" : "bg-lightBackground"}`}>
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
            <Link href="/">Jetzt konfigurieren</Link>
            <Link href="/products">Alle Produkte</Link>
          </div>
        </div>
        <div className="flex items-center gap-4">
          <Link href="/" className="hidden lg:inline-block">
            <Link href="/questionnaire">
              <Button asChild variant="pill" size={"pill-lg"}>
                <a>Jetzt Test starten</a>
              </Button>
            </Link>
          </Link>
          <MobileHeader onToggle={() => {}} />
        </div>
      </nav>
    </div>
  );
}
