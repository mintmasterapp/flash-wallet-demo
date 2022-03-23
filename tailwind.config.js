module.exports = {
  purge: [],
  darkMode: false, // or 'media' or 'class'
  theme: {
    fontFamily:{
      sans: ['Nova Mono', 'monospace'],
      serif: ['Nova Mono', 'monospace'],
    },
    extend: {},
  },
  variants: {
    extend: {},
  },
  plugins: [require('@tailwindcss/forms')],
}
