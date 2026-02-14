import { heroui } from "@heroui/react"

export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
    "./node_modules/@heroui/theme/dist/**/*.{js,ts,jsx,tsx}"
  ],
  theme: {
    extend: {
      colors: {
        'gmmi-navy': {
          DEFAULT: '#0f172a',
          50: '#f8fafc',
          100: '#f1f5f9',
          200: '#e2e8f0',
          300: '#cbd5e1',
          400: '#94a3b8',
          500: '#64748b',
          600: '#475569',
          700: '#334155',
          800: '#1e293b',
          900: '#0f172a',
        },
        'gmmi-gold': {
          DEFAULT: '#D4AF37',
          50: '#fcf9ed',
          100: '#f9f3d1',
          200: '#f2e59b',
          300: '#ebd165',
          400: '#e4b63a',
          500: '#d4af37',
          600: '#ad8729',
          700: '#8a6623',
          800: '#735221',
          900: '#61441f',
        },
      },
      fontFamily: {
        sans: ['"Inter"', 'sans-serif'],
        heading: ['"Poppins"', 'sans-serif'],
      },
      animation: {
        'bounce-slow': 'bounce 3s infinite',
      }
    },
  },
  darkMode: "class",
  plugins: [heroui()],
}