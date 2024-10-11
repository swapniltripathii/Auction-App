// tailwind.config.js

module.exports = {
  purge: [],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      fontFamily: {
        poppins: ["Poppins", "sans-serif"],
      },
      height: {
        34: "8.5rem", // Adjust the value as per your design needs
      },
      BackgroundColour: {
        "app-black": "#121212",
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [
    require('tailwind-scrollbar'),
    function ({ addUtilities }) {
      addUtilities(
        {
          ".h-34": {
            height: "8.5rem", // Adjust the value as per your design needs
          },
        },
        ["responsive", "hover"]
      );
    },
  ],
};
