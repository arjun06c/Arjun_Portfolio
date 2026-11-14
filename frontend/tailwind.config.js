/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        dark: {
          bg: "#050505",
          surface: "#0A0A0D",
          card: "#101014",
          cardElevated: "#151519",
          border: "rgba(255, 255, 255, 0.07)",
          yellowBorder: "rgba(255, 214, 0, 0.45)",
          borderHover: "rgba(255, 214, 0, 0.45)",
        },
        accent: {
          yellow: "#FFD600",
          yellowHover: "#FFE033",
          yellowMuted: "rgba(255, 214, 0, 0.12)",
          yellowGlow: "rgba(255, 214, 0, 0.18)",
        },
        text: {
          primary: "#FFFFFF",
          secondary: "#A1A1AA",
          muted: "#73737F",
        }
      },
      fontFamily: {
        sans: ['Plus Jakarta Sans', 'Inter', 'Poppins', 'sans-serif'],
      },
      boxShadow: {
        'glow-yellow': '0 0 35px rgba(255, 214, 0, 0.18)',
        'glow-yellow-sm': '0 0 15px rgba(255, 214, 0, 0.15)',
        'glow-yellow-lg': '0 0 50px rgba(255, 214, 0, 0.25)',
        'card': '0 10px 30px -10px rgba(0, 0, 0, 0.5)',
      },
      animation: {
        'float': 'float 6s ease-in-out infinite',
        'pulse-glow': 'pulseGlow 4s ease-in-out infinite',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-10px)' },
        },
        pulseGlow: {
          '0%, 100%': { opacity: '0.4', transform: 'scale(1)' },
          '50%': { opacity: '0.7', transform: 'scale(1.05)' },
        }
      }
    },
  },
  plugins: [],
}

