import type { Config } from 'tailwindcss'

/**
 * Mint design tokens, light theme.
 * White canvas, navy ink, accents used sparingly. The signature green->navy
 * gradient lives in a contained hero card, not the whole page.
 * Mint green = client world, navy/indigo = supplier world. Never mixed in one
 * interactive component.
 */
export default {
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        // Client accent (mint green). `ink` is the AA-safe variant for text/CTAs on white.
        mint: {
          DEFAULT: '#00C07A',
          ink: '#00875A', // darker, passes contrast on white
          light: '#00E090',
          deep: '#006644',
          wash: '#E8FBF3', // pale mint surface
        },
        // Supplier accent (indigo).
        supplier: {
          DEFAULT: '#2D4CC8',
          hover: '#3B5CE0',
          light: '#4A70E0',
          wash: '#EEF1FD', // pale indigo surface
        },
        // The dark gradient family (used inside the hero card and footer).
        navy: {
          DEFAULT: '#0A1628',
          mid: '#0F2040',
          light: '#1C2E55',
        },
        // Light surfaces and ink.
        canvas: '#FFFFFF',
        'canvas-soft': '#F6F9F8', // barely-tinted cool off-white for alt sections
        ink: {
          DEFAULT: '#0A1628', // primary text, the navy, never pure black
          soft: '#3D4A5C', // secondary text
          mute: '#697586', // captions, labels
        },
        hairline: '#E6EAEF',
      },
      fontFamily: {
        display: ['Sora', 'system-ui', 'sans-serif'],
        sans: ['"DM Sans"', 'system-ui', 'sans-serif'],
      },
      borderRadius: {
        btn: '10px',
        card: '12px',
        hero: '24px',
      },
      maxWidth: {
        content: '1200px',
      },
      backgroundImage: {
        // Signature hero gradient: dark green (left) to navy (right).
        'mint-hero':
          'linear-gradient(125deg, #004d30 0%, #006644 28%, #003a22 48%, #0a1628 58%, #0f2040 100%)',
      },
      letterSpacing: {
        headline: '-0.03em',
        eyebrow: '0.1em',
      },
      boxShadow: {
        // Tinted to the brand navy, never pure black (taste rule).
        card: '0 1px 3px rgba(10,22,40,0.06), 0 1px 2px rgba(10,22,40,0.04)',
        lift: '0 12px 32px rgba(10,22,40,0.10), 0 4px 8px rgba(10,22,40,0.05)',
        hero: '0 30px 60px rgba(0,77,48,0.25)',
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
        float: 'float 7s ease-in-out infinite',
      },
    },
  },
  plugins: [],
} satisfies Config
