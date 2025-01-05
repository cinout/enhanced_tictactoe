/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        playerX1: "#6ea9cb",
        playerX2: "#94d5b8",
        playerO1: "#DD9F84",
        playerO2: "#D5AEA2",
        // playerO2: "#f1dfa1",
      },
      animation: {
        winnerJump: "winnerJump infinite 1s",
      },
      keyframes: {
        winnerJump: {
          "0%, 100%": {
            transform: "translateY(-20%)",
            "animation-timing-function": "cubic-bezier(0.8,0,1,1)",
          },
          "50%": {
            transform: "translateY(0)",
            "animation-timing-function": "cubic-bezier(0,0,0.2,1)",
          },
        },
      },
    },
  },
  plugins: [
    function ({ addVariant }) {
      addVariant("not-disabled", "&:not(:disabled)");
    },
  ],
};
