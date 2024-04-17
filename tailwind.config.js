/** @type {import('tailwindcss').Config} */
export default {
  darkMode: 'class',
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        'image-Login': "url('/src/assets/Image-login.png')",
        'icon-voltar': "url('/src/assets/button-voltar.png')"
      }
    },
  },
  plugins: [],
}

