/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./app/frontend/**/*.{ts,tsx}'],
  theme: {
    extend: {
      // transitionProperty: {
      //   'height': 'height'
      // },
      keyframes: {
        focusBorderFlicker: {
          '0%, 100%': { borderColor: 'hsla(244,49%,49%,1)' },
          '50%': { borderColor: 'hsla(244,49%,49%,0.6)' },
        },
        errorBorderFlicker: {
          '0%, 100%': { borderColor: 'hsla(0,72.2%,50.6%, 1)' },
          '50%': { borderColor: 'hsla(0,72.2%,50.6%, 0.5)' },
        },
        // scaleHover: {
        //   '0%, 100%': { transform: 'scale(1)' },
        //   '50%': { transform: 'scale(1.01)' },
        // },
        // opacityHover: {
        //   '0%, 100%': { opacity: '.85' },
        //   '50%': { opacity: '0.75' },
        // }
        // focusColorFlicker: {
        //   '0%, 100%': { color: 'hsla(244,49%,49%,1)' },
        //   '50%': { color: 'hsla(244,49%,49%,0.6)' },
        // },
        // errorColorFlicker: {
        //   '0%, 100%': { color: 'hsla(0,72.2%,50.6%, 1)' },
        //   '50%': { color: 'hsla(0,72.2%,50.6%, 0.5)' },
        // },
      },
      animation: {
        focusBorderFlicker: 'focusBorderFlicker 1s infinite',
        errorBorderFlicker: 'errorBorderFlicker 1s infinite',
        scaleHover: 'scaleHover 3s infinite',
        opacityHover: 'opacityHover 3s infinite',
        // focusColorFlicker: 'focusColorFlicker 1s infinite',
        // errorColorFlicker: 'errorColorFlicker 1s infinite',
      },
      boxShadow: {
        card: '0 2px 6px #0000001a',
      },
    },
  },
  plugins: [],
};
