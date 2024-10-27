/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./app/frontend/**/*.{ts,tsx}'],
  theme: {
    extend: {
      keyframes: {
        focusFlicker: {
          '0%, 100%': { borderColor: 'hsla(244,49%,49%,1)' },
          '50%': { borderColor: 'hsla(244,49%,49%,0.6)' },
        },
        errorFlicker: {
          '0%, 100%': { borderColor: 'hsla(0,72.2%,50.6%, 1)' },
          '50%': { borderColor: 'hsla(0,72.2%,50.6%, 0.5)' },
        },
      },
      animation: {
        focusFlicker: 'focusFlicker 1s infinite',
        errorFlicker: 'errorFlicker 1s infinite',
      },
      boxShadow: {
        card: '0 2px 6px #0000001a',
      },
    },
  },
  plugins: [],
};
