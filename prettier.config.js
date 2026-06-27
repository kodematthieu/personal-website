/**
 * The configuration file for Prettier, the opinionated code formatter.
 *
 * @remarks
 * This file defines the code style rules that Prettier will enforce across the entire
 * codebase. Using a dedicated configuration file ensures that all developers and automated
 * tools use the exact same formatting, preventing stylistic inconsistencies and noisy diffs
 * in version control.
 *
 * The rules are set to align with common modern JavaScript/TypeScript best practices, such
 * as using single quotes and adding trailing commas to simplify future edits.
 * @see {@link https://prettier.io/docs/en/configuration.html}
 * @packageDocumentation
 */
export default {
	useTabs: true, // use \t for indentation
	semi: true, // always add semicolons
	bracketSpacing: true, // { foo: bar } instead of {foo:bar}
	printWidth: 100, // wrap lines at 100 chars
	singleQuote: true, // ' instead of "
	trailingComma: 'all', // add trailing commas where valid in ES5
	endOfLine: 'auto', // auto-detect line endings based on file
	plugins: ['prettier-plugin-svelte', 'prettier-plugin-tailwindcss'],
	overrides: [
		{
			files: '*.svelte',
			options: {
				parser: 'svelte',
			},
		},
	],
};
