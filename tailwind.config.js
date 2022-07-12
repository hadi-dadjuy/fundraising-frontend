/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        dosis: ['"Dosis"', "sans-serif"],
      },
      boxShadow: {
        md: "0 4px 6px -1px rgba(145, 24, 182, 0.5)",
        xl: "0 20px 25px -5px rgba(145, 24, 182, 0.5)",
      },
    },
  },
  plugins: [],
};
