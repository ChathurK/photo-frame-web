import React, { useEffect, useState } from "react";
import { ChevronUpIcon } from "@heroicons/react/24/outline";

const ScrollerToTopBtn = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const gallerySection = document.getElementById("gallery");

      if (gallerySection) {
        const gallerySectionTop = gallerySection.offsetTop;
        const currentScrollY = window.scrollY;

        // Show button if scrolled past gallery section
        if (currentScrollY >= gallerySectionTop) {
          setIsVisible(true);
        } else {
          setIsVisible(false);
        }
      }
    };

    window.addEventListener("scroll", handleScroll);

    // Check on mount
    handleScroll();

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  if (!isVisible) return null;

  return (
    <div
      className="fixed bottom-20 right-2 z-50 flex size-11 cursor-pointer items-center justify-center rounded-full bg-black/30"
      onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
    >
      <ChevronUpIcon className="size-6 text-white" />
    </div>
  );
};

export default ScrollerToTopBtn;
