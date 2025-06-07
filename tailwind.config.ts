import containerQueries from '@tailwindcss/container-queries';
import forms from '@tailwindcss/forms';
import typography from '@tailwindcss/typography';
import type { Config } from 'tailwindcss';

export default {
	content: ['./src/**/*.{html,js,svelte,ts}'],
	theme: {
		extend: {
			colors: {
				// Base Palette
				'bg-dark': 'var(--color-bg-dark)',
				'bg-dark-light': 'var(--color-bg-dark-light)',

				// Purple Primary Palette (used for primary, on-primary, etc.)
				'purple-primary': 'var(--color-purple-primary)',
				'purple-light': 'var(--color-purple-light)',
				'purple-dark': 'var(--color-purple-dark)',

				// Teal Accent Palette
				'teal-accent': 'var(--color-teal-accent)',

				// Text Colors
				'text-light': 'var(--color-text-light)',
				'text-dim': 'var(--color-text-dim)'

				// Keeping old aliases if needed for existing Tailwind classes, though they should be migrated
				// primary: 'var(--color-purple-primary)',
				// 'on-primary': 'var(--color-text-light)', // Assuming this maps best
				// 'primary-container': 'var(--color-purple-dark)',
				// 'on-primary-container': 'var(--color-text-light)',

				// secondary: 'var(--color-teal-accent)',
				// 'on-secondary': 'var(--color-text-light)',
				// 'secondary-container': 'var(--color-teal-accent)', // Or a darker teal variant
				// 'on-secondary-container': 'var(--color-text-light)',

				// background: 'var(--color-bg-dark)',
				// 'on-background': 'var(--color-text-light)',
				// surface: 'var(--color-bg-dark-light)',
				// 'on-surface': 'var(--color-text-light)',
				// 'surface-variant': 'var(--color-bg-dark-light)', // Or a slightly different dark background
				// 'on-surface-variant': 'var(--color-text-dim)',

				// outline: 'rgba(var(--color-purple-primary), 0.2)', // Approximate if needed
			}
		}
	},
	plugins: [typography, forms, containerQueries]
} satisfies Config;
