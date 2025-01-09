/** @type {import('tailwindcss').Config} */
export default {
  content: [
    './index.html',              // Incluye el archivo HTML para que Tailwind pueda encontrar clases allí
    './src/**/*.{js,jsx,ts,tsx}', // Incluye todos los archivos en la carpeta src (JSX, JS, TS, TSX)
  ],
  theme: {
    extend: {},
  },
  plugins: [],
}

