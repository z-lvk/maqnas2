const defaultTheme = require('tailwindcss/defaultTheme');

module.exports = {
  content: ['./src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      colors: {
        'navy': {
          DEFAULT: '#1a2a4c',
          light: '#2a4a75',
        },
        'maroon': {
          DEFAULT: '#800000',
          dark: '#660000'
        },
        'brand-dark': {
          DEFAULT: '#121212',
          light: '#1e1e1e'
        },
        'brand-gray': {
          light: '#F0F2F5',
          DEFAULT: '#A0AEC0',
          dark: '#2D3748',
        },
        'sky-blue': '#89bbec',
        'sand-brown': '#7d889a',
      },
      fontFamily: {
        sans: ['"Inter"', ...defaultTheme.fontFamily.sans],
        arabic: ['"RH Zak"', ...defaultTheme.fontFamily.sans],
        title: ['"Poppins"', 'sans-serif'],
        titleArabic: ['"RH Zak"', 'serif']
      },
      // ADDED: Keyframes and animation for a fade-in-up effect
      keyframes: {
        fadeInUp: {
          '0%': { opacity: '0', transform: 'translateY(20px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
      },
      animation: {
        fadeInUp: 'fadeInUp 0.8s ease-out forwards',
      },
    },
  },
  plugins: [],
};