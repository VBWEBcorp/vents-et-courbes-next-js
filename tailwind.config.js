/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./app/**/*.{js,ts,jsx,tsx}', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        'mono': ['Space Mono', 'monospace'],
        'sans': ['Space Mono', 'monospace'],
      },
      colors: {
        'primary': {
          400: '#D56449',
          500: '#C4553C',
          600: '#B3462F',
        },
        'green': {
          400: '#68D391',
          500: '#48BB78',
          600: '#38A169',
        },
        'blue': {
          400: '#63B3ED',
          500: '#4299E1',
          600: '#3182CE',
        },
        'custom': {
          'dark': '#2B2B2B',
        }
      }
    },
  },
  plugins: [],
};
