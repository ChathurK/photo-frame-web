/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    container: {
      screens: {
        'sm': '640px',
        'md': '768px',
        'lg': '1024px',
        'xl': '1280px',
      },
    },
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
          "0%": {
            transform: "translateX(100%)",
            opacity: "0",
          },
          "100%": {
            transform: "translateX(0)",
            opacity: "1",
          },
        },
        slideInLeft: {
          "0%": {
            transform: "translateX(-100%)",
            opacity: "0",
          },
          "100%": {
            transform: "translateX(0)",
            opacity: "1",
          },
        },
        slideInBottom: {
          "0%": {
            transform: "translateY(100%)",
            opacity: "0",
          },
          "100%": {
            transform: "translateY(0)",
            opacity: "1",
          },
        },
        slideOutRight: {
          "0%": {
            transform: "translateX(0)",
            opacity: "1",
          },
          "100%": {
            transform: "translateX(100%)",
            opacity: "0",
          },
        },
        float: {
          "0%, 100%": {
            transform: "translateY(0)",
          },
          "50%": {
            transform: "translateY(-10px)",
          },
        },
      },
      animation: {
        slideInRight: "slideInRight 0.4s ease-out",
        "slideInRight-delayed": "slideInRight 0.8s ease-out",
        "slideInLeft-delayed": "slideInLeft 0.8s ease-out",
        slideInBottom: "slideInBottom 0.5s ease-out",
        slideOutRight: "slideOutRight 0.3s ease-in",
        float: "float 3s ease-in-out infinite",
        "float-delayed": "float 3s ease-in-out infinite 1.5s",
      },
    },
  },
  plugins: [],
};
