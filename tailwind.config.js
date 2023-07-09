/** @type {import('tailwindcss').Config} */
const colors = require('tailwindcss/colors');

module.exports = {
  mode: 'jit',
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    screens: {
      md: '768px',
      lg: '1024px',
      xl: '1440px',
    },
    colors: {
      transparent: 'transparent',
      black: colors.black,
      white: colors.white,
      zinc: colors.zinc,
      yellow: colors.yellow,
      green: colors.green,
      red: colors.red,
      orange: colors.orange,
      blue: colors.blue,
    },
    extend: {
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic':
          'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
      },
      fontFamily: {
        sans: ['var(--font-cabinet-grotesk)'],
      },
    },
  },
  plugins: [],
};
