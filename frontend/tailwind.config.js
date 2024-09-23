module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      keyframes: {
        bounce: {
          '0%, 100%': {
            transform: 'translateY(0)',
            opacity: '1',
          },
          '50%': {
            transform: 'translateY(-20px)',
            opacity: '0.7',
          },
        },
      },
      animation: {
        bounce: 'bounce 1s infinite',
        bounce200: 'bounce 1s infinite 200ms',
        bounce400: 'bounce 1s infinite 400ms',
      },
    },
  },
  plugins: [],
}