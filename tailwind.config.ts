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

				
			}
		}
	},
	plugins: [typography, forms, containerQueries]
} satisfies Config;
