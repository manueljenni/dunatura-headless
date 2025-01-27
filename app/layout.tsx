import { Toaster } from "@/components/primitives/toaster";
import { CartProvider } from "@/contexts/CartContext";
import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";

const denimINK = localFont({
  src: [
    {
      path: "../public/fonts/DenimINK-Light.woff",
      weight: "300",
      style: "normal",
    },
    {
      path: "../public/fonts/DenimINK-Regular.woff",
      weight: "400",
      style: "normal",
    },
    {
      path: "../public/fonts/DenimINK-Medium.woff",
      weight: "500",
      style: "normal",
    },
    {
      path: "../public/fonts/DenimINK-SemiBold.woff",
      weight: "600",
      style: "normal",
    },
    {
      path: "../public/fonts/DenimINK-Bold.woff",
      weight: "700",
      style: "normal",
    },
    {
      path: "../public/fonts/DenimINK-Heavy.woff",
      weight: "800",
      style: "normal",
    },
  ],
  variable: "--font-denimink",
});

export const metadata: Metadata = {
  title: "dunatura | Personalisierte Mikronährstoffe",
  description: "dunatura | Personalisierte Mikronährstoffe",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="de" className={`${denimINK.variable}`}>
      <body>
        <CartProvider>{children}</CartProvider>
        <Toaster />
      </body>
    </html>
  );
}
