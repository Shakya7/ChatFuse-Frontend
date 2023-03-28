/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      screens:{
        xmd:"940px"
      },
      fontFamily:{
        fascinate:['"Fascinate","ui-sans-serif"'],
        nunito:['"Nunito","ui-sans-serif"'],
        poppins:['"Poppins","ui-sans-serif"']
      }
    },
  },
  plugins: [],
}
