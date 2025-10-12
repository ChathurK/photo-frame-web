// Utility to generate placeholder images for development
export const generatePlaceholderImage = (width, height, text = "") => {
  return `https://via.placeholder.com/${width}x${height}/34a86d/ffffff?text=${encodeURIComponent(text)}`;
};

// For production, replace with actual image URLs
export const getImageUrl = (imagePath) => {
  // In development, use placeholder
  if (import.meta.env.DEV) {
    return imagePath.replace(
      "/api/placeholder/",
      "https://via.placeholder.com/",
    );
  }
  // In production, use actual images from your CDN/server
  return imagePath;
};
