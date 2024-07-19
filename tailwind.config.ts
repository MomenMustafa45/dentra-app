/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./App.{js,jsx,ts,tsx}",
    "./app/**/*.{js,jsx,ts,tsx}",
    "./components/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        theme: {
          primary: "#2ECD71",
          secondry: "#D6D6Df",
          tertiary: "#C7C7C7",
          quaternary: "#EBEBF4",
          quinary: "#63637F",
        },
      },
    },
  },
  plugins: [],
};
