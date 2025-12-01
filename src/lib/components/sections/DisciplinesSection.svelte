<script lang="ts">
	// This section displays the two categories of skills.
	let {
		crystallineSkills,
		etherealSkills,
	}: {
		crystallineSkills: string[];
		etherealSkills: string[];
	} = $props();
</script>

<section id="disciplines" class="disciplines-section container">
	<h2 class="section-heading">Conceptual Disciplines & Applied Logic</h2>
	<div class="disciplines-grid">
		<div class="discipline-category hard-magic">
			<h3>// Crystalline Logic //</h3>
			<div class="discipline-list">
				{#each crystallineSkills as skill}
					<div class="discipline-item"><span>{skill}</span></div>
				{/each}
			</div>
		</div>
		<div class="discipline-category soft-magic">
			<h3>// Ethereal Creativity //</h3>
			<div class="discipline-list">
				{#each etherealSkills as skill}
					<div class="discipline-item"><span>{skill}</span></div>
				{/each}
			</div>
		</div>
	</div>
</section>

<style>
	.disciplines-grid {
		display: grid;
		grid-template-columns: 1fr; /* Mobile default */
		gap: 4rem;
		max-width: 900px;
		margin: 0 auto;
	}
	.discipline-category {
		background-color: var(--color-surface);
		border: 1px solid var(--color-primary-container);
		border-radius: var(--border-radius-sharp);
		padding: 3rem;
		box-shadow: 0 0 15px rgba(var(--color-primary-rgb), 0.1);
		transition: all 0.3s ease;
	}
	.discipline-category:hover {
		box-shadow: 0 0 30px rgba(var(--color-secondary-rgb), 0.3);
		transform: translateY(-5px);
	}
	.discipline-category h3 {
		font-family: 'Space Mono', monospace;
		font-size: 1.8rem;
		color: var(--color-primary);
		margin-bottom: 2rem;
		text-align: center;
		letter-spacing: 1px;
	}
	.discipline-list {
		display: flex;
		flex-wrap: wrap;
		gap: 1.5rem;
		justify-content: center;
	}
	.discipline-item {
		background-color: var(--color-bg-dark-light);
		border: 1px solid var(--color-primary-container);
		padding: 0.7rem 1.2rem;
		border-radius: var(--border-radius-sharp);
		font-family: 'Space Mono', monospace;
		font-size: 0.95rem;
		color: var(--color-text-dim);
		transition: all 0.2s ease;
		position: relative;
		overflow: hidden;
	}
	.discipline-item::before {
		content: '';
		position: absolute;
		top: 0;
		left: 0;
		width: 100%;
		height: 100%;
		background: linear-gradient(45deg, var(--color-primary), var(--color-secondary));
		opacity: 0;
		transition: opacity 0.3s ease;
		z-index: 0;
	}
	.discipline-item:hover {
		color: var(--color-on-primary);
		transform: translateY(-3px);
		box-shadow: 0 0 15px rgba(var(--color-secondary-rgb), 0.5);
	}
	.discipline-item:hover::before {
		opacity: 0.8;
	}
	.discipline-item span {
		position: relative;
		z-index: 1;
	}
	.discipline-category.soft-magic .discipline-item::before {
		background: linear-gradient(45deg, var(--color-secondary), var(--color-primary));
	}

	@media (min-width: 992px) {
		.disciplines-grid {
			grid-template-columns: repeat(auto-fit, minmax(450px, 1fr));
			gap: 2rem;
		}
	}

	@media (max-width: 768px) {
		.disciplines-grid {
			gap: 3rem;
		}
		.discipline-category h3 {
			font-size: 1.6rem;
		}
	}

	@media (max-width: 640px) {
		.discipline-category {
			padding: 1.5rem 1rem;
		}
		.discipline-category h3 {
			font-size: 1.2rem;
			margin-bottom: 1.5rem;
		}
		.discipline-item {
			font-size: 0.8rem;
			padding: 0.4rem 0.8rem;
		}
		.discipline-list {
			gap: 0.75rem;
		}
	}
</style>
