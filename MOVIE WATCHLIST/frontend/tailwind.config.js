/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      colors: {
        background: '#0a0a0a',
        surface: '#141414',
        panel: '#1f1f1f',
        brand: '#e50914',
        accent: '#f5c518',
        muted: '#b3b3b3',
      },
      boxShadow: {
        glow: '0 16px 60px rgba(229, 9, 20, 0.2)',
      },
      borderRadius: {
        xl: '1rem',
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
      },
    },
  },
  plugins: [],
}

