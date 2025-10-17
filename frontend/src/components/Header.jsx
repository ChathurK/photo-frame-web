import logo from "../assets/logo/FRAMESLK.COM_NEW_LOGO.png";
import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/outline";
import { useState } from "react";

const Header = ({ language, translations, onPageChange }) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isClosing, setIsClosing] = useState(false);
  const lang = translations[language];

  const menuItems = [
    { href: "#gallery", label: lang.nav.gallery },
    { href: "#about", label: lang.nav.about },
    { href: "#testimonials", label: lang.nav.testimonials },
    { href: "#video", label: lang.nav.promo },
  ];

  const handleMenuToggle = () => {
    if (isMobileMenuOpen) {
      // Start closing animation
      setIsClosing(true);
      setTimeout(() => {
        setIsMobileMenuOpen(false);
        setIsClosing(false);
      }, 500); // Match animation duration
    } else {
      setIsMobileMenuOpen(true);
    }
  };

  const handleMenuItemClick = () => {
    setIsMobileMenuOpen(false);
    setIsClosing(false);
  };

  const handleSmoothScroll = (e, targetId) => {
    e.preventDefault();
    const element = document.querySelector(targetId);
    if (element) {
      element.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  return (
    <header className="container mx-auto flex items-center justify-between px-4 py-2">
      <div className="flex h-[50px] w-full items-center justify-between">
        <button
          onClick={() => onPageChange && onPageChange("home")}
          className="-ml-6 cursor-pointer md:-ml-8"
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
          className="rounded-full p-1 transition-colors duration-300 active:bg-slate-300 md:hidden"
          onClick={handleMenuToggle}
        >
          {!isMobileMenuOpen ? (
            <Bars3Icon className="h-6" />
          ) : (
            <XMarkIcon className="h-6" />
          )}
        </button>
      </div>

      {/* Desktop navigation */}
      <nav
        aria-label="navigation list"
        className="hidden gap-4 md:flex lg:gap-8"
      >
        <a
          href="#gallery"
          className="whitespace-nowrap px-2 py-1 font-medium transition-colors duration-300 hover:text-green-2"
          onClick={(e) => handleSmoothScroll(e, "#gallery")}
        >
          {lang.nav.gallery}
        </a>
        <a
          href="#about"
          className="whitespace-nowrap px-2 py-1 font-medium transition-colors duration-300 hover:text-green-2"
          onClick={(e) => handleSmoothScroll(e, "#about")}
        >
          {lang.nav.about}
        </a>
        <a
          href="#testimonials"
          className="whitespace-nowrap px-2 py-1 font-medium transition-colors duration-300 hover:text-green-2"
          onClick={(e) => handleSmoothScroll(e, "#testimonials")}
        >
          {lang.nav.testimonials}
        </a>
        <a
          href="#video"
          className="whitespace-nowrap px-2 py-1 font-medium transition-colors duration-300 hover:text-green-2"
          onClick={(e) => handleSmoothScroll(e, "#video")}
        >
          {lang.nav.promo}
        </a>
        <button
          className="whitespace-nowrap rounded-full bg-green-2 px-3 py-1 font-medium text-white transition-colors duration-300 hover:bg-green-1"
          onClick={() => onPageChange && onPageChange("order")}
        >
          {lang.nav.order}
        </button>
      </nav>

      {/* Mobile navigation */}
      {isMobileMenuOpen && (
        <nav className="absolute left-0 right-0 top-[52px] z-50 bg-gray-light shadow-md md:hidden">
          <div className="flex flex-col items-center space-y-3 pb-4">
            {menuItems.map((item, index) => (
              <a
                key={item.href}
                href={item.href}
                className={`w-full whitespace-nowrap px-2 py-1 text-center font-medium transition-colors duration-300 hover:text-green-2 ${
                  isClosing ? "animate-slideOutRight" : "animate-slideInRight"
                }`}
                style={{
                  animationDelay: isClosing
                    ? `${(menuItems.length - index) * 50}ms`
                    : `${index * 100}ms`,
                  animationFillMode: "both",
                }}
                onClick={(e) => {
                  handleSmoothScroll(e, item.href);
                  handleMenuItemClick();
                }}
              >
                {item.label}
              </a>
            ))}
            <button
              className={`w-full whitespace-nowrap px-2 py-1 text-center font-medium transition-colors duration-300 hover:text-green-2 ${
                isClosing ? "animate-slideOutRight" : "animate-slideInRight"
              }`}
              style={{
                animationDelay: isClosing
                  ? "0ms"
                  : `${menuItems.length * 100}ms`,
                animationFillMode: "both",
              }}
              onClick={() => {
                onPageChange && onPageChange("order");
                handleMenuItemClick();
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
