/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        primary: '#B76E79',
        secondary: '#F5ECE6',
        accent: '#3C2A24',
      },
      fontFamily: {
        playfair: ['"Playfair Display"', 'serif'],
        montserrat: ['Montserrat', 'sans-serif'],
        lato: ['Lato', 'sans-serif'],
        cormorant: ['"Cormorant Garamond"', 'serif'],
      },
      backgroundImage: {
        'hero-pattern': "url('https://images.unsplash.com/photo-1614270532514-904c3aa5628e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1920&q=80')",
      },
    },
  },
  plugins: [],
};