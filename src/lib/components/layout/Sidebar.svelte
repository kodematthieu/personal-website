<script lang="ts">
	import { navigationLinks } from '$lib/navigation';
	import { quintOut } from 'svelte/easing';
	import { fly } from 'svelte/transition';
	import { onMount } from 'svelte';
	import Icon from '@iconify/svelte';

	let {
		isOpen,
		onClose,
		activeSectionId
	}: { isOpen: boolean; onClose: () => void; activeSectionId: string } = $props();

	// MODIFICATION: State for the theme toggle
	let isFlowStateActive = $state(false);

	onMount(() => {
		// Sync with the body's class when the component mounts (i.e., when sidebar opens)
		isFlowStateActive = document.body.classList.contains('debug-mode');
	});

	function toggleFlowState() {
		document.body.classList.toggle('debug-mode');
		isFlowStateActive = !isFlowStateActive; // Update local state to reflect the change
	}
</script>

{#if isOpen}
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
						<a href={link.href} onclick={onClose} class:active={link.href === '#' + activeSectionId}
							>{link.label}</a
						>
					</li>
				{/each}
			</ul>
		</nav>

		<!-- MODIFICATION: Added State Toggle Button -->
		<div class="sidebar-footer">
			<button class="state-toggle-button" onclick={toggleFlowState}>
				<Icon icon={isFlowStateActive ? 'lucide:cpu' : 'lucide:atom'} />
				<span>
					{#if isFlowStateActive}
						Resume Analysis
					{:else}
						Engage Flow State
					{/if}
				</span>
			</button>
		</div>

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
		background-color: var(--color-surface);
		border-left: 1px solid var(--color-outline);
		box-shadow: -5px 0 25px rgba(0, 0, 0, 0.5);
		padding: 6rem 2rem 4rem 2rem;
		z-index: 999;
		display: flex;
		flex-direction: column;
		justify-content: space-between; /* MODIFICATION: Pushes footer to bottom */
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
		position: relative;
	}

	.sidebar-nav a:not(.active):hover {
		color: var(--color-text-light);
	}
	.sidebar-nav a:not(.active)::before,
	.sidebar-nav a:not(.active)::after {
		content: '[';
		position: absolute;
		top: 50%;
		font-weight: bold;
		color: var(--color-secondary);
		opacity: 0;
		transform: translateY(-50%) scale(0.5);
		transition:
			opacity 0.3s ease,
			transform 0.3s ease;
	}
	.sidebar-nav a:not(.active)::before {
		content: '[';
		left: -15px;
	}
	.sidebar-nav a:not(.active)::after {
		content: ']';
		right: -15px;
	}
	.sidebar-nav a:not(.active):hover::before,
	.sidebar-nav a:not(.active):hover::after {
		opacity: 1;
		transform: translateY(-50%) scale(1);
	}

	.sidebar-nav a.active {
		color: var(--color-text-light);
		text-shadow: 0 0 8px var(--color-secondary);
	}
	.sidebar-nav a.active::before,
	.sidebar-nav a.active::after {
		content: '';
		position: absolute;
		width: 8px;
		height: 8px;
		opacity: 1;
		transition: all 0.3s ease;
	}
	.sidebar-nav a.active::before {
		top: 2px;
		left: -10px;
		border-top: 2px solid var(--color-secondary);
		border-left: 2px solid var(--color-secondary);
	}
	.sidebar-nav a.active::after {
		bottom: 2px;
		right: -10px;
		border-bottom: 2px solid var(--color-secondary);
		border-right: 2px solid var(--color-secondary);
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

	/* MODIFICATION: Styles for the new footer and toggle button */
	.sidebar-footer {
		padding-top: 2rem;
		border-top: 1px solid var(--color-outline);
	}

	.state-toggle-button {
		width: 100%;
		background-color: transparent;
		border: 1px solid var(--color-outline);
		color: var(--color-text-dim);
		padding: 0.75rem 1rem;
		font-family: 'Space Mono', monospace;
		font-size: 1rem;
		border-radius: var(--border-radius-sharp);
		cursor: pointer;
		transition: all 0.3s ease;
		display: flex;
		align-items: center;
		justify-content: center;
		gap: 0.75rem;
	}

	.state-toggle-button:hover {
		border-color: var(--color-primary);
		background-color: rgba(var(--color-primary-rgb), 0.1);
		color: var(--color-text-light);
	}

	:global(body.debug-mode) .state-toggle-button {
		border-color: var(--color-core-red);
		color: var(--color-core-red);
	}
	:global(body.debug-mode) .state-toggle-button:hover {
		background-color: rgba(var(--color-core-red), 0.1);
		color: var(--color-core-red);
	}
</style>
