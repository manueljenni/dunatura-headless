"use client";
import logoBlack from "@/public/images/logos/logo-black.svg";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { Button } from "./primitives/button";

export default function Header() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const mobileMenuRef = useRef<HTMLDivElement>(null);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        mobileMenuRef.current &&
        !mobileMenuRef.current.contains(event.target as Node)
      ) {
        setIsMobileMenuOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div className="max-w-6xl mx-auto bg-lightBackground">
      <nav className="flex justify-between items-center p-4 h-18 font-medium">
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
            <Link href="/">Über uns</Link>
          </div>
        </div>
        <div className="flex items-center gap-4">
          <Link href="/" className="hidden lg:inline-block">
            <Button variant="pill" size={"pill-lg"}>
              Jetzt Test starten
            </Button>
          </Link>
          <button className="lg:hidden focus:outline-none" onClick={toggleMobileMenu}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 6h16M4 12h16M4 18h16"
              />
            </svg>
          </button>
        </div>
      </nav>

      {/* Mobile Menu Modal */}
      <div
        className={`fixed inset-0 z-50 transform transition-transform duration-300 ease-in-out ${
          isMobileMenuOpen ? "translate-x-0" : "-translate-x-full"
        } lg:hidden`}>
        <div ref={mobileMenuRef} className="w-3/4 md:w-1/2 bg-white h-full p-6">
          <button className="focus:outline-none mb-6" onClick={toggleMobileMenu}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
          <nav className="space-y-4">
            <Link
              href="/"
              className="block text-lg font-medium text-black hover:text-gray-700">
              Jetzt konfigurieren
            </Link>
            <Link
              href="/products"
              className="block text-lg font-medium text-black hover:text-gray-700">
              Alle Produkte
            </Link>
            <Link
              href="/"
              className="block text-lg font-medium text-black hover:text-gray-700">
              Über uns
            </Link>
          </nav>
        </div>
      </div>
    </div>
  );
}
