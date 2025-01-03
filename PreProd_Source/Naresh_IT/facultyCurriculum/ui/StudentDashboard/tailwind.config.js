module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    screens: {
      sm: "640px",
      md: "768px",
      lg: "1024px",
      xl: "1280px",
      "2xl": "1500px",
    },
    extend: {
      animation: {
        "slow-ping": "pulse 1.4s ease-in infinite",
      },
    },
  },
  plugins: [],
};
