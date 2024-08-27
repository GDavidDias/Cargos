/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      boxShadow: {
        'right-only-xs': '2px 0 2px rgba(0, 0, 0, 0.15)', // sombra solo hacia la derecha
        'right-only-md': '2px 0 4px rgba(0, 0, 0, 0.15)', // sombra solo hacia la derecha
        'right-only-lg': '4px 0 4px rgba(0, 0, 0, 0.15)', // sombra solo hacia la derecha
      },
    },
  },
  plugins: [],
}

