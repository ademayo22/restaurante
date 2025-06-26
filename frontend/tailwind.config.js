/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}", // que tome todo en src con esas extensiones
  ],
  theme: {
    extend: {
      colors: {
        vino: "#5E1224",
        "vino-dark": "#3A0D1A",
        beige: "#F3E9DB",
        oro: "#B38B59",
        "chocolate": "#3A2A1F",
        oliva: "#6B7D4E",
        terracota: "#A0453E",
      },
    },
  },
  plugins: [],
};
