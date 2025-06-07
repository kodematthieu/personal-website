<script lang="ts">
	import type { AdvancedXOR } from '$lib/types';
	import type { Snippet } from 'svelte';
	import type { HTMLAnchorAttributes, HTMLButtonAttributes } from 'svelte/elements';

	type Props = AdvancedXOR<HTMLAnchorAttributes, HTMLButtonAttributes> & {
		children: Snippet;
	};

	let { href, children, ...attr } = $props<Props>();
</script>

{#if href}
	<a {href} {...attr as HTMLAnchorAttributes} class="btn">
		{@render children()}
	</a>
{:else}
	<button {...attr as HTMLButtonAttributes} class="btn">
		{@render children()}
	</button>
{/if}

<style>
	.btn {
		display: inline-flex;
		align-items: center;
		justify-content: center;
		padding: 0.8rem 2rem;
		border: 2px solid var(--color-purple-primary);
		background-color: transparent;
		color: var(--color-text-light);
		font-family: 'Space Mono', monospace;
		font-size: 1rem;
		text-transform: uppercase;
		letter-spacing: 1px;
		cursor: pointer;
		transition: all 0.3s ease;
		position: relative;
		overflow: hidden;
		border-radius: var(--border-radius-sharp);
		text-decoration: none; /* Ensure links don't have underlines */
	}

	.btn::before {
		content: '';
		position: absolute;
		top: 0;
		left: -100%;
		width: 100%;
		height: 100%;
		background-color: var(--color-purple-primary);
		transition: left 0.3s ease;
		z-index: -1;
	}

	.btn:hover {
		color: var(--color-on-primary);
		box-shadow: 0 0 20px var(--color-purple-light);
	}

	.btn:hover::before {
		left: 0;
	}

	/* Responsive button adjustments */
	@media (max-width: 768px) {
		.btn.nexus-button {
			/* Special class for hero buttons */
			width: 80%;
			margin: 0 auto;
		}
	}
	@media (max-width: 480px) {
		.btn {
			font-size: 0.9rem;
			padding: 0.7rem 1.5rem;
		}
	}
</style>
