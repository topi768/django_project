/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
    "./src/components/**/*.{js,jsx,ts,tsx}",
  ],

  theme: {
    extend: {
      fontFamily: {
        sans: ["Arial", "sans-serif"],
        serif: ["Georgia", "serif"],
        mono: ["Menlo", "Monaco", "Courier New", "monospace"],
        NauryzRedKeds: ["NauryzRedKeds", "serif"],
      },
      colors: {
        primary: "#8484F0",
        btnDisabled: "#C9C9ED",
        grey: "#DFDFDF",
        grey02: "#F5F8F9",
      },
    },
  },
  plugins: [],
};
