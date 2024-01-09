import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './src/**/*.{js,ts,jsx,tsx,mdx}'
  ],
  theme: {
    extend: {
      colors: {
        "primary-50": "#fff2e6",
        "primary-100": "#fddec3",
        "primary-400": "#f8973f",
        "primary-500": "#f77e10",
        "primary-600": "#e65400"
      },
      keyframes: {
        spinner: {
          '0%': { transform: 'rotate(0.0deg)' },
          '100%': { transform: 'rotate(360deg)' },
        },
      },
      animation: {
        'spinner-linear': 'spinner 1s linear infinite',
        'spinner-ease': 'spinner 1s ease-in infinite'
      },
    },
  },
  plugins: [
    require('@tailwindcss/forms')
  ],
};

export default config;
