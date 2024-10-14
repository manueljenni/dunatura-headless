import logoWhite from "@/public/images/logos/logo-white.svg";
import Image from "next/image";
import Link from "next/link";

export default function Footer() {
  return (
    <div>
      <div
        id="footer-overlay-wrapper"
        style={{
          transform: "translateY(35px)",
          height: "50px",
          backgroundColor: "#fbfcf8",
          overflow: "hidden",
        }}
        className="block z-10">
        <div
          id="footer-overlay-content"
          style={{
            width: "150%",
            height: "100%",
            backgroundColor: "#232e23",
            borderRadius: "100%",
            top: "30%",
            left: "-25%",
            right: 0,
            position: "relative",
          }}></div>
      </div>
      <div className="bg-primary text-white py-12 w-full block z-20">
        <div className="flex justify-center items-center w-full">
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
                <a data-link="questionnaire" className="text-gray-400">
                  Starte den Test
                </a>
                <a data-link="customizer" className="text-gray-400">
                  Konfigurator
                </a>
                <a data-link="allProducts" className="text-gray-400">
                  Alle Produkte
                </a>
              </div>
              <div className="flex flex-col space-y-2 w-full z-20">
                <h3 className="text-lg font-semibold">Erfahre mehr</h3>
                <Link href="/about" className="text-gray-400">
                  Über uns
                </Link>
                <a data-link="imprint" className="text-gray-400">
                  Impressum
                </a>
                <a data-link="tcs" className="text-gray-400">
                  AGB
                </a>
              </div>
              <div className="flex flex-col space-y-2 w-full z-20">
                <h3 className="text-lg font-semibold">Kontakt</h3>
                <a href="mailto:hello@dunatura.com" className="text-gray-400">
                  Schreib uns jederzeit
                </a>
                <a
                  href="mailto:hello@dunatura.com"
                  className="text-white underline underline-offset-4">
                  hello@dunatura.com
                </a>
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
