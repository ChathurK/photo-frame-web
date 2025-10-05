import { useState, useEffect } from 'react';

const LanguageSelector = ({ onLanguageSelect }) => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Check if language has been selected before
    const savedLanguage = localStorage.getItem('selectedLanguage');
    if (!savedLanguage) {
      setIsVisible(true);
    } else {
      onLanguageSelect(savedLanguage);
    }
  }, [onLanguageSelect]);

  const handleLanguageSelect = (language) => {
    localStorage.setItem('selectedLanguage', language);
    onLanguageSelect(language);
    setIsVisible(false);
  };

  if (!isVisible) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-custom p-8 max-w-md w-full text-center shadow-2xl">
        <h2 className="text-2xl font-bold text-green-3 mb-4">
          Select Your Language
        </h2>
        <p className="text-gray-600 mb-8 leading-relaxed">
          Choose your preferred language to continue
        </p>
        <div className="space-y-4">
          <button
            onClick={() => handleLanguageSelect('en')}
            className="w-full py-4 px-6 bg-green-2 text-white rounded-lg font-semibold hover:bg-green-1 transition-all duration-300 shadow-md hover:shadow-lg"
          >
            English
          </button>
          <button
            onClick={() => handleLanguageSelect('si')}
            className="w-full py-4 px-6 bg-green-2 text-white rounded-lg font-semibold hover:bg-green-1 transition-all duration-300 shadow-md hover:shadow-lg"
          >
            සිංහල
          </button>
        </div>
      </div>
    </div>
  );
};

export default LanguageSelector;