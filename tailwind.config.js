/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./Padrino/**/*.html"],
  theme: {
    extend: {
      colors: {
        'padrino-red': '#ed1c24',
        'padrino-green': '#5abc71',
        'padrino-orange': '#ff6b35',
        'padrino-yellow': '#ffc107',
        'padrino-brown': '#5b1212',
        'padrino-cream': '#fff8f0',
        'padrino-dark': '#1a1a1a',
      },
      fontFamily: {
        'kghappy': ['KGHAPPY', 'cursive'],
        'appleberry': ['Appleberry', 'cursive'],
        'body': ['Poppins', 'sans-serif'],
      },
    },
  },
  plugins: [],
}
