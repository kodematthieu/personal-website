<script lang="ts">
	import Button from '$lib/components/ui/Button.svelte';
	import { enhance } from '$app/forms';
	import type { ActionResult } from '@sveltejs/kit';
	import Icon from '@iconify/svelte';

	let form: HTMLFormElement;
	let isSubmitting = false;
	let formResult: { type: 'success' | 'failure'; message: string } | null = null;
	// ++ STATE to hold field-specific errors
	let formErrors = {
		name: '',
		email: '',
		message: ''
	};
</script>

<section id="transmit" class="transmit-section container">
	<h2 class="section-heading">Channel Activation: Share Insights</h2>

	<form
		bind:this={form}
		method="POST"
		use:enhance={() => {
			isSubmitting = true;
			// ++ RESET errors on each new submission attempt
			formErrors = { name: '', email: '', message: '' };
			formResult = null;

			return async ({ result }: { result: ActionResult }) => {
				isSubmitting = false;

				// The server returns a `failure` type for validation errors
				if (result.type === 'failure') {
					const data = result.data as { error?: string; errors?: typeof formErrors };
					// ++ POPULATE field-specific errors from the server response
					if (data?.errors) {
						formErrors = { ...formErrors, ...data.errors };
					}
					// Update the general error banner
					formResult = {
						type: 'failure',
						message: data?.error ?? 'Please correct the highlighted errors and try again.'
					};
				} else if (result.type === 'success') {
					const data = result.data as { message?: string };
					formResult = {
						type: 'success',
						message:
							data.message ??
							'Signal Transmitted successfully. The Architect will respond when the network is clear.'
					};
					form.reset();
				} else if (result.type === 'error') {
					formResult = {
						type: 'failure',
						message: `An unexpected server error occurred: ${result.error?.message || 'Unknown error.'}`
					};
					console.error('Server action error:', result.error);
				}

				// Logic to hide the banner after 5 seconds
				if (formResult) {
					setTimeout(() => {
						formResult = null;
					}, 5000);
				}
			};
		}}
		class="transmit-form"
		novalidate
	>
		<div class="form-group">
			<label for="name">// Name:</label>
			<input type="text" id="name" name="name" required placeholder="Your Designation" />
			<!-- ++ DISPLAY name error -->
			{#if formErrors.name}
				<p class="form-field-error">{formErrors.name}</p>
			{/if}
		</div>
		<div class="form-group">
			<label for="email">// Signal ID (Email):</label>
			<input type="email" id="email" name="email" required placeholder="your.conduit@example.com" />
			<!-- ++ DISPLAY email error -->
			{#if formErrors.email}
				<p class="form-field-error">{formErrors.email}</p>
			{/if}
		</div>
		<div class="form-group">
			<label for="message">// Message Log:</label>
			<textarea id="message" name="message" required placeholder="Your encrypted message..."
			></textarea>
			<!-- ++ DISPLAY message error -->
			{#if formErrors.message}
				<p class="form-field-error">{formErrors.message}</p>
			{/if}
		</div>

		{#if formResult}
			<div class="form-result {formResult.type}">
				{formResult.message}
			</div>
		{/if}

		<Button type="submit" disabled={isSubmitting}>
			{#if isSubmitting}// Transmitting...//{/if}
			{#if !isSubmitting}// Transmit //{/if}
		</Button>
	</form>

	<div class="social-links">
		<a
			href="https://github.com/kodematthieu"
			target="_blank"
			rel="noopener noreferrer"
			class="social-link"
		>
			<Icon icon="simple-icons:github" width="30" height="30" />
			<span>GitHub Profile</span>
		</a>
		{#if false}
			<!-- Hidden Until Available -->
			<a
				href="https://linkedin.com/in/your-linkedin"
				target="_blank"
				rel="noopener noreferrer"
				class="social-link"
			>
				<Icon icon="simple-icons:linkedin" width="30" height="30" />
				<span>LinkedIn Matrix</span>
			</a>
			<a href="https://your-blog.com" target="_blank" rel="noopener noreferrer" class="social-link">
				<Icon icon="game-icons:spell-book" width="30" height="30" />
				<span>Arcane Grimoire</span>
			</a>
		{/if}
	</div>
</section>

<style>
	.transmit-form {
		max-width: 600px;
		margin: 0 auto;
		background-color: var(--color-surface);
		border: 1px solid var(--color-primary-container);
		border-radius: var(--border-radius-sharp);
		padding: 3rem;
		box-shadow: 0 0 20px rgba(var(--color-primary-rgb), 0.1);
	}
	.form-group {
		margin-bottom: 1.5rem;
	}
	.form-group label {
		display: block;
		font-family: 'Space Mono', monospace;
		font-size: 1rem;
		color: var(--color-primary);
		margin-bottom: 0.5rem;
	}
	.form-group input,
	.form-group textarea {
		width: 100%;
		padding: 1rem;
		background-color: var(--color-bg-dark);
		border: 1px solid var(--color-primary-container);
		border-radius: var(--border-radius-sharp);
		color: var(--color-text-light);
		font-family: 'Inter', sans-serif;
		font-size: 1rem;
		outline: none;
		transition:
			border-color 0.3s ease,
			box-shadow 0.3s ease;
	}
	.form-group input:focus,
	.form-group textarea:focus {
		border-color: var(--color-primary);
		box-shadow: 0 0 10px rgba(var(--color-secondary-rgb), 0.5);
	}
	.form-group textarea {
		resize: vertical;
		min-height: 120px;
	}

	/* ++ STYLE for the field-specific error message */
	.form-field-error {
		color: var(--color-core-red);
		font-family: 'Inter', sans-serif;
		font-size: 0.85rem;
		margin-top: 0.5rem;
	}

	.social-links {
		margin-top: 3rem;
		text-align: center;
		display: flex;
		justify-content: center;
		gap: 2rem;
	}
	.social-link {
		display: flex;
		flex-direction: column;
		align-items: center;
		color: var(--color-text-dim);
		font-family: 'Space Mono', monospace;
		font-size: 0.9rem;
		transition:
			color 0.3s ease,
			transform 0.3s ease;
	}
	.social-link :global(svg) {
		fill: var(--color-primary);
		margin-bottom: 0.5rem;
		transition:
			fill 0.3s ease,
			transform 0.3s ease;
	}
	.social-link:hover {
		color: var(--color-secondary);
		transform: translateY(-5px);
	}
	.social-link:hover :global(svg) {
		fill: var(--color-secondary);
		transform: scale(1.1);
	}

	.form-result {
		padding: 0.75rem 1rem;
		margin-bottom: 1.5rem;
		border-radius: var(--border-radius-sharp);
		text-align: center;
		font-family: 'Space Mono', monospace;
	}

	.form-result.success {
		background-color: rgba(var(--color-secondary-rgb), 0.1);
		border: 1px solid var(--color-secondary);
		color: var(--color-secondary);
	}

	.form-result.failure {
		background-color: rgba(var(--color-core-red), 0.1);
		border: 1px solid var(--color-core-red);
		color: var(--color-core-red);
	}

	@media (max-width: 768px) {
		.transmit-form {
			padding: 2rem;
		}
		.social-links {
			flex-wrap: wrap;
			gap: 1rem;
		}
	}
	@media (max-width: 480px) {
		.transmit-form {
			padding: 1.5rem;
		}
		.form-group label {
			font-size: 0.9rem;
		}
		.form-group input,
		.form-group textarea {
			padding: 0.8rem;
			font-size: 0.9rem;
		}
	}
</style>
