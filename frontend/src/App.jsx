import { useState } from "react";
import LanguageSelector from "./components/LanguageSelector";
import Header from "./components/Header";
import HeroSection from "./components/HeroSection";
import GallerySection from "./components/GallerySection";
import AboutSection from "./components/AboutSection";
import TestimonialsSection from "./components/TestimonialsSection";
import OrderSection from "./components/OrderSection";
import OrderPage from "./components/OrderPage";
import Footer from "./components/Footer";
import { translations } from "./utils/translations";
import "./App.css";
import ScreenSizeIndicator from "./components/ScreenSizeIndicator";
import ScrollerToTopBtn from "./components/hooks/ScrollerToTopBtn";

function App() {
  const [selectedLanguage, setSelectedLanguage] = useState("en");
  const [currentPage, setCurrentPage] = useState("home");

  const handleLanguageSelect = (language) => {
    setSelectedLanguage(language);
  };

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  return (
    <div className="min-h-screen bg-gray-light">
      <LanguageSelector onLanguageSelect={handleLanguageSelect} />

      {currentPage === "home" ? (
        <div className="mx-auto max-w-screen-xl">
          <Header
            language={selectedLanguage}
            translations={translations}
            onPageChange={handlePageChange}
          />
          <HeroSection
            language={selectedLanguage}
            translations={translations}
            onPageChange={handlePageChange}
          />
          <GallerySection
            language={selectedLanguage}
            translations={translations}
          />
          <AboutSection
            language={selectedLanguage}
            translations={translations}
          />
          <TestimonialsSection
            language={selectedLanguage}
            translations={translations}
          />
          <OrderSection
            language={selectedLanguage}
            translations={translations}
            onPageChange={handlePageChange}
          />
          <ScrollerToTopBtn />
        </div>
      ) : (
        <OrderPage
          language={selectedLanguage}
          translations={translations}
          onPageChange={handlePageChange}
        />
      )}
      <Footer
        language={selectedLanguage}
        translations={translations}
        currentPage={currentPage}
      />
      <ScreenSizeIndicator />
      
    </div>
  );
}

export default App;
