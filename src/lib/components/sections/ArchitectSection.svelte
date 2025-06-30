<script lang="ts">
	import DOMPurify from 'isomorphic-dompurify';

	let { content }: { content: string[] } = $props();

	const introductoryTextLeft = content.length > 0 ? [content[0]] : [];
	const introductoryTextRight = content.length > 1 ? [content[1]] : [];
</script>

<section id="architect" class="architect-section container">
	<h2 class="section-heading">The Architect: Logic & The Conduit</h2>

	<!-- NEW: Wrapper to give the content a distinct, styled container -->
	<div class="architect-content-wrapper">
		<div class="intro-paragraphs-section">
			<div class="intro-paragraph-column">
				{#each introductoryTextLeft as paragraph}
					<!-- eslint-disable-next-line svelte/no-at-html-tags -->
					<p class="intro-paragraph">{@html DOMPurify.sanitize(paragraph)}</p>
				{/each}
			</div>
			<div class="intro-paragraph-column">
				{#each introductoryTextRight as paragraph}
					<!-- eslint-disable-next-line svelte/no-at-html-tags -->
					<p class="intro-paragraph">{@html DOMPurify.sanitize(paragraph)}</p>
				{/each}
			</div>
		</div>
	</div>
</section>

<style>
	/* The .section-heading style is now correctly handled by the global app.css */

	.architect-content-wrapper {
		background-color: var(--color-background);
		border: 1px solid var(--color-outline);
		border-radius: var(--border-radius-sharp);
		padding: 3rem;
		max-width: 1100px;
		margin: 0 auto;
		box-shadow: 0 0 25px rgba(var(--color-primary-rgb), 0.15);
	}

	.intro-paragraphs-section {
		display: flex;
		flex-direction: column;
		gap: 2rem;
	}

	.intro-paragraph-column {
		flex: 1;
	}

	.intro-paragraph {
		font-family: 'Inter', sans-serif;
		font-size: 1.3rem;
		font-variant: small-caps;
		color: var(--color-text-light);
		line-height: 1.8;
		text-align: justify;
	}

	.intro-paragraph :global(strong) {
		color: var(--color-secondary);
		text-shadow: 0 0 8px rgba(var(--color-secondary-rgb), 0.5);
		font-weight: 600;
	}

	@media (min-width: 992px) {
		.intro-paragraphs-section {
			flex-direction: row;
			gap: 3rem;
		}
	}

	@media (max-width: 768px) {
		.architect-content-wrapper {
			padding: 2rem;
		}
		.intro-paragraph {
			font-size: 1.1rem;
		}
	}

	@media (max-width: 640px) {
		.architect-content-wrapper {
			padding: 1.5rem;
		}
		.intro-paragraph {
			font-size: 1rem;
		}
	}
</style>
