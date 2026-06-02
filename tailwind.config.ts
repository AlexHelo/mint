import type { Config } from 'tailwindcss'

/**
 * Mint design tokens, straight from "Mint - Design System.md".
 * Dark/editorial. Mint green = client world, navy/indigo = supplier world.
 * The two never mix inside the same interactive component.
 */
export default {
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        // Client (mint green)
        mint: {
          DEFAULT: '#00C07A',
          light: '#00E090',
          deep: '#006644',
        },
        // Base surfaces (navy)
        navy: {
          DEFAULT: '#0A1628',
          mid: '#0F2040',
          light: '#1C2E55',
          card: '#111836',
        },
        // Supplier (indigo)
        supplier: {
          DEFAULT: '#4A70E0',
          btn: '#2D4CC8',
          'btn-hover': '#3B5CE0',
          light: '#7B9BF0',
        },
      },
      // Text-on-dark opacities, named so usage reads intent (see design doc).
      textColor: {
        muted: 'rgba(255,255,255,0.55)',
        faint: 'rgba(255,255,255,0.35)',
      },
      borderColor: {
        hairline: 'rgba(255,255,255,0.08)',
        'hairline-strong': 'rgba(255,255,255,0.2)',
      },
      fontFamily: {
        display: ['Sora', 'system-ui', 'sans-serif'],
        sans: ['"DM Sans"', 'system-ui', 'sans-serif'],
      },
      borderRadius: {
        btn: '10px',
        card: '12px',
      },
      maxWidth: {
        content: '1200px',
      },
      backgroundImage: {
        // The signature hero gradient: dark green (left) to navy (right).
        'mint-hero':
          'linear-gradient(125deg, #004d30 0%, #006644 28%, #003a22 48%, #0a1628 58%, #0f2040 100%)',
      },
      letterSpacing: {
        headline: '-0.03em',
        eyebrow: '0.1em',
      },
      keyframes: {
        'fade-up': {
          from: { opacity: '0', transform: 'translateY(16px)' },
          to: { opacity: '1', transform: 'translateY(0)' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-10px)' },
        },
      },
      animation: {
        'fade-up': 'fade-up 0.6s cubic-bezier(0.16,1,0.3,1) both',
        float: 'float 6s ease-in-out infinite',
      },
    },
  },
  plugins: [],
} satisfies Config
