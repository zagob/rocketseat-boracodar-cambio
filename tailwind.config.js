/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,js,tsx}"],
  theme: {
    extend: {
      backgroundImage: {
        chevron: "url('/assets/chevron-down-line.svg')",
      },
    },
  },
  plugins: [],
};
