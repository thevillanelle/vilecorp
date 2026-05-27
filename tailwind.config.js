/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        crimson: {
          DEFAULT: 'var(--crimson)',
          dark: 'var(--crimson-dark)',
          light: 'var(--crimson-light)',
        },
        gold: {
          DEFAULT: 'var(--gold)',
          muted: 'var(--gold-muted)',
          dim: 'var(--gold-dim)',
        },
        cream: {
          DEFAULT: 'var(--cream)',
          muted: 'var(--cream-muted)',
        },
        noir: {
          DEFAULT: 'var(--noir)',
          card: 'var(--noir-card)',
          elevated: 'var(--noir-elevated)',
          border: 'var(--noir-border)',
        },
      },
      fontFamily: {
        display: ['"Bebas Neue"', 'sans-serif'],
        serif: ['"Cormorant Garamond"', 'Georgia', 'serif'],
        sans: ['"DM Sans"', 'system-ui', 'sans-serif'],
        mono: ['"Courier Prime"', 'Courier', 'monospace'],
      },
      letterSpacing: { widest: '0.3em' },
    },
  },
  plugins: [],
}
