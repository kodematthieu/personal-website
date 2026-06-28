<script lang="ts">
	import type { Snippet } from 'svelte';

	// Define component inputs with Svelte 5 snippet props
	let { front, back, children } = $props<{
		front?: Snippet;
		back?: Snippet;
		children?: Snippet;
	}>();

	// Internal reactive state
	let isFlipped = $state(false);

	// State controller
	function toggleFlip(event: Event) {
		const target = event.target as HTMLElement;
		if (target.closest('a')) {
			return;
		}
		event.preventDefault();
		isFlipped = !isFlipped;
	}
</script>

<!-- 
  A11y: role="button" + tabindex="0" enables native focus. 
  Keydown event maps Space and Enter to the click handler. 
-->
<div
	class="card-viewport"
	class:is-flipped={isFlipped}
	role="button"
	tabindex="0"
	aria-pressed={isFlipped}
	onclick={toggleFlip}
	onkeydown={(e) => (e.key === 'Enter' || e.key === ' ') && toggleFlip(e)}
>
	<div class="card-rotator">
		<!-- Card Front View -->
		<div class="card-face card-front">
			{#if front}
				{@render front()}
			{:else if children}
				{@render children()}
			{/if}
		</div>

		<!-- Card Back View -->
		<div class="card-face card-back">
			<div class="pattern-back"></div>
			<div class="glow-back"></div>
			{#if back}
				<div class="card-back-content">
					{@render back()}
				</div>
			{/if}
		</div>
	</div>
</div>

<style lang="scss">
	$border-radius: 7.5px;

	@property --border-angle {
		syntax: '<angle>';
		initial-value: 0deg;
		inherits: false;
	}

	@keyframes border-trace {
		to {
			--border-angle: 360deg;
		}
	}

	@keyframes card-pickup {
		0% {
			translate: 0 0;
			rotate: 0deg;
		}
		40% {
			translate: 0 -4px;
			rotate: -2.5deg;
		}
		100% {
			translate: 0 -8px;
			rotate: 0deg;
		}
	}

	/* 1. Perspective Context */
	.card-viewport {
		display: block;
		width: 250px;
		height: 350px;
		perspective: 1200px;
		cursor: pointer;
		user-select: none;
		outline: none;
		border-radius: $border-radius;
	}

	/* 2. Transform Hub */
	.card-rotator {
		position: relative;
		width: 100%;
		height: 100%;
		transform-style: preserve-3d;
		transition:
			transform 0.6s cubic-bezier(0.25, 0.8, 0.25, 1),
			translate 0.35s cubic-bezier(0.25, 0.8, 0.25, 1),
			rotate 0.35s cubic-bezier(0.25, 0.8, 0.25, 1);
		border-radius: $border-radius;
	}

	/* Reactive State Trigger */
	.card-viewport.is-flipped .card-rotator {
		transform: rotateY(180deg);
	}

	/* Hover pickup */
	.card-viewport:hover .card-rotator {
		animation: card-pickup 0.45s cubic-bezier(0.25, 0.8, 0.25, 1) forwards;
	}

	/* 3. Card Faces */
	.card-face {
		position: absolute;
		width: 100%;
		height: 100%;
		backface-visibility: hidden;
		-webkit-backface-visibility: hidden;
		border-radius: $border-radius;
		box-sizing: border-box;
		padding: 16px;
		display: flex;
		flex-direction: column;
		box-shadow:
			0 10px 25px -5px rgba(0, 0, 0, 0.3),
			0 8px 10px -6px rgba(0, 0, 0, 0.3);
		transition:
			border-color 0.3s ease,
			box-shadow 0.3s ease;
	}

	/* Show trace on hover */
	.card-viewport:hover .card-back::after {
		opacity: 1;
	}

	.card-front {
		background-color: var(--color-surface);
		border: 2px solid rgba(var(--color-primary-rgb), 0.15);
		transform: rotateY(180deg);
	}

	.card-back {
		background-color: var(--color-surface);
		border: 2px solid rgba(var(--color-primary-rgb), 0.4);

		/* Border light trace */
		&::after {
			content: '';
			position: absolute;
			inset: -2px; /* Match the 2px border width */
			border-radius: inherit;
			padding: 2px;
			background: conic-gradient(
				from var(--border-angle),
				transparent 0%,
				/* Glint 1 (Peak at 30%) */ rgba(var(--color-primary-rgb), 0.1) 10%,
				rgba(var(--color-primary-rgb), 0.7) 26%,
				rgba(255, 255, 255, 1) 30%,
				rgba(var(--color-primary-rgb), 0.7) 34%,
				transparent 42%,
				transparent 45%,
				/* Glint 2 (Peak at 80%) */ rgba(var(--color-primary-rgb), 0.1) 60%,
				rgba(var(--color-primary-rgb), 0.7) 76%,
				rgba(255, 255, 255, 1) 80%,
				rgba(var(--color-primary-rgb), 0.7) 84%,
				transparent 92%,
				transparent 100%
			);
			-webkit-mask:
				linear-gradient(#fff 0 0) content-box,
				linear-gradient(#fff 0 0);
			mask:
				linear-gradient(#fff 0 0) content-box,
				linear-gradient(#fff 0 0);
			-webkit-mask-composite: xor;
			mask-composite: exclude;
			opacity: 0;
			transition: opacity 0.4s ease;
			pointer-events: none;
			animation: border-trace 3s linear infinite;
		}
	}

	/* Hover glow */
	.card-viewport:hover .card-front {
		border-color: rgba(var(--color-primary-rgb), 0.3);
		box-shadow:
			0 14px 30px -5px rgba(0, 0, 0, 0.35),
			0 0 20px -4px rgba(var(--color-primary-rgb), 0.2);
	}

	.card-viewport:hover .card-back {
		border-color: rgba(var(--color-primary-rgb), 0.6);
		box-shadow:
			0 14px 30px -5px rgba(0, 0, 0, 0.35),
			0 0 20px -4px rgba(var(--color-primary-rgb), 0.25);
	}

	.pattern-back {
		position: absolute;
		inset: 0;
		border-radius: inherit;
		background-color: var(--color-surface);
		background-image:
			linear-gradient(rgba(var(--color-primary-rgb), 0.06) 1px, transparent 1px),
			linear-gradient(90deg, rgba(var(--color-primary-rgb), 0.06) 1px, transparent 1px);
		background-size: 24px 24px;
		background-position: center;
		z-index: 0;
	}

	.glow-back {
		position: absolute;
		inset: 0;
		border-radius: inherit;
		background: radial-gradient(
			circle at center,
			rgba(var(--color-primary-rgb), 0.14) 0%,
			rgba(var(--color-primary-rgb), 0.03) 45%,
			transparent 70%
		);
		z-index: 1;
		pointer-events: none;
	}

	.card-back-content {
		position: relative;
		z-index: 2;
		width: 100%;
		height: 100%;
		display: flex;
		flex-direction: column;
	}
</style>
