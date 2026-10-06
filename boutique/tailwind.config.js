/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        obsidian: {
          950: '#070809',
          900: '#0e1013',
          800: '#16181d',
          700: '#22252c',
          600: '#323640',
        },
        brass: {
          300: '#e5d1a4',
          400: '#d4ba7d',
          500: '#c5a059',
          600: '#ab8441',
          700: '#89642e',
        },
        ivory: {
          50: '#fdfcf9',
          100: '#f8f5ee',
          200: '#eee8da',
          300: '#dfd4bd',
        },
        sand: '#9e978e'
      },
      fontFamily: {
        serif: ['"Playfair Display"', 'Georgia', 'serif'],
        sans: ['"Inter"', 'system-ui', '-apple-system', 'sans-serif'],
        display: ['"Cormorant Garamond"', 'Georgia', 'serif'],
      }
    },
  },
  plugins: [],
}
