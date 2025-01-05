"use client";
import logoWhite from "@/public/images/logos/logo-white.svg";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function Footer() {
  const pathname = usePathname();
  const isProductsRoute = pathname.startsWith("/products");
  const bgColor = isProductsRoute ? "#F2F1E9" : "#fbfcf8";

  return (
    <div className="relative overflow-hidden">
      <div
        id="footer-overlay-wrapper"
        style={{
          position: "absolute",
          top: "-70px",
          left: 0,
          right: 0,
          height: "70px",
          overflow: "hidden",
          backgroundColor: bgColor,
        }}
        className="z-10">
        <div
          id="footer-overlay-content"
          style={{
            position: "absolute",
            bottom: "-50px",
            left: "-5%",
            width: "110%",
            height: "100px",
            backgroundColor: "primary",
            borderRadius: "50%",
          }}></div>
      </div>
      <div className="text-white w-full block z-20 overflow-hidden">
        <div className="bg-primary py-24 flex justify-center items-center w-full">
          <div className="max-w-[1200px] w-full px-6 lg:px-12">
            <div className="grid grid-cols-2 lg:grid-cols-5 gap-8 font-medium z-20">
              <div className="flex flex-col space-y-4 col-span-2 w-full z-20">
                <h3 className="text-3xl font-medium">
                  Personalisierte Mikronährstoffe & Vitamine
                </h3>
                <p>Hergestellt in München, Deutschland.</p>
                {/* <div className="flex w-full">
                  <input
                    type="email"
                    placeholder="E-Mail Adresse"
                    className="px-4 py-2 rounded-l-xl focus:outline-none text-black bg-[#2A3729]"
                  />
                  <button className="bg-[#2A3729] text-white px-4 py-2 rounded-r-xl">
                    Anmelden
                  </button>
                </div> */}
              </div>
              <div className="flex flex-col space-y-2 w-full z-20">
                <h3 className="text-lg font-semibold">Produkt</h3>
                <Link href="/questionnaire" className="text-gray-400">
                  Starte den Test
                </Link>
                <p data-link="customizer" className="text-gray-400">
                  Konfigurator
                </p>
                <p data-link="allProducts" className="text-gray-400">
                  Alle Produkte
                </p>
              </div>
              <div className="flex flex-col space-y-2 w-full z-20">
                <h3 className="text-lg font-semibold">Erfahre mehr</h3>
                <Link href="/about" className="text-gray-400">
                  Über uns
                </Link>
                <p data-link="imprint" className="text-gray-400">
                  Impressum
                </p>
                <p data-link="tcs" className="text-gray-400">
                  AGB
                </p>
              </div>
              <div className="flex flex-col space-y-2 w-full z-20">
                <h3 className="text-lg font-semibold">Kontakt</h3>
                <p className="text-gray-400">Schreib uns jederzeit</p>
                <Link
                  href="mailto:hello@dunatura.com"
                  className="text-white underline underline-offset-4">
                  {/* TODO: Fix mailto link */}
                  hello@dunatura.com
                </Link>
              </div>
            </div>
            <div className="mt-12 text-center text-gray-400 flex justify-between items-center">
              <Image src={logoWhite} alt="Logo" className="w-32" />
              <p className="text-right lg:text-left">
                © 2024 dunatura - All rights reserved
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
