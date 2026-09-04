/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          50: '#f2f9f3',
          100: '#e1f2e5',
          200: '#c4e5cb',
          300: '#97d1a4',
          400: '#64b677',
          500: '#3e9a54',
          600: '#2e7d40',
          700: '#266334',
          800: '#224f2c',
          900: '#1d4226',
          950: '#0c2413',
        },
        earth: {
          50: '#fbf8f3',
          100: '#f5efe4',
          200: '#ebdeca',
          300: '#dec7a8',
          400: '#ceaa82',
          500: '#bf9265',
          600: '#a77651',
          700: '#875c43',
          800: '#6f4b3a',
          900: '#5c3e32',
        }
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', '-apple-system', 'Segoe UI', 'Roboto', 'sans-serif'],
      }
    },
  },
  plugins: [],
}
