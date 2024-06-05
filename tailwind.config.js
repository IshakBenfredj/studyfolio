/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    container: {
      center: true,
      padding: {
        DEFAULT: "10px",
        md: "50px",
      },
    },
    extend: {
      colors: {
        primary: "#0f47ad",
        secondary: "#1d1d27",
        third: "#e1e7ef",
      },
      screens: {
        sc: "992px",
      },
    },
  },
  plugins: [],
};
