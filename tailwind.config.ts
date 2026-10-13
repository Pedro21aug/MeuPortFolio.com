import type { Config } from "tailwindcss";
import tailwindcssAnimate from "tailwindcss-animate";

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
			padding: '1.5rem',
			screens: {
				'2xl': '1280px'
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
				success: {
					DEFAULT: 'hsl(var(--success))',
					foreground: 'hsl(var(--success-foreground))'
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
				canvas: {
					DEFAULT: 'hsl(var(--canvas))',
					foreground: 'hsl(var(--canvas-foreground))',
					muted: 'hsl(var(--canvas-muted))'
				},
				brown: {
					50: 'hsl(var(--brown-50))',
					100: 'hsl(var(--brown-100))',
					200: 'hsl(var(--brown-200))',
					300: 'hsl(var(--brown-300))',
					400: 'hsl(var(--brown-400))',
					500: 'hsl(var(--brown-500))',
					600: 'hsl(var(--brown-600))',
					700: 'hsl(var(--brown-700))',
					800: 'hsl(var(--brown-800))',
					900: 'hsl(var(--brown-900))'
				},
				gold: {
					300: 'hsl(var(--gold-300))',
					400: 'hsl(var(--gold-400))',
					500: 'hsl(var(--gold-500))',
					700: 'hsl(var(--gold-700))'
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
				display: ['var(--font-display)'],
				sans: ['var(--font-sans)'],
				mono: ['var(--font-mono)']
			},
			fontSize: {
				'display-l': ['clamp(2.6rem, 5.2vw, 4.15rem)', { lineHeight: '1.04', letterSpacing: '-0.03em', fontWeight: '500' }],
				'display-s': ['clamp(2rem, 3.4vw, 2.75rem)', { lineHeight: '1.1', letterSpacing: '-0.02em', fontWeight: '500' }],
				'headline-l': ['1.75rem', { lineHeight: '1.2', letterSpacing: '-0.015em', fontWeight: '600' }],
				'headline-s': ['1.25rem', { lineHeight: '1.3', letterSpacing: '-0.01em', fontWeight: '600' }],
				'body-l': ['1rem', { lineHeight: '1.6' }],
				'body-s': ['0.875rem', { lineHeight: '1.55' }]
			},
			letterSpacing: {
				eyebrow: '0.18em'
			},
			borderRadius: {
				sm: 'calc(var(--radius) - 4px)',
				md: 'calc(var(--radius) - 2px)',
				lg: 'var(--radius)',
				xl: 'calc(var(--radius) + 4px)',
				'2xl': 'calc(var(--radius) + 10px)'
			},
			boxShadow: {
				xs: 'var(--shadow-xs)',
				sm: 'var(--shadow-sm)',
				card: 'var(--shadow-card)',
				button: 'var(--shadow-button)',
				'button-hover': 'var(--shadow-button-hover)',
				focus: 'var(--shadow-focus)',
				glow: 'var(--shadow-glow)'
			},
			backgroundImage: {
				'gradient-canvas': 'var(--gradient-canvas)',
				'gradient-gold': 'var(--gradient-gold)',
				'gradient-hairline': 'var(--gradient-hairline)',
				'gradient-glow': 'var(--gradient-glow)',
				'gradient-card': 'var(--gradient-card)'
			},
			keyframes: {
				'fade-up': {
					'0%': { opacity: '0', transform: 'translateY(16px)' },
					'100%': { opacity: '1', transform: 'translateY(0)' }
				},
				'fade-in': {
					'0%': { opacity: '0' },
					'100%': { opacity: '1' }
				},
				float: {
					'0%,100%': { transform: 'translateY(0) rotate(0deg)' },
					'50%': { transform: 'translateY(-10px) rotate(1.5deg)' }
				},
				shimmer: {
					'0%': { transform: 'translateX(-130%) skewX(-12deg)' },
					'100%': { transform: 'translateX(240%) skewX(-12deg)' }
				},
				'reveal-menu': {
					'0%': { opacity: '0', transform: 'translateY(-6px) scale(0.97)' },
					'100%': { opacity: '1', transform: 'translateY(0) scale(1)' }
				},
				'ring-spin': {
					to: { transform: 'rotate(360deg)' }
				},
				'pulse-glow': {
					'0%,100%': { opacity: '0.4' },
					'50%': { opacity: '0.72' }
				},
				'hairline-in': {
					'0%': { transform: 'scaleX(0)', opacity: '0' },
					'100%': { transform: 'scaleX(1)', opacity: '1' }
				},
				'pop-in': {
					'0%': { opacity: '0', transform: 'scale(0.8)' },
					'100%': { opacity: '1', transform: 'scale(1)' }
				}
			},
			animation: {
				'fade-up': 'fade-up 0.65s cubic-bezier(0.22, 1, 0.36, 1) both',
				'fade-up-slow': 'fade-up 0.9s cubic-bezier(0.22, 1, 0.36, 1) both',
				'fade-in': 'fade-in 0.5s ease-out both',
				float: 'float 9s ease-in-out infinite',
				shimmer: 'shimmer 0.9s ease-out',
				'reveal-menu': 'reveal-menu 0.18s cubic-bezier(0.22, 1, 0.36, 1) both',
				'ring-spin': 'ring-spin 32s linear infinite',
				'pulse-glow': 'pulse-glow 7s ease-in-out infinite',
				'hairline-in': 'hairline-in 0.8s cubic-bezier(0.22, 1, 0.36, 1) 0.15s both',
				'pop-in': 'pop-in 0.5s cubic-bezier(0.22, 1, 0.36, 1) both'
			},
			transitionTimingFunction: {
				premium: 'cubic-bezier(0.22, 1, 0.36, 1)'
			}
		}
	},
	plugins: [tailwindcssAnimate],
} satisfies Config;
