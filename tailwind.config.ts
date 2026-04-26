import type { Config } from "tailwindcss";
import animate from "tailwindcss-animate";
import typography from "@tailwindcss/typography";

export default {
  darkMode: ["class"],
  content: [
    "./pages/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./app/**/*.{ts,tsx}",
    "./src/**/*.{ts,tsx}",
  ],
  prefix: "",
  theme: {
    container: {
      center: true,
      padding: '2rem',
      screens: {
        '2xl': '1400px'
      }
    },
    extend: {
      colors: {
        border: 'hsl(var(--border))',
        input: 'hsl(var(--input))',
        ring: 'hsl(var(--ring))',
        background: 'hsl(var(--background))',
        foreground: 'hsl(var(--foreground))',
        primary: {
          DEFAULT: 'hsl(var(--primary))',
          foreground: 'hsl(var(--primary-foreground))'
        },
        secondary: {
          DEFAULT: 'hsl(var(--secondary))',
          foreground: 'hsl(var(--secondary-foreground))'
        },
        destructive: {
          DEFAULT: 'hsl(var(--destructive))',
          foreground: 'hsl(var(--destructive-foreground))'
        },
        muted: {
          DEFAULT: 'hsl(var(--muted))',
          foreground: 'hsl(var(--muted-foreground))'
        },
        accent: {
          DEFAULT: 'hsl(var(--accent))',
          foreground: 'hsl(var(--accent-foreground))'
        },
        popover: {
          DEFAULT: 'hsl(var(--popover))',
          foreground: 'hsl(var(--popover-foreground))'
        },
        card: {
          DEFAULT: 'hsl(var(--card))',
          foreground: 'hsl(var(--card-foreground))'
        },
        sidebar: {
          DEFAULT: 'hsl(var(--sidebar-background))',
          foreground: 'hsl(var(--sidebar-foreground))',
          primary: 'hsl(var(--sidebar-primary))',
          'primary-foreground': 'hsl(var(--sidebar-primary-foreground))',
          accent: 'hsl(var(--sidebar-accent))',
          'accent-foreground': 'hsl(var(--sidebar-accent-foreground))',
          border: 'hsl(var(--sidebar-border))',
          ring: 'hsl(var(--sidebar-ring))'
        }
      },
      fontFamily: {
        sans: ['var(--font-sans)', 'Inter', 'system-ui', 'sans-serif'],
        mono: ['var(--font-mono)', 'JetBrains Mono', 'ui-monospace', 'monospace'],
        serif: ['var(--font-serif)', 'IBM Plex Serif', 'Georgia', 'serif'],
      },
      borderRadius: {
        lg: 'calc(var(--radius) + 2px)',
        md: 'var(--radius)',
        sm: 'calc(var(--radius) - 2px)'
      },
      keyframes: {
        'accordion-down': {
          from: { height: '0' },
          to: { height: 'var(--radix-accordion-content-height)' },
        },
        'accordion-up': {
          from: { height: 'var(--radix-accordion-content-height)' },
          to: { height: '0' },
        },
        'fade-in': {
          from: { opacity: '0' },
          to: { opacity: '1' },
        },
        'slide-in': {
          from: { transform: 'translateY(10px)', opacity: '0' },
          to: { transform: 'translateY(0)', opacity: '1' },
        },
        'fade-up': {
          from: { transform: 'translateY(18px)', opacity: '0' },
          to: { transform: 'translateY(0)', opacity: '1' },
        },
        'fade-up-delayed': {
          '0%, 20%': { transform: 'translateY(18px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
        'bar-grow': {
          from: { transform: 'scaleX(0)' },
          to: { transform: 'scaleX(1)' },
        },
        progressBar: {
          from: { width: '0%' },
          to: { width: '100%' },
        },
        orbit: {
          from: { transform: 'rotate(0deg)' },
          to: { transform: 'rotate(360deg)' },
        },
        'orbit-counter': {
          from: { transform: 'rotate(0deg)' },
          to: { transform: 'rotate(-360deg)' },
        },
        'pulse-spoke': {
          '0%': { transform: 'translateY(0)', opacity: '0' },
          '12%': { opacity: '1' },
          '88%': { opacity: '1' },
          '100%': { transform: 'translateY(-215px)', opacity: '0' },
        },
        'core-breathe': {
          '0%, 100%': { transform: 'scale(1)', opacity: '0.85' },
          '50%': { transform: 'scale(1.06)', opacity: '1' },
        },
      },
      animation: {
        'accordion-down': 'accordion-down 0.2s ease-out',
        'accordion-up': 'accordion-up 0.2s ease-out',
        'fade-in': 'fade-in 0.3s ease-out',
        'slide-in': 'slide-in 0.3s ease-out',
        'fade-up': 'fade-up 0.9s ease-out both',
        'fade-up-slow': 'fade-up-delayed 1.2s ease-out both',
        'bar-grow': 'bar-grow 1s ease-out both',
        orbit: 'orbit 120s linear infinite',
        'orbit-counter': 'orbit-counter 120s linear infinite',
        'pulse-spoke': 'pulse-spoke 6s ease-out infinite',
        'core-breathe': 'core-breathe 6s ease-in-out infinite',
      },
      // Layered shadow stack: every elevation pairs a 1px hairline highlight
      // with a soft, focused ambient blur — feels closer to Linear / Stripe
      // / Vercel than Tailwind's default uniform blur.
      boxShadow: {
        sm: '0 1px 0 0 rgb(15 23 42 / 0.04)',
        DEFAULT:
          '0 1px 0 0 rgb(15 23 42 / 0.04), 0 4px 12px -4px rgb(15 23 42 / 0.08)',
        md: '0 1px 0 0 rgb(15 23 42 / 0.04), 0 6px 16px -6px rgb(15 23 42 / 0.10)',
        lg: '0 1px 0 0 rgb(15 23 42 / 0.04), 0 12px 28px -8px rgb(15 23 42 / 0.12)',
        xl: '0 1px 0 0 rgb(15 23 42 / 0.04), 0 20px 40px -12px rgb(15 23 42 / 0.16)',
        '2xl': '0 1px 0 0 rgb(15 23 42 / 0.04), 0 32px 64px -20px rgb(15 23 42 / 0.20)',
        inner: 'inset 0 1px 0 0 rgb(255 255 255 / 0.6), inset 0 0 0 1px rgb(15 23 42 / 0.04)',
      },
      typography: {
        DEFAULT: {
          css: {
            maxWidth: 'none',
          },
        },
      },
    }
  },
  plugins: [
    animate,
    typography,
  ],
} satisfies Config;
