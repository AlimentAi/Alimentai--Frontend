/** @type {import('tailwindcss').Config} */
export default {
  darkMode: 'class',
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
    "./**/@material-tailwind/**/*.{html,js,ts,jsx,tsx,mdx}"
  ],
  theme: {
    extend: {
      backgroundImage: {
        'image-login': "url('/src/assets/image-login.png')",
        'image-cadastrar': "url('/src/assets/image-cadastrar.png')",
        'icon-voltar': "url('/src/assets/button-voltar.png')"
      }
    },
  },
  plugins: [],
}

