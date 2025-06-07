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
		'conceptual thinker'
	];

	function scrollToProjects() {
		const constructsSection = document.getElementById('constructs');
		if (constructsSection) {
			constructsSection.scrollIntoView({ behavior: 'smooth' });
		} else {
			console.warn("Scroll target '#constructs' not found.");
		}
	}

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
				cursorChar: '_'
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
			<Button href="#transmit">// Initiate Dialogue //</Button>
			<Button href="#constructs" onclick={scrollToProjects}>// Explore Constructs //</Button>
		</div>
	</div>
</section>

<style lang="scss">
	.nexus-section {
		height: 100vh;
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
		background-color: var(--color-bg-dark);
		border: 2px solid var(--color-purple-primary);
		box-shadow:
			0 0 30px var(--color-purple-light),
			inset 0 0 20px var(--color-purple-dark);
		border-radius: 50%;
		animation: core-pulse 3s infinite alternate ease-in-out;
		z-index: 2;
	}

	.synthesis-core::before,
	.synthesis-core::after {
		content: '';
		position: absolute;
		background-color: var(--color-purple-primary);
		border-radius: 50%;
		opacity: 0.7;
		animation: data-stream 2s infinite ease-out;
	}

	.synthesis-core::before {
		width: 10px;
		height: 10px;
		top: 20%;
		left: 80%;
		transform: translate(-50%, -50%);
		animation-delay: 0s;
	}

	.synthesis-core::after {
		width: 8px;
		height: 8px;
		top: 70%;
		left: 30%;
		transform: translate(-50%, -50%);
		animation-delay: 1s;
	}

	@keyframes core-pulse {
		from {
			box-shadow:
				0 0 20px var(--color-purple-light),
				inset 0 0 15px var(--color-purple-dark);
			transform: translate(-50%, -50%) scale(1);
		}
		to {
			box-shadow:
				0 0 50px var(--color-purple-light),
				inset 0 0 30px var(--color-purple-dark);
			transform: translate(-50%, -50%) scale(1.02);
		}
	}

	@keyframes data-stream {
		0% {
			transform: scale(0.5);
			opacity: 0.5;
		}
		50% {
			transform: scale(1.2);
			opacity: 1;
		}
		100% {
			transform: scale(0.5);
			opacity: 0.5;
		}
	}

	.nexus-content {
		position: relative;
		z-index: 5;
	}

	.name-headline {
		font-family: 'Space Mono', monospace;
		font-size: clamp(2.5rem, 6vw, 3.8rem);
		color: var(--color-purple-light);
		margin-bottom: 1.5rem;
		letter-spacing: 3px;
		text-shadow: 0 0 20px var(--color-purple-primary);
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
