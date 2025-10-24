import { StarIcon } from "@heroicons/react/24/solid";
import {
  ArrowRightIcon,
  ChevronRightIcon,
  ChevronDoubleRightIcon,
  TruckIcon,
  GiftIcon,
} from "@heroicons/react/24/outline";
import heroImageDT_63 from "../assets/heroSectionImgs/DT 63.jpg";
import heroImage14 from "../assets/heroSectionImgs/14.jpg";
import heroImageDT_59 from "../assets/heroSectionImgs/DT 59.jpg";
import heroImage5 from "../assets/heroSectionImgs/5.jpg";
import heroImage6 from "../assets/heroSectionImgs/6.jpg";
import heroImageDT_16 from "../assets/heroSectionImgs/DT 16.jpg";
import heroImageDT_85 from "../assets/heroSectionImgs/DT 85.jpg";
import heroImage12 from "../assets/heroSectionImgs/12.jpg";
import { useEffect, useState } from "react";

const HeroSection = ({ language, translations, onPageChange }) => {
  const lang = translations[language];
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const showcaseImages = [heroImageDT_63, heroImage14, heroImageDT_59, heroImage5, heroImage6, heroImageDT_16, heroImageDT_85, heroImage12];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndex((prev) => (prev + 1) % showcaseImages.length);
    }, 4000); // Change image every 4 seconds

    return () => clearInterval(interval);
  }, [showcaseImages.length]);

  const handleOrderClick = (e) => {
    e.preventDefault();
    // Scroll to order section
    document.getElementById("order")?.scrollIntoView({ behavior: "smooth" });
  };

  const handleOrderPageRedirect = () => {
    if (onPageChange) {
      onPageChange("order");
    }
  };

  return (
    <section className="relative overflow-visible pb-12 pt-2 md:pb-20 md:pt-4">
      <div className="container mx-auto animate-slideInBottom px-4">
        <div className="grid items-center gap-12 md:grid-cols-2 lg:gap-16">
          {/* Left Content */}
          <div className="flex flex-col space-y-6 md:space-y-8">
            {/* Badge */}
            <div className="inline-flex gap-2 text-nowrap">
              <div className="hidden sm:inline-flex w-fit items-center gap-2 rounded-full bg-green-2/10 px-4 py-2 text-xs font-medium text-green-1 md:text-sm">
                <span className="relative flex h-2 w-2">
                  <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-green-2 opacity-75"></span>
                  <span className="relative inline-flex h-2 w-2 rounded-full bg-green-2"></span>
                </span>
                {lang.hero.badge1 ?? "Premium Quality Frames"}
              </div>

              <div className="inline-flex w-fit items-center gap-2 rounded-full bg-amber-500/10 px-4 py-2 text-xs font-medium text-amber-500 md:text-sm">
                <span className="relative flex h-2 w-2">
                  <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-amber-500 opacity-75"></span>
                  <span className="relative inline-flex h-2 w-2 rounded-full bg-amber-500"></span>
                </span>
                {lang.hero.badge2 ?? "Free Delivery"}
              </div>
            </div>

            {/* Main Heading */}
            <h1 className="text-4xl font-bold leading-tight text-green-3 md:text-5xl md:leading-tight lg:text-6xl lg:leading-tight">
              {lang.hero.title}
            </h1>

            {/* Description */}
            <p className="text-lg text-gray-600 md:text-xl">
              {lang.hero.description}
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
              <button
                onClick={handleOrderPageRedirect}
                className="group relative overflow-hidden rounded-lg bg-green-2 px-8 py-4 font-semibold text-white shadow-lg transition-all duration-300 hover:scale-105 hover:bg-green-1 hover:shadow-xl"
              >
                <span className="relative z-10">{lang.hero.cta}</span>
                <div className="absolute inset-0 -z-0 bg-gradient-to-r from-green-1 to-green-2 opacity-0 transition-opacity duration-300 group-hover:opacity-100"></div>
              </button>

              <a
                href="#order"
                onClick={(e)=>handleOrderClick(e)}
                className="group flex items-center justify-center gap-2 px-8 py-4 font-semibold text-green-2 transition-all duration-300 hover:gap-3 hover:text-green-1"
              >
                <span>{lang.hero.cta2}</span>
                <ChevronDoubleRightIcon className="size-4 transition-transform duration-300 group-hover:translate-x-1" />
              </a>
            </div>

            {/* Stats */}
            <div className="flex flex-nowrap text-wrap pt-2 max-sm:justify-around md:gap-8">
              <div>
                <div className="text-3xl font-bold text-green-3">500+</div>
                <div className="text-sm text-gray-600">{lang.hero.stat1 ?? "Happy Customers"}</div>
              </div>
              <div>
                <div className="text-3xl font-bold text-green-3">1000+</div>
                <div className="text-sm text-gray-600">{lang.hero.stat2 ?? "Frames Created"}</div>
              </div>
              <div>
                <div className="inline-flex items-center text-3xl font-bold text-green-3">
                  100% {/* <StarIcon className="w-7 h-7 text-green-3" /> */}
                </div>
                <div className="text-sm text-gray-600">{lang.hero.stat3 ?? "Recommended"}</div>
              </div>
            </div>
          </div>

          {/* Right Content - Image Showcase */}
          <div className="relative">
            {/* Main Image with Gradient Border */}
            <div className="relative">
              {/* Gradient background */}
              <div className="absolute -inset-4 rounded-xl bg-green-2 opacity-20 blur-2xl"></div>

              {/* Main Image Container */}
              {/* <div className="relative overflow-hidden rounded-xl shadow-[0px_0px_100px_rgba(34,197,94,0.3)]"> */}
              <div className="relative overflow-hidden rounded-xl">
                {showcaseImages.map((image, index) => (
                  <img
                    key={index}
                    src={image}
                    alt={`Photo frame showcase ${index + 1}`}
                    className={`h-[400px] w-full object-cover transition-opacity duration-1000 ${
                      index === currentImageIndex
                        ? "opacity-100"
                        : "absolute inset-0 opacity-0"
                    }`}
                  />
                ))}

                {/* Image Overlay with gradient */}
                {/* <div className="absolute inset-0 bg-gradient-to-t from-black/10 to-transparent"></div> */}

                {/* Floating Badge */}
                {/* <div className="absolute bottom-5 right-5 rounded-lg bg-white/50 px-4 py-2 shadow-lg backdrop-blur-sm">
                  <div className="text-sm font-medium text-green-3">
                    Premium Quality
                  </div>
                  <div className="text-xs text-gray-600">
                    Handcrafted Frames
                  </div>
                </div> */}
              </div>

              {/* Image Navigation Dots */}
              <div className="absolute -bottom-8 left-1/2 flex -translate-x-1/2 gap-2">
                {showcaseImages.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => setCurrentImageIndex(index)}
                    className={`h-2 rounded-full transition-all duration-300 ${
                      index === currentImageIndex
                        ? "w-8 bg-green-2"
                        : "w-2 bg-gray-300 hover:bg-green-2/50"
                    }`}
                    aria-label={`View image ${index + 1}`}
                  />
                ))}
              </div>
            </div>

            {/* Floating Cards */}
            <div className="absolute -right-4 top-8 animate-float rounded-xl bg-white p-4 shadow-xl max-sm:-right-2 max-sm:top-4 max-sm:p-3 lg:block">
              <div className="flex items-center gap-3">
                <div className="flex size-12 items-center justify-center rounded-full bg-green-2/20 max-sm:size-8">
                  <TruckIcon className="size-6 text-green-2 max-sm:size-5" />
                </div>
                <div>
                  <div className="text-sm font-semibold text-green-3 max-sm:text-xs">
                    {lang.hero.floating1Title ?? "Free Delivery"}
                  </div>
                  <div className="text-xs text-gray-600">{lang.hero.floating1Desc ?? "Island-wide"}</div>
                </div>
              </div>
            </div>

            <div className="absolute -left-8 bottom-6 animate-float-delayed rounded-xl bg-white p-4 shadow-xl max-sm:-left-2 max-sm:bottom-3 max-sm:p-3 lg:block">
              <div className="flex items-center gap-3">
                <div className="flex size-12 items-center justify-center rounded-full bg-green-2/20 max-sm:size-8">
                  <GiftIcon className="size-6 text-green-2 max-sm:size-5" />
                </div>
                <div>
                  <div className="text-sm font-semibold text-green-3 max-sm:text-xs">
                    {lang.hero.floating2Title ?? "Custom Design"}
                  </div>
                  <div className="text-xs text-gray-600">{lang.hero.floating2Desc ?? "Made to Order"}</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Background Decorative Elements | Reduce the opacity of App.jsx component's background color*/}
      {/* <div className="pointer-events-none absolute inset-0 -z-10 overflow-hidden">
        Grid pattern
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px]"></div>
        Gradient blobs
        <div className="absolute -left-32 top-0 h-[500px] w-[500px] animate-float rounded-full bg-green-600/10 blur-3xl"></div>
        <div className="absolute -bottom-0 -right-32 h-[600px] w-[600px] animate-float-delayed rounded-full bg-green-400/10 blur-3xl"></div>
      </div> */}
    </section>
  );
};

export default HeroSection;
