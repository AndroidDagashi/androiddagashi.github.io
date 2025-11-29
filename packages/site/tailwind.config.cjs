 
const colors = require('tailwindcss/colors')

module.exports = {
  content: [
    './app/components/**/*.{vue,ts}',
    './app/layouts/**/*.vue',
    './app/pages/**/*.vue',
    './app/plugins/**/*.ts',
    './nuxt.config.ts',
  ],
  theme: {
    extend: {
      colors: {
        transparent: 'transparent',
        green: colors.green,
        emerald: colors.emerald,
        teal: colors.teal,
        lime: colors.lime,
        sky: colors.sky,
      },
      fontFamily: {
        roboto: ['Roboto', 'sans-serif'],
      },
    },
  },
  plugins: [require('@tailwindcss/forms')],
}
