<script lang="ts">
	import { navigationLinks } from '$lib/navigation';
	import { quintOut } from 'svelte/easing';
	import { fly } from 'svelte/transition';

	// MODIFICATION: Use a callback prop instead of dispatching an event.
	let { isOpen, onClose }: { isOpen: boolean; onClose: () => void } = $props();
</script>

// /src/lib/components/layout/Sidebar.svelte
{#if isOpen}
	<!-- MODIFICATION: Use a button for the overlay for better accessibility. -->
	<button
		class="sidebar-overlay"
		onclick={onClose}
		transition:fly={{ duration: 300, opacity: 0 }}
		aria-label="Close navigation menu"
	></button>

	<aside class="sidebar" transition:fly={{ duration: 300, x: '100%', easing: quintOut }}>
		<nav class="sidebar-nav">
			<ul>
				{#each navigationLinks as link}
					<li>
						<!-- MODIFICATION: Use onclick and call the onClose prop. -->
						<a href={link.href} onclick={onClose}>{link.label}</a>
					</li>
				{/each}
			</ul>
		</nav>
		<!-- MODIFICATION: Use onclick and call the onClose prop. -->
		<button class="close-button" onclick={onClose} aria-label="Close navigation menu">×</button>
	</aside>
{/if}

<style>
	.sidebar-overlay {
		position: fixed;
		top: 0;
		left: 0;
		width: 100vw;
		height: 100vh;
		background-color: rgba(0, 0, 0, 0.7);
		/* MODIFICATION: z-index lowered */
		z-index: 998;
		backdrop-filter: blur(4px);
		border: none;
		padding: 0;
		cursor: pointer;
	}

	.sidebar {
		position: fixed;
		top: 0;
		right: 0;
		height: 100vh;
		width: min(75vw, 300px);
		background-color: var(--color-bg-dark-light);
		border-left: 1px solid var(--color-outline);
		box-shadow: -5px 0 25px rgba(0, 0, 0, 0.5);
		/* MODIFICATION: Add padding-top to clear the header */
		padding: 6rem 2rem 4rem 2rem;
		/* MODIFICATION: z-index lowered */
		z-index: 999;
		display: flex;
		flex-direction: column;
		box-sizing: border-box;
	}

	.sidebar-nav ul {
		list-style: none;
		padding: 0;
		margin: 0;
		display: flex;
		flex-direction: column;
		gap: 1.5rem;
	}

	.sidebar-nav a {
		font-family: 'Space Mono', monospace;
		font-size: 1.3rem;
		color: var(--color-text-dim);
		text-decoration: none;
		transition: color 0.2s ease;
		display: block;
		padding: 0.5rem 0;
	}

	.sidebar-nav a:hover {
		color: var(--color-deep-indigo-light);
	}

	.close-button {
		position: absolute;
		top: 1rem;
		right: 1.5rem;
		font-size: 2.5rem;
		color: var(--color-text-dim);
		background: none;
		border: none;
		cursor: pointer;
		line-height: 1;
		transition: color 0.2s ease;
	}

	.close-button:hover {
		color: var(--color-text-light);
	}
</style>
