/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./**/*.html'],
  theme: {
    extend: {
      margin: {
        auto: 'auto'
      },
      width: {
        big: '1535px',
        input: '1303px',
      },
      border: {
        min: '2px'
      }
    },
  },
  plugins: [],
}

