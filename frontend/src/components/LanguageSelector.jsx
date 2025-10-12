import { useState, useEffect } from "react";
import { useScrollLock } from "./hooks/useScrollLock";

const LanguageSelector = ({ onLanguageSelect }) => {
  const [isVisible, setIsVisible] = useState(false);

  // Lock scroll when modal is visible
  useScrollLock(isVisible);

  useEffect(() => {
    // Check if language has been selected before
    const savedLanguage = localStorage.getItem("selectedLanguage");
    if (!savedLanguage) {
      setIsVisible(true);
    } else {
      onLanguageSelect(savedLanguage);
    }
  }, [onLanguageSelect]);

  const handleLanguageSelect = (language) => {
    localStorage.setItem("selectedLanguage", language);
    onLanguageSelect(language);
    setIsVisible(false);
  };

  if (!isVisible) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div className="m-2 w-full max-w-md rounded-lg bg-white p-8 text-center shadow-2xl">
        <h2 className="mb-2 text-xl font-semibold text-green-3 md:text-2xl">
          Select Your Preferred Language
        </h2>
        <h2 className="mb-4 text-xl font-semibold text-green-3 md:text-2xl">
          ඔබ කැමති භාෂාව තෝරන්න
        </h2>
        <div className="space-y-4">
          <button
            onClick={() => handleLanguageSelect("en")}
            className="w-full rounded-lg bg-green-2 px-6 py-4 text-lg font-semibold text-white transition-colors duration-300 hover:bg-green-1 md:text-xl"
          >
            English
          </button>
          <button
            onClick={() => handleLanguageSelect("si")}
            className="w-full rounded-lg bg-green-2 px-6 py-4 text-lg font-semibold text-white transition-colors duration-300 hover:bg-green-1 md:text-xl"
          >
            සිංහල
          </button>
        </div>
      </div>
    </div>
  );
};

export default LanguageSelector;
