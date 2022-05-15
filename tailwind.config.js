const safe = [];

module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{vue,js,ts,jsx,tsx}",
    './public/svg/**/*.svg'
  ],
  safelist: safe,
  theme: {
    extend: {
      fontFamily: {
        'body': ['Raleway', 'sans-serif'],
        'title': ['Panchang', 'sans-serif']
      },
      fontSize: {
        '40': '40px',
        '30': '30px',
        '22': '22px',
        '20': '20px',
        '16': '16px',
        '14': '14px',
        '12': '12px',
        '11': '11px'
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
      },
      blur: {
        xs: '2px',
      }
    },
  },
  plugins: [],
}
