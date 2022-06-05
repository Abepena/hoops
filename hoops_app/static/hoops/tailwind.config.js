const defaultTheme = require("tailwindcss/defaultTheme");

module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  plugins: [require("tailwind-scrollbar-hide"), require("daisyui")],
  daisyui: {
    themes: [
      {
        mytheme: {
          primary: "#F97315",
          secondary: "#fca311",
          accent: "#e5e5e5",
          neutral: "#3d4451",
          "base-100": "#2A303C",
        },
      },
    ],
  },
};
