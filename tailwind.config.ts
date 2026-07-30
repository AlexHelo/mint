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
        'canvas-soft': '#F7F9FB', // section gray (docs/landing-brief.md)
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
      // Brand posture (docs/marca.md): 10px cards, 8px buttons, 999px chips only.
      borderRadius: {
        btn: '8px',
        card: '10px',
        hero: '16px',
      },
      maxWidth: {
        content: '1200px',
      },
      letterSpacing: {
        headline: '-0.02em',
        eyebrow: '0.12em',
      },
      boxShadow: {
        // Tinted to the brand navy, never pure black. Crisp, not fluffy.
        card: '0 1px 2px rgba(10,22,40,0.06), 0 1px 1px rgba(10,22,40,0.04)',
        lift: '0 10px 28px rgba(10,22,40,0.10), 0 2px 6px rgba(10,22,40,0.05)',
        panel: '0 24px 60px rgba(10,22,40,0.28)',
      },
      keyframes: {
        'fade-up': {
          from: { opacity: '0', transform: 'translateY(16px)' },
          to: { opacity: '1', transform: 'translateY(0)' },
        },
      },
      animation: {
        'fade-up': 'fade-up 0.6s cubic-bezier(0.16,1,0.3,1) both',
      },
    },
  },
  plugins: [],
} satisfies Config
