/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/pages/**/*.{js,jsx,ts,tsx}',
    './src/components/**/*.{js,jsx,ts,tsx}',
  ],
  theme: {
    extend: {
      fontFamily: {
        Gmarket: ['GmarketSans', 'sans-serif'],
      },
      fontSize: {
        hugeTitle: '60px',
        largeTitle: '34px',
        title1: '28px',
        title2: '22px',
        title3: '20px',
        headline: '17px',
        subHeadline: '15px',
        footNote: '13px',
        caption1: '12px',
        caption2: '11px',
        caption3: '10px',
      },
      colors: {
        sc: {
          black: '#1A1A1A',
          white: '#FFFFE5',
          grays: {
            1: '#8E8E93',
            2: '#AEAEB2',
            3: '#C7C7CC',
            4: '#D1D1D6',
            5: '#E5E5EA',
            6: '#F2F2F7',
          },
          org: {
            1: '#FF6800',
            2: '#F07F31',
            3: '#A94500',
          },
          grn: {
            1: '#84D14E',
            2: '#64DA07',
            3: '#40A900',
          },
          bl: {
            1: '#5BC7EC',
            2: '#0FBCE2',
            3: '#0087B1',
          },
          err: '#BA1E45',
          info: '#B87503',
          suc: '#3159B3',
        },
      },
    },
  },
  plugins: [require('@tailwindcss/forms')],
};
