/**
 * The ESLint configuration file for the project.
 *
 * @remarks
 * This configuration uses the new "flat config" format. It's responsible for enforcing a
 * consistent code style and identifying potential bugs or anti-patterns in the JavaScript,
 * TypeScript, and Svelte codebase.
 *
 * It includes:
 * - Base recommended rules from ESLint (`@eslint/js`).
 * - TypeScript-specific rules (`typescript-eslint`) and the TypeScript parser.
 * - Svelte-specific rules (`eslint-plugin-svelte`) for `.svelte` files.
 * - Integration with Prettier (`eslint-config-prettier`) to avoid stylistic conflicts.
 *
 * A key customization is the configuration of `@typescript-eslint/no-unused-vars` to ignore
 * any variable, argument, or error that begins with an underscore (`_`), which is a common
 * convention for intentionally unused identifiers.
 * @see {@link https://eslint.org/docs/latest/use/configure/configuration-files} for more on flat config.
 * @packageDocumentation
 */
import prettier from 'eslint-config-prettier';
import js from '@eslint/js';
import { includeIgnoreFile } from '@eslint/compat';
import svelte from 'eslint-plugin-svelte';
import globals from 'globals';
import { fileURLToPath } from 'node:url';
import ts from 'typescript-eslint';

const gitignorePath = fileURLToPath(new URL('./.gitignore', import.meta.url));

export default ts.config(
	// Respect .gitignore patterns
	includeIgnoreFile(gitignorePath),

	// Additional ignores
	{
		ignores: ['src/lib/paraglide/*', 'dist/**', '*.md', 'docs/**'],
	},

	// Base JS + TS + Svelte rules
	js.configs.recommended,
	...ts.configs.recommended,
	...svelte.configs['flat/recommended'],
	prettier,
	...svelte.configs['flat/prettier'],

	// Global language options with Bun support
	{
		languageOptions: {
			globals: {
				...globals.browser,
				...globals.node,
				Bun: 'readonly',
			},
		},
	},

	// TypeScript parser for Svelte files
	{
		files: ['**/*.svelte'],
		languageOptions: {
			parserOptions: {
				parser: ts.parser,
			},
		},
	},

	// Custom TypeScript rules
	{
		rules: {
			'@typescript-eslint/no-unused-vars': [
				'error',
				{
					argsIgnorePattern: '^_', // Ignore unused arguments starting with _
					varsIgnorePattern: '^_', // Ignore unused variables starting with _
					caughtErrorsIgnorePattern: '^_', // Ignore unused caught errors starting with _
					destructuredArrayIgnorePattern: '^_', // Ignore unused destructured array elements starting with _
				},
			],
		},
	},
);
