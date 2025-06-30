import containerQueries from '@tailwindcss/container-queries';
import forms from '@tailwindcss/forms';
import typography from '@tailwindcss/typography';
import type { Config } from 'tailwindcss';

export default {
	content: ['./src/**/*.{html,js,svelte,ts}'],
	theme: {
		extend: {
			colors: {
				// Semantic Colors
				primary: 'var(--color-primary)',
				'primary-rgb': 'var(--color-primary-rgb)',
				'on-primary': 'var(--color-on-primary)',
				'primary-container': 'var(--color-primary-container)',
				'on-primary-container': 'var(--color-on-primary-container)',

				secondary: 'var(--color-secondary)',
				'on-secondary': 'var(--color-on-secondary)',
				'secondary-container': 'var(--color-secondary-container)',
				'on-secondary-container': 'var(--color-on-secondary-container)',

				background: 'var(--color-background)',
				'on-background': 'var(--color-on-background)',

				surface: 'var(--color-surface)',
				'on-surface': 'var(--color-on-surface)',
				'surface-variant': 'var(--color-surface-variant)',
				'on-surface-variant': 'var(--color-on-surface-variant)',

				outline: 'var(--color-outline)',
				shadow: 'var(--color-shadow)',

				// Base Palette Colors (if still needed directly)
				'bg-dark': 'var(--color-bg-dark)',
				'bg-dark-light': 'var(--color-bg-dark-light)',
				'deep-indigo-primary': 'var(--color-deep-indigo-primary)',
				'deep-indigo-primary-rgb': 'var(--color-deep-indigo-primary-rgb)',
				'deep-indigo-light': 'var(--color-deep-indigo-light)',
				'deep-indigo-dark': 'var(--color-deep-indigo-dark)',
				'cyan-teal-accent': 'var(--color-cyan-teal-accent)',
				'text-light': 'var(--color-text-light)',
				'text-dim': 'var(--color-text-dim)',
				'core-red': 'var(--color-core-red)',
				'core-black': 'var(--color-core-black)',
				'core-dark-bg': 'var(--color-core-dark-bg)',
				'core-dark-red': 'var(--color-core-dark-red)'
			}
		}
	},
	plugins: [typography, forms, containerQueries]
} satisfies Config;
