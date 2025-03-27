/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    colors: {
      main: "var(--main-color)",
      primary: "var(--primary-color)",
      secondary: "var(--secondary-color)",
      gray: "var(--gray-color)",
      dark: "var(--dark-color)",
      blue: "var(--blue-color)",
      green: "var(--green-color)",
      greenSea: "var(--green-sea-color)",
      pumpkin: "var(--pumpkin-color)",
      red: "var(--red-color)",
      white: "var(--white-color)",
    },
  },
  plugins: [],
};
