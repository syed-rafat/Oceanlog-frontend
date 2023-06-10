/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],

  theme: {
    screens: {
      '2xl': {'max': '1535px'},
      // => @media (max-width: 1535px) { ... }

      'xl': {'max': '1279px'},
      // => @media (max-width: 1279px) { ... }

      'lg': {'max': '1023px'},
      // => @media (max-width: 1023px) { ... }

      'md': {'max': '767px'},
      // => @media (max-width: 767px) { ... }

      'sm': {'max': '639px'},
      // => @media (max-width: 639px) { ... }

      '34em': {'min': '34em '},
    },
    extend: {
      fontFamily: {
        inter: "Inter",
        workSans: "Work Sans",
        openSans: "Open Sans",
        pangram: ["PangramSans", "sans"],
        merriweather: "Merriweather",
      
    }},
  },

  plugins: [],
}