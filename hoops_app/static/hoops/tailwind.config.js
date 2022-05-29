module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {},
    minHeight: {
      "1/2": "50%",
    },
  },
  plugins: [require("tailwind-scrollbar-hide")],
};
