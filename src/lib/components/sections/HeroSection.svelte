<script lang="ts">
	import Typed from 'typed.js';
	import { onMount, onDestroy } from 'svelte';
	import Button from '$lib/components/ui/Button.svelte';

	let nameTextElem: HTMLElement;
	let typedInstance: Typed;

	const typedStrings = [
		'systems architect',
		'engineer of ideas',
		'logic solver',
		'conceptual thinker',
	];

	onMount(() => {
		if (nameTextElem) {
			typedInstance = new Typed(nameTextElem, {
				strings: typedStrings,
				smartBackspace: true,
				typeSpeed: 45,
				backSpeed: 25,
				startDelay: 500,
				backDelay: 2800,
				loop: true,
				showCursor: true,
				cursorChar: '_',
			});
		}
	});

	onDestroy(() => {
		if (typedInstance) {
			typedInstance.destroy();
		}
	});
</script>

<section id="nexus" class="nexus-section">
	<div class="synthesis-core"></div>
	<div class="nexus-content">
		<h1 class="name-headline">KodeMat // Karel Matthieu Logro</h1>
		<p class="typed-text-paragraph">
			<span class="typed-text" bind:this={nameTextElem}></span>
		</p>
		<div class="nexus-buttons">
			<Button href="#transmit" class="nexus-button">// Initiate Dialogue //</Button>
			<Button href="#constructs" class="nexus-button">// Explore Constructs //</Button>
		</div>
	</div>
</section>

<style lang="scss">
	.nexus-section {
		height: 100dvh;
		display: flex;
		align-items: center;
		justify-content: center;
		text-align: center;
		position: relative;
		overflow: hidden;
		padding: 0 2rem;
	}

	/* ... (all the other nexus-section styles, synthesis-core, nexus-content, etc. from +page.svelte) ... */
	.synthesis-core {
		position: absolute;
		top: 50%;
		left: 50%;
		transform: translate(-50%, -50%);
		width: 250px;
		height: 250px;
		background: radial-gradient(circle, #000 10%, #111 30%, var(--color-background) 70%);
		border-radius: 50%;
		box-shadow:
			0 0 15px 5px rgba(0, 0, 0, 0.8),
			inset 0 0 20px 10px #000;
		animation: core-swirl 15s linear infinite;
		z-index: 2;
		display: flex;
		align-items: center;
		justify-content: center;
	}

	.synthesis-core::before,
	.synthesis-core::after {
		content: '';
		position: absolute;
		border-radius: 50%;
		z-index: 1;
	}

	/* Photon Ring */
	.synthesis-core::before {
		width: 110%;
		height: 110%;
		border: 2px solid var(--color-cyan-teal-accent);
		opacity: 0.8;
		animation: photon-ring-pulse 4s infinite alternate ease-in-out;
	}

	/* Accretion Disk */
	.synthesis-core::after {
		width: 150%;
		height: 150%;
		border: 1px dashed var(--color-primary-light);
		opacity: 0.4;
		animation: accretion-disk-flux 12s ease-in-out infinite;
	}

	@keyframes core-swirl {
		from {
			transform: translate(-50%, -50%) rotate(0deg);
		}
		to {
			transform: translate(-50%, -50%) rotate(360deg);
		}
	}

	@keyframes photon-ring-pulse {
		from {
			box-shadow: 0 0 10px var(--color-cyan-teal-accent);
			transform: scale(1);
			opacity: 0.6;
		}
		to {
			box-shadow: 0 0 25px var(--color-cyan-teal-accent);
			transform: scale(1.03);
			opacity: 0.9;
		}
	}

	@keyframes accretion-disk-flux {
		0% {
			transform: rotate(0deg) scale(1);
			opacity: 0.4;
		}
		70% {
			transform: rotate(-270deg) scale(1);
			opacity: 0.4;
		}
		85% {
			transform: rotate(-300deg) scale(0.85); /* Shrink and slow down rotation */
			opacity: 0.2; /* Fade a bit */
		}
		100% {
			transform: rotate(-360deg) scale(1);
			opacity: 0.4;
		}
	}

	.nexus-content {
		position: relative;
		z-index: 5;
	}

	.name-headline {
		font-family: 'Space Mono', monospace;
		font-size: clamp(2.5rem, 6vw, 3.8rem);
		color: var(--color-primary-light);
		margin-bottom: 1.5rem;
		letter-spacing: 3px;
		text-shadow: 0 0 20px var(--color-primary);
		text-align: center;
		line-height: 1.2;
	}

	.typed-text-paragraph {
		font-family: 'Inter', sans-serif;
		font-size: clamp(1.2rem, 2.5vw, 1.8rem);
		color: var(--color-text-dim);
		max-width: 700px;
		margin: 0 auto 3rem auto;
		text-align: center;
	}

	.nexus-buttons {
		display: flex;
		justify-content: center;
		gap: 1rem;
		flex-wrap: wrap;
	}

	@media (max-width: 640px) {
		.synthesis-core {
			width: 180px;
			height: 180px;
		}
		.name-headline {
			font-size: clamp(2rem, 5vw, 3rem);
			letter-spacing: 1px;
		}
		.typed-text-paragraph {
			font-size: clamp(1rem, 2.5vw, 1.3rem);
			max-width: 90%;
		}
		.nexus-buttons {
			flex-direction: column;
		}
	}

	@media (max-width: 480px) {
		.synthesis-core {
			width: 150px;
			height: 150px;
		}
	}
</style>
