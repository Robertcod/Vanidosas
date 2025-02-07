/** @type {import('tailwindcss').Config} */
export default {
  darkMode: 'class', // Esto habilita el modo oscuro basado en la clase 'dark'
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}", // Esto incluye todos los archivos en src y subcarpetas
    "./src/components/**/*.{js,ts,jsx,tsx}" // Asegura que también lea los componentes
  ],
  theme: {
    extend: {},
  },
  plugins: [],
}
