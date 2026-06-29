<script lang="ts">
	import MentalCard from './MentalCard.svelte';
	import type { Props as MentalCardProps } from './MentalCard.svelte';
	import { onDestroy } from 'svelte';

	let { cards }: { cards: MentalCardProps[] } = $props();

	let activeIndex = $state(0);
	let isDragging = $state(false);
	let isTransitioning = $state(false);
	let isFlashing = $state(false);
	let startX = 0;
	let dragged = $state(false);

	let transitionTimeout: ReturnType<typeof setTimeout>;
	let flashTimeout: ReturnType<typeof setTimeout>;

	onDestroy(() => {
		clearTimeout(transitionTimeout);
		clearTimeout(flashTimeout);
	});

	function triggerTransition() {
		isTransitioning = true;
		isFlashing = false;
		clearTimeout(transitionTimeout);
		clearTimeout(flashTimeout);
		transitionTimeout = setTimeout(() => {
			isTransitioning = false;
			isFlashing = true;
			flashTimeout = setTimeout(() => {
				isFlashing = false;
			}, 20);
		}, 500);
	}

	function prev() {
		if (activeIndex > 0) {
			activeIndex--;
			triggerTransition();
		}
	}

	function next() {
		if (activeIndex < cards.length - 1) {
			activeIndex++;
			triggerTransition();
		}
	}

	function selectCard(index: number) {
		if (dragged) return;
		activeIndex = index;
		triggerTransition();
	}

	function handleStart(clientX: number) {
		isDragging = true;
		startX = clientX;
		dragged = false;
	}

	function handleMove(clientX: number) {
		if (!isDragging) return;
		const deltaX = clientX - startX;
		if (Math.abs(deltaX) > 10) {
			dragged = true;
		}

		if (deltaX > 60) {
			prev();
			isDragging = false;
		} else if (deltaX < -60) {
			next();
			isDragging = false;
		}
	}

	function handleEnd() {
		isDragging = false;
	}

	function handleItemClick(index: number, event: MouseEvent) {
		if (index !== activeIndex) {
			event.stopPropagation();
			event.preventDefault();
			selectCard(index);
		} else if (dragged) {
			event.stopPropagation();
			event.preventDefault();
			setTimeout(() => {
				dragged = false;
			}, 0);
		}
	}

	function handleKeydown(event: KeyboardEvent) {
		const activeEl = document.activeElement;
		if (
			activeEl &&
			(activeEl.tagName === 'INPUT' ||
				activeEl.tagName === 'TEXTAREA' ||
				(activeEl as HTMLElement).isContentEditable)
		) {
			return;
		}

		if (event.key === 'ArrowLeft') {
			prev();
		} else if (event.key === 'ArrowRight') {
			next();
		}
	}

	function getCardStyle(index: number) {
		const offset = index - activeIndex;
		if (offset === 0) {
			return `
				--tx: 0px;
				--tz: 0px;
				--ry: 0deg;
				--s: 1;
				--zi: 10;
				--op: 1;
			`;
		}
		const dir = Math.sign(offset);
		const absOffset = Math.abs(offset);

		return `
			--tx: calc((${offset} * var(--spacing-base)) + (${dir} * var(--spacing-push)));
			--tz: calc(var(--z-base) - (${absOffset - 1} * var(--z-step)));
			--ry: calc(${dir} * -1 * var(--tilt-angle));
			--s: 0.82;
			--zi: ${10 - absOffset};
			--op: ${Math.max(0.15, 1.0 - absOffset * 0.35)};
		`;
	}
</script>

<svelte:window onkeydown={handleKeydown} />

