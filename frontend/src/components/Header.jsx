import logo from "../assets/logo/FRAMESLK.COM_NEW_LOGO.png";
import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/outline";
import { useState } from "react";

const Header = ({ language, translations, onPageChange }) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const lang = translations[language];

  const menuItems = [
    { href: "#works", label: lang.nav.works },
    { href: "#testimonials", label: lang.nav.testimonials },
    { href: "#video", label: lang.nav.promo },
  ];

  return (
    <header className="relative items-center justify-between py-2">
      <div className="flex w-full items-center justify-between">
        <button
          onClick={() => onPageChange && onPageChange("home")}
          className="cursor-pointer"
        >
          <img
            src={logo}
            alt="FRAMES.LK Logo"
            className="h-9 w-auto md:h-12 md:w-auto"
          />
        </button>

        {/* Mobile menu button */}
        <button
          aria-label="toggle menu"
          className="mr-7 rounded-md p-1 transition-colors duration-300 hover:bg-slate-500 hover:bg-opacity-20 md:hidden"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        >
          {!isMobileMenuOpen ? (
            <Bars3Icon className="tran h-6" />
          ) : (
            <XMarkIcon className="h-6" />
          )}
        </button>
      </div>

      {/* Desktop navigation */}
      <nav aria-label="navigation list" className="mr-7 hidden gap-8 md:flex">
        <a
          href="#works"
          className="whitespace-nowrap px-2 py-1 font-medium transition-colors duration-300 hover:text-green-2"
        >
          {lang.nav.works}
        </a>
        <a
          href="#testimonials"
          className="whitespace-nowrap px-2 py-1 font-medium transition-colors duration-300 hover:text-green-2"
        >
          {lang.nav.testimonials}
        </a>
        <a
          href="#video"
          className="whitespace-nowrap px-2 py-1 font-medium transition-colors duration-300 hover:text-green-2"
        >
          {lang.nav.promo}
        </a>
        <button
          className="whitespace-nowrap px-2 py-1 font-medium transition-colors duration-300 hover:text-green-2"
          onClick={() => onPageChange && onPageChange("order")}
        >
          {lang.nav.order}
        </button>
      </nav>

      {/* Mobile navigation */}
      {isMobileMenuOpen && (
        <nav className="absolute left-0 right-0 top-full z-50 bg-gray-light shadow-lg md:hidden">
          <div className="flex flex-col items-center space-y-3 py-4">
            {menuItems.map((item, index) => (
              <a
                key={item.href}
                href={item.href}
                className="w-full whitespace-nowrap px-2 py-1 text-center font-medium transition-colors duration-300 hover:text-green-2"
                style={{
                  animation: "slideInRight 0.4s ease-out both",
                  animationDelay: `${index * 100}ms`,
                }}
                onClick={() => setIsMobileMenuOpen(false)}
              >
                {item.label}
              </a>
            ))}
            <button
              className="w-full whitespace-nowrap px-2 py-1 text-center font-medium transition-colors duration-300 hover:text-green-2"
              style={{
                animation: "slideInRight 0.4s ease-out both",
                animationDelay: `${menuItems.length * 100}ms`,
              }}
              onClick={() => {
                onPageChange && onPageChange("order");
                setIsMobileMenuOpen(false);
              }}
            >
              {lang.nav.order}
            </button>
          </div>
        </nav>
      )}
    </header>
  );
};

export default Header;
