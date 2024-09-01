import daisyui from 'daisyui';

/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{js,ts,jsx,tsx,mdx}'],
  theme: {
    extend: {
      colors: {
        bg: '#0a0a0a',
        'text-gray': '#a3a3a3',
        'bg-active': '#171717',
        'bg--lighter': '#171717',
        'btn-bg': '#262626',
        'active-alt': '#262626',
        border: '#262626',
        brand: ' #ff5b00'
      },
    },
  },
  plugins: [daisyui],
  daisyui: {
    themes: ['light'],
  },
};
