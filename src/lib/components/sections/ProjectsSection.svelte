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
	<div class="archive-link-wrapper">
		<Button disabled={true}>// Access Full Archives //</Button>
	</div>
</section>

<style>
	.project-grid {
		display: grid;
		grid-template-columns: repeat(auto-fit, minmax(320px, 1fr)); /* Responsive grid */
		gap: 2.5rem;
	}

	.project-card {
		background-color: var(--color-core-dark-bg, #111111);
		border: 1px solid rgba(var(--color-purple-primary-rgb), 0.3); /* Subtle purple border */
		border-radius: 8px;
		overflow: hidden;
		box-shadow: 0 4px 20px rgba(0, 0, 0, 0.3);
		transition:
			transform 0.3s ease,
			box-shadow 0.3s ease,
			border-color 0.3s ease;
		display: flex;
		flex-direction: column;
	}

	.project-card:hover {
		transform: translateY(-8px); /* Lift effect */
		box-shadow:
			0 8px 30px rgba(0, 0, 0, 0.5),
			0 0 25px rgba(var(--color-purple-light), 0.4); /* Enhanced glow */
		border-color: var(--color-purple-light); /* Highlight border */
	}

	.project-image {
		width: 100%;
		height: 200px;
		background-color: var(--color-bg-dark); /* Placeholder color */
		align-items: center;
		justify-content: center;
		display: flex; /* Still flex for centering the text overlay */
		color: var(--color-text-dim);
		font-family: var(--code-font, 'Space Mono', monospace);
		border-bottom: 1px solid rgba(var(--color-purple-primary-rgb), 0.5);
		font-size: 0.9rem;
		position: relative; /* For ::before and text positioning */
		overflow: hidden; /* Important for containing ::before */
	}

	.project-image::before {
		content: '';
		position: absolute;
		width: 100%;
		height: 100%;
		background: linear-gradient(
			45deg,
			rgba(var(--color-purple-primary-rgb), 0.2),
			rgba(var(--color-teal-accent), 0.1)
		);
		opacity: 0.8; /* Make it more visible */
		z-index: 0; /* Below the text, acting as a background layer */
	}

	.project-image .project-image-placeholder-text {
		position: relative;
		z-index: 1; /* Ensure text is above the pseudo-element background */
		text-shadow: 0 0 8px var(--color-bg-dark); /* Add shadow for readability */
		color: var(--color-text-light); /* Make text lighter for better contrast */
		font-size: 1.2rem; /* Ensure consistent size */
		white-space: nowrap; /* Prevent text wrapping */
		overflow: hidden;
		text-overflow: ellipsis; /* Add ellipsis if text is too long */
	}

	.project-content {
		padding: 1.75rem;
		flex-grow: 1; /* Allows content to take available space */
		display: flex;
		flex-direction: column;
		justify-content: space-between;
		text-align: left; /* Project text aligns left */
	}
	.content-text-wrapper {
		display: flex;
		flex-direction: column;
		flex-grow: 1;
	}

	.project-content h3 {
		color: var(--color-purple-light);
		margin-bottom: 0.5rem;
		font-size: 1.5rem;
		text-align: left; /* Override global center for h3 in cards */
		font-family: 'Space Mono', monospace;
	}

	.project-content p {
		color: var(--color-text-dim);
		font-size: 0.95rem;
		margin-bottom: 1rem;
		flex-grow: 1;
		font-family: 'Inter', sans-serif;
	}
	.project-tech {
		font-family: 'Space Mono', monospace;
		font-size: 0.85rem;
		color: var(--color-purple-light);
		word-spacing: 5px;
	}

	.project-link {
		display: inline-flex;
		align-items: center;
		gap: 8px;
		margin-top: 1.5rem;
		color: var(--color-purple-light);
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
