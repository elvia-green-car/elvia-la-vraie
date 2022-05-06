module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{vue,js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        'body': ['Raleway', 'sans-serif']
      },
      fontSize: {
        '16': '16px',
        '12': '12px'
      },
      colors: {
        'green': {
          'normal': 'var(--green-normal)',
          'light': 'var(--green-light)',
        },
        'yellow': {
          'normal': 'var(--yellow-normal)',
          'light': 'var(--yellow-light)',
        }
      }
    },
  },
  plugins: [],
}
