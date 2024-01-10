const plugin = require('tailwindcss/plugin');

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        "typography-black": "rgba(0, 0, 0, 0.87)",
        primary: "#FFAA33",
        "primary-light": "#FFB133",
        "primary-dark": "#FF6200",
        "on-primary": "rgba(0, 0, 0, 0.87)"
      },
      fontFamily: {
        body: 'Roboto, sans-serif',
        logo: '"Roboto Condensed", sans-serif'
      }
    },
  },
  plugins: [
    plugin(function({ addVariant }) {
      addVariant("kb-focus", ".kb-focus &:focus");
    })
  ],
}
