import Link from "next/link";
import { useEffect, useRef, useState } from "react";

interface MobileHeaderProps {
  onToggle: (isOpen: boolean) => void;
}

export default function MobileHeader({ onToggle }: MobileHeaderProps) {
  const [isOpen, setIsOpen] = useState(false);
  const mobileMenuRef = useRef<HTMLDivElement>(null);

  const toggleMobileMenu = () => {
    setIsOpen(!isOpen);
    onToggle(!isOpen);
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        mobileMenuRef.current &&
        !mobileMenuRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
        onToggle(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [onToggle]);

  return (
    <div>
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
      <div
        className={`fixed inset-0 z-50 transform transition-transform duration-300 ease-in-out ${
          isOpen ? "translate-x-0" : "-translate-x-full"
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
            {/* <Link
              href="/"
              className="block text-lg font-medium text-black hover:text-gray-700">
              Über uns
            </Link> */}
          </nav>
        </div>
      </div>
    </div>
  );
}
