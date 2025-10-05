/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'green-1': '#227c53', // Dark Green
        'green-2': '#34a86d', // Mid Green
        'green-3': '#073c2a', // Deep Green
        'gray-light': '#f5f5f5',
      },
      fontFamily: {
        'inter': ['Inter', 'sans-serif'],
      },
      borderRadius: {
        'custom': '16px',
      },
      maxWidth: {
        'container': '1100px',
      }
    },
  },
  plugins: [],
}