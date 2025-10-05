import { useState } from 'react';
import LanguageSelector from './components/LanguageSelector';
import Header from './components/Header';
import HeroSection from './components/HeroSection';
import WorksSection from './components/WorksSection';
import GallerySection from './components/GallerySection';
import AboutSection from './components/AboutSection';
import TestimonialsSection from './components/TestimonialsSection';
import OrderSection from './components/OrderSection';
import OrderPage from './components/OrderPage';
import Footer from './components/Footer';
import { translations } from './utils/translations';
import './App.css';

function App() {
  const [selectedLanguage, setSelectedLanguage] = useState('en');
  const [currentPage, setCurrentPage] = useState('home'); // 'home' or 'order'

  const handleLanguageSelect = (language) => {
    setSelectedLanguage(language);
  };

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  return (
    <div className="min-h-screen bg-gray-light">
      <LanguageSelector onLanguageSelect={handleLanguageSelect} />
      
      {currentPage === 'home' ? (
        <div className="px-5 pb-8 mx-auto max-w-container">
          <Header 
            language={selectedLanguage} 
            translations={translations} 
            onPageChange={handlePageChange}
          />
          <HeroSection language={selectedLanguage} translations={translations} />
          <WorksSection language={selectedLanguage} translations={translations} />
          <GallerySection />
          <AboutSection language={selectedLanguage} translations={translations} />
          <TestimonialsSection language={selectedLanguage} translations={translations} />
          <OrderSection 
            language={selectedLanguage} 
            translations={translations} 
            onPageChange={handlePageChange}
          />
          <Footer language={selectedLanguage} translations={translations} />
        </div>
      ) : (
        <OrderPage 
          language={selectedLanguage} 
          translations={translations}
          onPageChange={handlePageChange}
        />
      )}
    </div>
  );
}

export default App;
