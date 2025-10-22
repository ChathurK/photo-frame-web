import React, { useState, useEffect } from 'react';

const DesignGallery = ({ onSelectDesign, selectedDesignId }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedDesign, setSelectedDesign] = useState(selectedDesignId);
  const [modalImage, setModalImage] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  
  const DESIGNS_PER_PAGE = 8; // 2x4 grid (2 rows, 4 columns)
  
  // Generate array of design numbers (1-100)
  const allDesigns = Array.from({ length: 100 }, (_, i) => i + 1);
  
  // Filter designs based on search
  const filteredDesigns = searchTerm
    ? allDesigns.filter(num => num.toString().includes(searchTerm))
    : allDesigns;
  
  // Calculate pagination
  const totalPages = Math.ceil(filteredDesigns.length / DESIGNS_PER_PAGE);
  const startIndex = (currentPage - 1) * DESIGNS_PER_PAGE;
  const endIndex = startIndex + DESIGNS_PER_PAGE;
  const currentDesigns = filteredDesigns.slice(startIndex, endIndex);
  
  // Import design images dynamically
  const getDesignImage = (designNumber) => {
    try {
      // Handle single digit numbers (1-9) with leading zero (01, 02, etc.)
      const fileName = designNumber < 10 
        ? `DT 0${designNumber}.jpg`  // DT 01.jpg, DT 02.jpg, etc.
        : `DT ${designNumber}.jpg`;   // DT 10.jpg, DT 11.jpg, etc.
      return new URL(`../assets/100 design collection final/${fileName}`, import.meta.url).href;
    } catch (error) {
      console.error(`Failed to load design ${designNumber}:`, error);
      return null;
    }
  };
  
  const handleSelectDesign = (designNumber) => {
    // Toggle selection: if already selected, deselect it
    if (selectedDesign === designNumber) {
      setSelectedDesign(null);
      onSelectDesign(null);
    } else {
      setSelectedDesign(designNumber);
      onSelectDesign(designNumber);
    }
  };
  
  const handleNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };
  
  const handlePrevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };
  
  const handlePageJump = (pageNum) => {
    setCurrentPage(pageNum);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };
  
  // Reset to page 1 when search changes
  useEffect(() => {
    setCurrentPage(1);
  }, [searchTerm]);
  
  return (
    <div className="design-gallery">
      {/* Header with Search */}
      <div className="mb-6">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div>
            <h3 className="text-xl font-semibold text-green-3 mb-1">
              Select Your Design
            </h3>
            <p className="text-sm text-gray-600">
              Choose from {filteredDesigns.length} available designs
            </p>
          </div>
          
          {/* Search Box */}
          <div className="relative w-full md:w-64">
            <input
              type="text"
              placeholder="Search design number..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full rounded-lg border border-gray-300 py-2 pl-10 pr-4 focus:border-green-3 focus:ring-2 focus:ring-green-2"
            />
            <svg
              className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
              />
            </svg>
          </div>
        </div>
      </div>
      
      {/* Design Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3 md:gap-4 mb-6">
        {currentDesigns.map((designNum) => {
          const isSelected = selectedDesign === designNum;
          return (
            <div
              key={designNum}
              onClick={() => handleSelectDesign(designNum)}
              className={`relative cursor-pointer rounded-lg overflow-hidden transition-all duration-200 ${
                isSelected
                  ? 'ring-4 ring-green-3 shadow-xl scale-105'
                  : 'ring-1 ring-gray-200 hover:ring-2 hover:ring-green-2 hover:shadow-lg'
              }`}
            >
              {/* Image */}
              <div className="aspect-square bg-gray-100">
                <img
                  src={getDesignImage(designNum)}
                  alt={`Design ${designNum}`}
                  loading="lazy"
                  className="w-full h-full object-cover"
                />
              </div>
              
              {/* Design Number Badge */}
              <div className={`absolute top-2 left-2 px-2 py-1 rounded-md text-xs font-semibold pointer-events-none ${
                isSelected
                  ? 'bg-green-3 text-white'
                  : 'bg-black bg-opacity-60 text-white'
              }`}>
                DT {designNum}
              </div>
              
              {/* Selected Checkmark - No overlay, just checkmark icon */}
              {isSelected && (
                <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                  <div className="bg-green-3 rounded-full p-2 text-white shadow-xl">
                    <svg
                      className="h-8 w-8"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path
                        fillRule="evenodd"
                        d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </div>
                </div>
              )}
              
              {/* Zoom Icon Button - Click to preview */}
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  setModalImage(getDesignImage(designNum));
                }}
                className="absolute bottom-2 right-2 bg-black bg-opacity-60 rounded-full p-1.5 text-white hover:bg-opacity-80 hover:scale-110 transition-all cursor-pointer z-10"
                aria-label="Preview design"
              >
                <svg
                  className="h-4 w-4"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM10 7v6m3-3H7"
                  />
                </svg>
              </button>
            </div>
          );
        })}
      </div>
      
      {/* Pagination */}
      {totalPages > 1 && (
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mt-6 pt-6 border-t border-gray-200">
          {/* Page Info */}
          <div className="text-sm text-gray-600">
            Page {currentPage} of {totalPages} • Showing {startIndex + 1}-{Math.min(endIndex, filteredDesigns.length)} of {filteredDesigns.length} designs
          </div>
          
          {/* Navigation Buttons */}
          <div className="flex items-center gap-2">
            <button
              onClick={handlePrevPage}
              disabled={currentPage === 1}
              className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                currentPage === 1
                  ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                  : 'bg-green-2 text-white hover:bg-green-3'
              }`}
            >
              Previous
            </button>
            
            {/* Page Numbers (show max 5) */}
            <div className="hidden sm:flex items-center gap-1">
              {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
                let pageNum;
                if (totalPages <= 5) {
                  pageNum = i + 1;
                } else if (currentPage <= 3) {
                  pageNum = i + 1;
                } else if (currentPage >= totalPages - 2) {
                  pageNum = totalPages - 4 + i;
                } else {
                  pageNum = currentPage - 2 + i;
                }
                
                return (
                  <button
                    key={pageNum}
                    onClick={() => handlePageJump(pageNum)}
                    className={`w-10 h-10 rounded-lg font-medium transition-colors ${
                      currentPage === pageNum
                        ? 'bg-green-3 text-white'
                        : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                    }`}
                  >
                    {pageNum}
                  </button>
                );
              })}
            </div>
            
            <button
              onClick={handleNextPage}
              disabled={currentPage === totalPages}
              className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                currentPage === totalPages
                  ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                  : 'bg-green-2 text-white hover:bg-green-3'
              }`}
            >
              Next
            </button>
          </div>
        </div>
      )}
      
      {/* Modal for Image Preview */}
      {modalImage && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-90 p-4"
          onClick={() => setModalImage(null)}
        >
          <div className="relative max-w-4xl max-h-[90vh]">
            <button
              onClick={() => setModalImage(null)}
              className="absolute -top-12 right-0 text-white hover:text-gray-300 transition-colors"
            >
              <svg
                className="h-8 w-8"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
            <img
              src={modalImage}
              alt="Design Preview"
              className="max-w-full max-h-[90vh] object-contain rounded-lg"
              onClick={(e) => e.stopPropagation()}
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default DesignGallery;
