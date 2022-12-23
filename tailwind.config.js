/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/pages/**/*.{js,jsx,ts,tsx}',
    './src/components/**/*.{js,jsx,ts,tsx}',
  ],
  theme: {
    extend: {
      fontFamily: {
        Pretendard: ['Pretendard', 'sans-serif'],
      },
      fontSize: {
        12: '0.75rem',
        14: '0.875rem',
        15: '0.938rem',
        16: '1rem',
        18: '1.125rem',
        20: '1.25rem',
        24: '1.5rem',
      },
      colors: {
        brand: '#F5535D',
        font: {
          1: '#191919',
          2: '#767676',
          3: '#999999',
        },
        line: {
          1: '#191919',
          2: '#DBDBDB',
          3: '#EDEDED',
          err: '#FF3120',
        },
        bg: {
          1: '#F1F1F5',
          2: '#F8F8FA',
        },
      },
    },
  },
  plugins: [require('@tailwindcss/forms')],
};
