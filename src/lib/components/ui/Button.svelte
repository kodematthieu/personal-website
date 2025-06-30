<script lang="ts">
	import type { AdvancedXOR } from '$lib/types';
	import type { Snippet } from 'svelte';
	import type { HTMLAnchorAttributes, HTMLButtonAttributes } from 'svelte/elements';

	type Props = AdvancedXOR<HTMLAnchorAttributes, HTMLButtonAttributes> & {
		children: Snippet;
	};

	let { href, children, ...attr }: Props = $props();
</script>

{#if href}
	<a {href} {...attr as HTMLAnchorAttributes} class="btn">
		<span class="btn-content">
			{@render children()}
		</span>
	</a>
{:else}
	<button {...attr as HTMLButtonAttributes} class="btn">
		<span class="btn-content">
			{@render children()}
		</span>
	</button>
{/if}

<style>
	.btn {
		display: inline-flex;
		align-items: center;
		justify-content: center;
		padding: 0.8rem 2rem;
		border: 2px solid var(--color-primary);
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
		text-decoration: none;
		z-index: 2;
	}

	.btn::before {
		content: '';
		position: absolute;
		top: 0;
		left: -100%;
		width: 100%;
		height: 100%;
		background-color: var(--color-primary);
		transition: left 0.3s ease;
		z-index: -1;
	}

	.btn-content {
		position: relative;
		z-index: 1;
		display: inline-flex;
		align-items: center;
		justify-content: center;
	}

	.btn:hover {
		color: var(--color-on-primary);
		border-color: var(--color-primary);
		box-shadow: 0 0 15px rgba(var(--color-primary-rgb), 0.6);
	}

	.btn:hover::before {
		left: 0;
	}

	/* MODIFICATION: Styles for the disabled state */
	.btn:disabled,
	.btn[disabled] {
		border-color: var(--color-primary);
		color: var(--color-text-dim);
		cursor: not-allowed;
		opacity: 0.6;
	}

	.btn:disabled:hover,
	.btn[disabled]:hover {
		/* Explicitly prevent hover effects */
		color: var(--color-text-dim);
		border-color: var(--color-primary);
		box-shadow: none;
	}

	.btn:disabled:hover::before,
	.btn[disabled]:hover::before {
		/* Ensure the fill animation does not trigger on hover */
		left: -100%;
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
