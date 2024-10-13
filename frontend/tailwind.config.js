module.exports = {
  content: ['./src/**/*.{js,jsx,ts,tsx}', './public/index.html'], // Paths for Tailwind to scan
  darkMode: 'class', // Dark mode based on class
  theme: {
    extend: {
      fontFamily: {
        poppins: ['Poppins', 'sans-serif'], // Custom font family
      },
      height: {
        34: '8.5rem', // Custom height utility
      },
      backgroundColor: {
        'app-black': '#121212', // Custom background color
      },
    },
  },
  plugins: [
    require('tailwind-scrollbar'), // Scrollbar plugin
  ],
};
