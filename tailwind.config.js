/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        yellow: {
          300: '#DFBF58',
          400: '#D4AF37',
          500: '#B48222',
          600: '#916715',
        },
        gold: {
          light: '#DFBF58',
          DEFAULT: '#D4AF37',
          dark: '#B48222',
          deep: '#916715',
        }
      },
      fontFamily: {
        display: ['Barlow Condensed', 'sans-serif'],
        body: ['Outfit', 'sans-serif'],
      },
    },
  },
  plugins: [],
}
