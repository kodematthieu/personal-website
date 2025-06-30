<script lang="ts">
	import Icon from '@iconify/svelte';
	import Button from '$lib/components/ui/Button.svelte';

	export type Project = {
		title: string;
		description: string;
		projectTypeLabel: string; // Renamed and mandatory
		techTags: string[];
		githubLink: string;
	};

	let { projects } = $props<{ projects: Project[] }>();
</script>

<section id="constructs" class="constructs-section container">
	<h2 class="section-heading">Logical Constructs: Ongoing Iterations</h2>

	{#if projects.length > 0}
		<div class="project-grid">
			{#each projects as project}
				<div class="project-card">
					<div class="project-image">
						<span class="project-image-placeholder-text">{project.projectTypeLabel}</span>
					</div>
					<div class="project-content">
						<div class="content-text-wrapper">
							<h3>{project.title}</h3>
							<p>{project.description}</p>
							<p class="project-tech">{project.techTags.join(' | ')}</p>
						</div>
						<a
							href={project.githubLink}
							class="project-link"
							target="_blank"
							rel="noopener noreferrer"
						>
							Review Source <Icon icon="mdi:arrow-right" />
						</a>
					</div>
				</div>
			{/each}
		</div>
	{:else}
		<div class="no-constructs-notice">
			<p>No constructs available for review. Synthesis in progress.</p>
		</div>
	{/if}

	<div class="archive-link-wrapper">
		<Button disabled={projects.length === 0}>// Access Full Archives //</Button>
	</div>
</section>

<style>
	.no-constructs-notice {
		text-align: center;
		padding: 4rem 2rem;
		background-color: var(--color-surface);
		border: 1px dashed var(--color-primary-container);
		border-radius: var(--border-radius-sharp);
		max-width: 600px;
		margin: 2rem auto 0;
		color: var(--color-text-dim);
		font-family: 'Space Mono', monospace;
	}

	.project-grid {
		display: grid;
		grid-template-columns: repeat(auto-fit, minmax(320px, 1fr)); /* Responsive grid */
		gap: 2.5rem;
		justify-items: center; /* Center cards in the grid */
	}

	.project-card {
		background-color: var(--color-surface);
		border: 1px solid var(--color-primary-container);
		border-radius: 8px;
		overflow: hidden;
		box-shadow: 0 4px 20px rgba(0, 0, 0, 0.3);
		transition:
			transform 0.3s ease,
			box-shadow 0.3s ease,
			border-color 0.3s ease;
		display: flex;
		flex-direction: column;
		max-width: 350px; /* Prevent cards from becoming too wide */
		width: 100%; /* Ensure card fills its column */
	}

	.project-card:hover {
		transform: translateY(-8px); /* Lift effect */
		box-shadow: 0 8px 30px rgba(0, 0, 0, 0.5);
		border-color: var(--color-primary);
	}

	.project-image {
		width: 100%;
		aspect-ratio: 16 / 9;
		background-color: var(--color-background);
		align-items: center;
		justify-content: center;
		display: flex;
		color: var(--color-text-dim);
		font-family: var(--code-font, 'Space Mono', monospace);
		border-bottom: 1px solid var(--color-primary-container);
		font-size: 0.9rem;
		position: relative;
		overflow: hidden;
	}

	.project-image::before {
		content: '';
		position: absolute;
		width: 100%;
		height: 100%;
		background: linear-gradient(
			45deg,
			rgba(var(--color-deep-indigo-primary-rgb), 0.2),
			rgba(var(--color-secondary-rgb), 0.1)
		);
		opacity: 0.8;
		z-index: 0;
	}

	.project-image .project-image-placeholder-text {
		position: relative;
		z-index: 1;
		text-shadow: 0 0 8px var(--color-bg-dark);
		color: var(--color-text-light);
		font-size: 1.2rem;
		white-space: nowrap;
		overflow: hidden;
		text-overflow: ellipsis;
	}

	.project-content {
		padding: 1.75rem;
		flex-grow: 1;
		display: flex;
		flex-direction: column;
		justify-content: space-between;
		text-align: left;
	}
	.content-text-wrapper {
		display: flex;
		flex-direction: column;
		flex-grow: 1;
	}

	.project-content h3 {
		color: var(--color-primary);
		margin-bottom: 0.5rem;
		font-size: 1.5rem;
		text-align: left;
		font-family: 'Space Mono', monospace;
	}

	.project-content p {
		color: var(--color-text-dim);
		font-size: 0.95rem;
		margin-bottom: 1rem;
		font-family: 'Inter', sans-serif;
	}
	.project-tech {
		font-family: 'Space Mono', monospace;
		font-size: 0.85rem;
		color: var(--color-secondary);
		word-spacing: 5px;
	}

	.project-link {
		display: inline-flex;
		align-items: center;
		gap: 8px;
		margin-top: 1.5rem;
		color: var(--color-primary);
		font-weight: 600;
		align-self: flex-start;
	}
	.project-link :global(svg) {
		transition: transform 0.3s ease;
	}
	.project-link:hover :global(svg) {
		transform: translateX(5px);
	}

	.archive-link-wrapper {
		margin-top: 3rem;
		text-align: center;
	}

	@media (max-width: 768px) {
		.project-grid {
			grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
			gap: 2rem;
		}
		.project-image {
			height: 160px;
		}
		.project-content {
			padding: 1.5rem;
		}
	}
	@media (max-width: 640px) {
		.project-grid {
			grid-template-columns: 1fr;
		}
		.project-image {
			height: 140px;
		}
		.project-card h3 {
			font-size: 1.3rem;
		}
	}
</style>
