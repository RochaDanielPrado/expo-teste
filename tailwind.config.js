/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/**/*.{js,jsx,ts,tsx}',
    './app/**/*.{js,jsx,ts,tsx}',
  ],
  presets: [require('nativewind/preset')],
  theme: {
    extend: {
      colors: {
        primary: '#137fec',
        'primary-dark': '#0f66bd',
        'background-light': '#f6f7f8',
        'background-dark': '#101922',
        'surface-dark': '#1e2936',
        'surface-highlight': '#2d3b4b',
      },
      fontFamily: {
        display: ['Inter', 'sans-serif'],
      },
    },
  },
  plugins: [],
}

