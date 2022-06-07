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
        '80': '80px',
        '60': '60px',
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
        'beige': "#FFFAFA",
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
      },
      animation: {
        'spin-slow': 'spin 7s linear infinite',
      }
    },
  },
  plugins: [],
}