/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./public/**/*.html", "./public/**/*.js"],
  theme: {
    extend: {
      fontFamily: {
        sans: ["Inter", "system-ui", "sans-serif"],
        display: ["DM Sans", "system-ui", "sans-serif"],
      },
      colors: {
        ink: {
          50: "#f4f6f8",
          100: "#e8ecf0",
          200: "#c5ced8",
          300: "#9aa8b8",
          400: "#6b7d92",
          500: "#4a5d73",
          600: "#354759",
          700: "#273544",
          800: "#1c2632",
          900: "#121a22",
        },
        accent: {
          DEFAULT: "#0d9488",
          light: "#14b8a6",
          dark: "#0f766e",
        },
      },
    },
  },
  plugins: [],
};
