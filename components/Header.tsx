import Image from "next/image";
import Link from "next/link";
import { Button } from "./primitives/button";
export default function Header() {
  return (
    <div className="max-w-6xl mx-auto bg-lightBackground">
      <nav className="flex justify-between items-center p-4 h-18 font-medium">
        <div className="flex items-center gap-6">
          <Link href="/">
            <Image
              src="/images/logos/logo-black.webp"
              alt="logo"
              width={120}
              height={24}
              className="object-contain"
            />
          </Link>
          <Link href="/configure">Jetzt konfigurieren</Link>
          <Link href="/products">Alle Produkte</Link>
          <Link href="/about">Über uns</Link>
        </div>
        <div className="flex items-center gap-4">
          <Link href="/">
            <Button variant="pill" size={"pill-lg"}>
              Jetzt Test starten
            </Button>
          </Link>
        </div>
      </nav>
    </div>
  );
}
