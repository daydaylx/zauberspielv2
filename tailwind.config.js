/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        midnight: '#0f172a',   // Hintergrund Umgebung
        parchment: '#f4e4bc',  // Papierfarbe
        'parchment-dark': '#e3d3aa', // Papier Schatten
        ink: '#2b2118',        // Textfarbe
        accent: '#c0a062',     // Goldene Akzente
        'accent-light': '#deb874',
        danger: '#8f2a2a',
        mystic: '#4b5d67',
      },
      fontFamily: {
        title: ['Cinzel', 'serif'],
        serif: ['Cormorant Garamond', 'serif'],
        hand: ['Dancing Script', 'cursive'],
      },
      backgroundImage: {
        'vignette': 'radial-gradient(circle, transparent 40%, rgba(0,0,0,0.8) 100%)',
      },
      animation: {
        'fade-in': 'fadeIn 0.5s ease-out',
        'float': 'float 6s ease-in-out infinite',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0', transform: 'translateY(10px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-10px)' },
        }
      }
    },
  },
  plugins: [],
}