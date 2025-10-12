/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        "green-3": "#11422eff", // Deep Green
        "green-1": "#058754ff", // Dark Green
        "green-2": "#05b777ff", // Mid Green
        "gray-light": "#f5f5f5",
      },
      fontFamily: {
        inter: ["Inter", "sans-serif"],
      },
      borderRadius: {
        custom: "16px",
      },
      keyframes: {
        slideInRight: {
          '0%': {
            transform: 'translateX(100%)',
            opacity: '0',
          },
          '100%': {
            transform: 'translateX(0)',
            opacity: '1',
          },
        },
        slideOutRight: {
          '0%': {
            transform: 'translateX(0)',
            opacity: '1',
          },
          '100%': {
            transform: 'translateX(100%)',
            opacity: '0',
          },
        },
      },
      animation: {
        slideInRight: 'slideInRight 0.4s ease-out',
        slideOutRight: 'slideOutRight 0.3s ease-in',
      },
    },
  },
  plugins: [],
};
