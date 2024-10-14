"use client";
import logoBlack from "@/public/images/logos/logo-black.svg";
import Image from "next/image";
import Link from "next/link";
import MobileHeader from "./MobileHeader";
import { Button } from "./primitives/button";

export default function Header() {
  return (
    <div className="max-w-6xl mx-auto bg-lightBackground w-full">
      <nav className="flex justify-between items-center px-4 py-4 h-18 font-medium">
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
            {/* <Link href="/">Über uns</Link> */}
          </div>
        </div>
        <div className="flex items-center gap-4">
          <Link href="/" className="hidden lg:inline-block">
            <Button variant="pill" size={"pill-lg"}>
              Jetzt Test starten
            </Button>
          </Link>
          <MobileHeader
            onToggle={(isOpen) =>
              console.log("Mobile menu is", isOpen ? "open" : "closed")
            }
          />
        </div>
      </nav>
    </div>
  );
}
