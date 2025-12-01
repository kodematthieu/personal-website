<script lang="ts">
	import Button from '$lib/components/ui/Button.svelte';
	import Icon from '@iconify/svelte';

	let {
		featureName = 'Module',
		returnHref = '/',
		returnLabel = '// Return to Nexus //',
	} = $props<{
		featureName?: string;
		returnHref?: string;
		returnLabel?: string;
	}>();
</script>

<div class="notice-container">
	<div class="notice-content">
		<div class="notice-icon-wrapper">
			<Icon icon="lucide:binary" />
		</div>
		<h1 class="notice-headline-major">NULL POINTER: MEMORY NOT MAPPED</h1>
		<p class="notice-description">
			The system has dereferenced a pointer to the <strong>{featureName}</strong> construct, but the
			target memory has not yet been allocated or initialized. The address is valid, but the module is
			still in a state of synthesis.
		</p>
		<div class="notice-cta">
			<Button href={returnHref}>{returnLabel}</Button>
		</div>
	</div>
</div>

<style>
	.notice-container {
		/* MODIFICATION: Allow container to grow and center its content */
		flex: 1;
		display: flex;
		align-items: center;
		justify-content: center;
		padding: 2rem;
		text-align: center;
	}

	.notice-content {
		max-width: 600px;
		background-color: var(--color-surface);
		border: 1px solid var(--color-primary-container);
		border-radius: var(--border-radius-sharp);
		padding: 3rem 4rem;
		box-shadow: 0 0 25px rgba(var(--color-primary-rgb), 0.1);
		animation: pulse-glow 4s infinite alternate ease-in-out;
	}

	@keyframes pulse-glow {
		from {
			box-shadow: 0 0 20px rgba(var(--color-primary-rgb), 0.1);
			border-color: var(--color-primary-container);
		}
		to {
			box-shadow: 0 0 35px rgba(var(--color-primary-light-rgb), 0.25);
			border-color: var(--color-primary);
		}
	}

	.notice-icon-wrapper {
		color: var(--color-primary);
		font-size: 3rem;
		margin-bottom: 1.5rem;
		line-height: 1;
	}

	.notice-headline-major {
		font-family: 'Space Mono', monospace;
		font-size: 2rem;
		color: var(--color-primary-light);
		text-shadow: 0 0 10px var(--color-primary);
		margin-bottom: 1.5rem;
	}

	.notice-description {
		font-family: 'Inter', sans-serif;
		color: var(--color-text-dim);
		line-height: 1.7;
		margin-bottom: 2.5rem;
		font-size: 1.1rem;
	}

	.notice-description strong {
		color: var(--color-secondary);
		font-weight: 600;
	}

	@media (max-width: 640px) {
		.notice-content {
			padding: 2rem 1.5rem;
		}
		.notice-headline-major {
			font-size: 1.5rem;
		}
		.notice-description {
			font-size: 1rem;
		}
	}
</style>