<div class="carousel-container">
	<!-- svelte-ignore a11y_no_noninteractive_element_interactions -->
	<div
		class="carousel-viewport select-none"
		class:grabbing={isDragging}
		role="region"
		aria-label="Mental Deck Carousel"
		onmousedown={(e) => handleStart(e.clientX)}
		onmousemove={(e) => handleMove(e.clientX)}
		onmouseup={handleEnd}
		onmouseleave={handleEnd}
		ontouchstart={(e) => e.touches[0] && handleStart(e.touches[0].clientX)}
		ontouchmove={(e) => e.touches[0] && handleMove(e.touches[0].clientX)}
		ontouchend={handleEnd}
	>
		<div class="carousel-track">
			{#each cards as card, index (card.name)}
				<div
					class="carousel-item-wrapper"
					class:disable-hover={isFlashing ||
						((isTransitioning || isDragging) && index !== activeIndex)}
					style={getCardStyle(index)}
					onclickcapture={(e) => handleItemClick(index, e)}
				>
					<MentalCard
						name={card.name}
						rating={card.rating}
						path={card.path}
						description={card.description}
					/>
				</div>
			{/each}
		</div>
	</div>

	<!-- Controls -->
	<div class="flex items-center justify-center gap-6 mt-8">
		<button
			type="button"
			class="nav-btn"
			onclick={prev}
			disabled={activeIndex === 0}
			aria-label="Previous card"
		>
			<svg
				xmlns="http://www.w3.org/2000/svg"
				viewBox="0 0 24 24"
				fill="none"
				stroke="currentColor"
				stroke-width="2.5"
				stroke-linecap="round"
				stroke-linejoin="round"
				class="size-6"
			>
				<path d="m15 18-6-6 6-6" />
			</svg>
		</button>

		<span class="text-slate-400 font-mono text-sm tracking-widest select-none">
			{activeIndex + 1} / {cards.length}
		</span>

		<button
			type="button"
			class="nav-btn"
			onclick={next}
			disabled={activeIndex === cards.length - 1}
			aria-label="Next card"
		>
			<svg
				xmlns="http://www.w3.org/2000/svg"
				viewBox="0 0 24 24"
				fill="none"
				stroke="currentColor"
				stroke-width="2.5"
				stroke-linecap="round"
				stroke-linejoin="round"
				class="size-6"
			>
				<path d="m9 18 6-6-6-6" />
			</svg>
		</button>
	</div>
</div>

<style lang="scss">
	.carousel-container {
		width: 100%;
		max-width: 1000px;
		display: flex;
		flex-direction: column;
		align-items: center;

		/* Spacing variables for 3D translation & rotation spacing */
		--spacing-base: 100px;
		--spacing-push: 120px;
		--z-base: -160px;
		--z-step: 50px;
		--tilt-angle: 42deg;

		@media (max-width: 768px) {
			--spacing-base: 60px;
			--spacing-push: 90px;
			--z-base: -120px;
			--z-step: 40px;
			--tilt-angle: 35deg;
		}

		@media (max-width: 480px) {
			--spacing-base: 30px;
			--spacing-push: 60px;
			--z-base: -100px;
			--z-step: 30px;
			--tilt-angle: 25deg;
		}
	}

	.carousel-viewport {
		width: 100%;
		height: 420px;
		display: flex;
		justify-content: center;
		align-items: center;
		overflow: visible; /* Crucial to let 3D rotated cards show their bounds */
		perspective: 1200px;

		&.grabbing {
			cursor: grabbing;
		}
	}

	.carousel-track {
		position: relative;
		width: 250px; /* Matches card width */
		height: 350px; /* Matches card height */
		transform-style: preserve-3d;
	}

	.carousel-item-wrapper {
		position: absolute;
		inset: 0;
		transform-style: preserve-3d;
		transform: translate3d(var(--tx), 0, var(--tz)) rotateY(var(--ry)) scale(var(--s));
		z-index: var(--zi);
		opacity: var(--op);
		transition:
			transform 0.5s cubic-bezier(0.25, 0.8, 0.25, 1),
			opacity 0.5s cubic-bezier(0.25, 0.8, 0.25, 1),
			z-index 0.5s;
		pointer-events: auto;

		&.disable-hover {
			:global(.card-viewport) {
				pointer-events: none;
			}
		}
	}

	.nav-btn {
		display: flex;
		align-items: center;
		justify-content: center;
		width: 44px;
		height: 44px;
		background: rgba(255, 255, 255, 0.03);
		border: 1px solid rgba(var(--color-primary-rgb), 0.25);
		border-radius: 50%;
		color: var(--color-text-primary);
		cursor: pointer;
		transition: all 0.25s cubic-bezier(0.25, 0.8, 0.25, 1);
		outline: none;
		box-shadow: 0 0 10px rgba(0, 0, 0, 0.2);

		&:hover:not(:disabled) {
			background: rgba(var(--color-primary-rgb), 0.15);
			border-color: rgba(var(--color-primary-rgb), 0.6);
			color: #fff;
			box-shadow: 0 0 15px rgba(var(--color-primary-rgb), 0.3);
			transform: scale(1.05);
		}

		&:disabled {
			opacity: 0.25;
			cursor: not-allowed;
			border-color: rgba(255, 255, 255, 0.05);
		}
	}
</style>
