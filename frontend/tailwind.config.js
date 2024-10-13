module.exports = {
  purge: ['./src/**/*.{js,jsx,ts,tsx}', './public/index.html'], // Add paths for optimization
  darkMode: 'class', // Enable dark mode class-based, or you can use 'media'
  theme: {
    extend: {
      fontFamily: {
        poppins: ['Poppins', 'sans-serif'],
      },
      height: {
        34: '8.5rem', // Custom height utility
      },
      backgroundColor: {
        'app-black': '#121212', // Corrected spelling to backgroundColor
      },
    },
  },
  plugins: [
    require('tailwind-scrollbar'), // Useful plugin
  ],
};
