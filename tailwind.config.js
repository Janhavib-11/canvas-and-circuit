/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        // Shared brand
        brand: {
          accent: '#C1683C', // terracotta — the bridge color between both worlds
        },
        // Technical World — light, structured
        tech: {
          bg: '#F4F5F7',
          surface: '#FFFFFF',
          line: '#D7DCE3',
          ink: '#12151C',
          muted: '#5B6472',
          accent: '#2F6DF6', // controlled blue
        },
        // Creative World — warm, earthy, editorial (terracotta / olive / cream)
        art: {
          bg: '#F4EDE2', // cream
          surface: '#FBF6EE', // lighter cream card
          line: '#E5D8C5', // sand border
          ink: '#38291B', // espresso
          muted: '#8C7B67', // taupe
          accent: '#C1683C', // terracotta
        },
        olive: {
          DEFAULT: '#4B4A2F',
          muted: '#6A6A45',
          soft: '#7C7B54',
        },
        clay: '#B7794F',
        sand: '#EFE6D8',
      },
      fontFamily: {
        display: ['"Fraunces"', 'Georgia', 'serif'],
        sans: ['"Inter"', 'system-ui', 'sans-serif'],
        mono: ['"JetBrains Mono"', 'ui-monospace', 'monospace'],
        script: ['"Caveat"', 'cursive'],
      },
      letterSpacing: {
        label: '0.22em',
      },
      keyframes: {
        grain: {
          '0%, 100%': { transform: 'translate(0,0)' },
          '20%': { transform: 'translate(-2%,3%)' },
          '40%': { transform: 'translate(3%,-2%)' },
          '60%': { transform: 'translate(-1%,-3%)' },
          '80%': { transform: 'translate(2%,2%)' },
        },
        dash: {
          to: { strokeDashoffset: '0' },
        },
      },
      animation: {
        grain: 'grain 8s steps(6) infinite',
      },
    },
  },
  plugins: [],
}
