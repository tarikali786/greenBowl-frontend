/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      boxShadow: {
        lg: "0 0 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)",
      },
    },
    screens: {
      sm: "480px",
      mm: "500px",
      md: "768px",
      lg: "976px",
      xl: "1440px",
    },
    colors: {
      green: {
        500: "#2a9400",
        600: " #34b900",
        100: "#a4e989",
      },
      white: {
        500: "#FFFFFF",
        400: "#e0e0e0",
        300: "#c1c1c1",
        200: "#b5b5b5",
        100: "#f8f8f8",
      },
      black: {
        600: " #1F1F1F",
        500: "#000000",
        400: "#1E2022",
        300: "#333333cc",
        200: "#1E2022",
        100: "#dadada",
      },
      red: {
        600: "#d9534f",
        400: "#03c9d7",
        500: " #ff6f61",
      },
      blue: {
        500: "#00b0ff",
      },
    },
    backgroundImage: {
      "greenbowl-gradient": "linear-gradient(135deg, #2a9400, #ff6f61)",
    },
  },
  plugins: [],
};
