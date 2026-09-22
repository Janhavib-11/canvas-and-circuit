/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        // Shared brand
        brand: {
          accent: '#C0653B', // burnt sienna — the bridge color between both worlds
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
        // Creative World — dark, editorial
        art: {
          bg: '#0B0A08',
          surface: '#161311',
          line: '#2A2521',
          ink: '#F3EDE4',
          muted: '#9A8F82',
          accent: '#C0653B',
        },
      },
      fontFamily: {
        display: ['"Fraunces"', 'Georgia', 'serif'],
        sans: ['"Inter"', 'system-ui', 'sans-serif'],
        mono: ['"JetBrains Mono"', 'ui-monospace', 'monospace'],
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
