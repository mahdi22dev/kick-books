/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        text: "#081d1a",
        background: "#f7fdfc",
        darkBackground: "#020807",
        primary: "#48ccbc",
        secondary: "#8eb5e0",
        accent: "#6d8ad7",
      },
    },
  },
  plugins: [],
};
