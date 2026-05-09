import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './lib/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      // ── Colors (from _design/README.md tokens) ──────────────────────────
      colors: {
        mustard:       { DEFAULT: '#F2C94C', soft: '#F8DC7A' },
        cream:         '#F5EBD8',
        'warm-white':  '#FDFAF5',
        burgundy:      { DEFAULT: '#8B1A2B', deep: '#5A0E1B' },
        gold:          { DEFAULT: '#D4A017', soft: '#E8C25E' },
        ink:           { DEFAULT: '#1A1410', soft: '#4A2418' },
        charcoal:      '#2A2018',
        night:         { DEFAULT: '#0E0814', 2: '#1F0F0A' },
        stone:         {
          300: 'rgba(74,36,24,0.18)',
          500: 'rgba(74,36,24,0.55)',
        },
        live:          '#D42656',
        success:       '#1F8A5B',
      },

      // ── Font Families ────────────────────────────────────────────────────
      fontFamily: {
        'kr-serif':     ['var(--font-noto-serif-kr)', 'Noto Serif KR', 'serif'],
        // Pretendard loaded via @fontsource in globals.css
        'kr-sans':      ['Pretendard', '-apple-system', 'BlinkMacSystemFont', 'sans-serif'],
        'en-display':   ['var(--font-playfair)', 'Playfair Display', 'serif'],
        'en-body':      ['var(--font-inter)', 'Inter', 'sans-serif'],
        'en-condensed': ['var(--font-oswald)', 'Oswald', 'sans-serif'],
      },

      // ── Border Radius ────────────────────────────────────────────────────
      borderRadius: {
        sm:     '3px',
        md:     '6px',
        lg:     '12px',
        pill:   '9999px',
        circle: '50%',
      },

      // ── Box Shadows ──────────────────────────────────────────────────────
      boxShadow: {
        card:  '0 2px 8px rgba(26,20,16,0.08)',
        lift:  '0 12px 32px -8px rgba(26,20,16,0.18)',
        stamp: '5px 5px 0 #8B1A2B',  // burgundy offset shadow (print stamp feel)
      },

      // ── Typography scale (clamp values used inline; these are named sizes) ─
      fontSize: {
        eyebrow: ['11px', { letterSpacing: '0.4em', lineHeight: '1' }],
        small:   ['14px', { lineHeight: '1.5' }],
        body:    ['16px', { lineHeight: '1.7' }],
        'body-lg': ['20px', { lineHeight: '1.55' }],
        h3:      ['24px', { lineHeight: '1.3' }],
      },

      // ── Spacing (4px base, matching _design/README.md) ──────────────────
      spacing: {
        1:  '4px',
        2:  '8px',
        3:  '12px',
        4:  '16px',
        5:  '20px',
        6:  '24px',
        8:  '32px',
        10: '40px',
        12: '48px',
        16: '64px',
        20: '80px',
        24: '96px',
        32: '128px',
        40: '160px',
      },

      // ── Aspect Ratios ────────────────────────────────────────────────────
      aspectRatio: {
        'orchestra': '16 / 7',
      },
    },
  },
  plugins: [],
};

export default config;
