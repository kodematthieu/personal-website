<script lang="ts">
	import { page } from '$app/stores';
	import Button from '$lib/components/ui/Button.svelte';
	import Icon from '@iconify/svelte';
</script>

<div class="error-container">
	<div class="error-content">
		<div class="error-icon-wrapper">
			<Icon icon="lucide:shield-alert" />
		</div>

		{#if $page.status === 404}
			<h1 class="error-headline-major">SEGMENTATION FAULT: CORE DUMPED</h1>
			<p class="error-status-code">ERROR CODE: [{$page.status}]</p>
			<p class="error-description">
				You have attempted to access a memory address outside the allocated segments of this domain.
				The requested construct does not exist in the system's memory map. A record of this access
				violation has been logged.
			</p>
		{:else}
			<!-- Fallback for other server errors (e.g., 500) -->
			<h1 class="error-headline-major">SYSTEM PANIC: UNHANDLED EXCEPTION</h1>
			<p class="error-status-code">ERROR CODE: [{$page.status}]</p>
			<p class="error-description">
				A critical, unrecoverable error was encountered in the system kernel. The process has been
				terminated to ensure system integrity. The error has been logged for analysis by the
				Architect.
			</p>
			<p class="error-message">{$page.error?.message}</p>
		{/if}

		<div class="error-cta">
			<Button href="/">// Return to Nexus (Safe Entry Point) //</Button>
		</div>
	</div>
</div>

<style>
	.error-container {
		/* MODIFICATION: Allow container to grow and center its content */
		flex: 1;
		display: flex;
		align-items: center;
		justify-content: center;
		padding: 2rem;
		text-align: center;
	}

	.error-content {
		max-width: 650px;
		background-color: var(--color-surface);
		border: 1px solid var(--color-core-dark-red);
		border-radius: var(--border-radius-sharp);
		padding: 3rem 4rem;
		box-shadow: 0 0 30px rgba(var(--color-core-red), 0.25);
	}

	.error-icon-wrapper {
		color: var(--color-core-red);
		font-size: 3.5rem;
		margin-bottom: 1.5rem;
		line-height: 1;
	}

	.error-headline-major {
		font-family: 'Space Mono', monospace;
		font-size: 2.2rem;
		color: var(--color-core-red);
		text-shadow: 0 0 10px var(--color-core-red);
		margin-bottom: 0.5rem;
	}

	.error-status-code {
		font-family: 'Space Mono', monospace;
		color: var(--color-text-dim);
		margin-bottom: 2rem;
	}

	.error-description {
		font-family: 'Inter', sans-serif;
		color: var(--color-text-light);
		line-height: 1.8;
		margin-bottom: 2.5rem;
		font-size: 1.1rem;
	}

	.error-message {
		font-family: 'Space Mono', monospace;
		color: var(--color-text-dim);
		background: var(--color-background);
		padding: 0.5rem;
		border-radius: var(--border-radius-sharp);
		margin-top: -1rem;
		margin-bottom: 2.5rem;
		border: 1px dashed var(--color-core-dark-red);
		font-size: 0.85rem;
		word-wrap: break-word;
	}

	.error-cta :global(.btn) {
		background-color: transparent;
		border-color: var(--color-core-red);
		color: var(--color-core-red);
	}

	.error-cta :global(.btn:hover) {
		background-color: var(--color-core-red);
		color: var(--color-text-light);
		box-shadow: 0 0 20px var(--color-core-red);
	}

	@media (max-width: 640px) {
		.error-content {
			padding: 2rem 1.5rem;
		}
		.error-headline-major {
			font-size: 1.6rem;
		}
		.error-description {
			font-size: 1rem;
		}
	}
</style>
