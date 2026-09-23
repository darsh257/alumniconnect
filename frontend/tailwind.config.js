/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        background: '#f8fafc',
        surface: '#ffffff',
        primary: {
          DEFAULT: '#1e3a8a',
          hover: '#172554',
        },
        secondary: {
          DEFAULT: '#2563eb',
          hover: '#1d4ed8',
        },
        tertiary: {
          DEFAULT: '#059669',
          bg: '#ecfdf5',
          border: '#a7f3d0',
          text: '#065f46',
        },
        border: '#e2e8f0',
        text: {
          primary: '#0f172a',
          secondary: '#334155',
          muted: '#64748b',
        },
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
        display: ['Plus Jakarta Sans', 'Geist', 'sans-serif'],
      },
      boxShadow: {
        level1: '0 1px 3px 0 rgba(15, 23, 42, 0.04), 0 1px 2px -1px rgba(15, 23, 42, 0.02)',
        level2: '0 4px 6px -1px rgba(15, 23, 42, 0.05), 0 2px 4px -2px rgba(15, 23, 42, 0.03)',
        level3: '0 10px 15px -3px rgba(15, 23, 42, 0.06), 0 4px 6px -4px rgba(15, 23, 42, 0.03)',
        level4: '0 20px 25px -5px rgba(15, 23, 42, 0.08), 0 8px 10px -6px rgba(15, 23, 42, 0.04)',
      },
    },
  },
  plugins: [],
}
