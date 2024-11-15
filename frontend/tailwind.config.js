module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      keyframes: {
        colorChange: {
          "0%": { color: "#831C80FF" }, 
          "33%": { color: "#3F10A5FF" }, 
          "66%": { color: "#13881BFF" }, 
          "100%": { color: "#831C80FF" }, 
        },
      },
      animation: {
        colorChange: "colorChange 10s ease infinite",
      },
    },
  },
  plugins: [],
};
