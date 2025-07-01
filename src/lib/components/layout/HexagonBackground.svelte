<script lang="ts">
	import { browser } from '$app/environment';
	// Make sure to import Container from pixi.js
	import { Application, Graphics, Polygon, Container as PixiContainer } from 'pixi.js';
	import { onMount, onDestroy } from 'svelte';
	import seedrandom from 'seedrandom';
	import { debounce } from '$lib/utils'; // ++ IMPORT DEBOUNCE UTILITY

	let { biasPointForTypical = 80, seed = null } = $props<{
		biasPointForTypical?: number;
		seed?: string | null;
	}>();

	let app: Application;
	let hostElement: HTMLElement; // Renamed from 'container' to avoid ambiguity
	let resizeObserver: ResizeObserver | null = null;
	let debouncedResizeHandler: () => void; // ++ DEFINE a variable for the debounced handler

	// This will be fetched from CSS custom property
	let pageBackgroundColorHex: number;
	const uniformHexAlpha = 0.05; // User's preferred alpha

	// Colors from the new scheme (ensure these CSS variables are defined in app.css)
	let primaryColorHex: number; // For neon purple --color-primary
	let primaryContainerColorHex: number; // For darker purple border --color-primary-container or a stroke color

	const ABSOLUTE_MIN_RADIUS = 30;
	const TYPICAL_RANGE_MAX = 100;
	const BIG_RANGE_MIN = 150;
	const BIG_RANGE_MAX = 225;
	const HOLE_SUITABILITY_THRESHOLD = TYPICAL_RANGE_MAX * 0.55;
	const RANDOM_OFFSET_FACTOR = 0.4;

	// Parallax settings
	const PARALLAX_SPEED_FACTOR = 0.3; // How much slower the background moves
	const BACKGROUND_HEIGHT_MULTIPLIER = 1.5; // How much taller the background content is

	let backgroundContentContainer: PixiContainer; // Pixi container for all hexagon Graphics objects

	function getHexagonPoints(radius: number, centerX: number = 0, centerY: number = 0): number[] {
		const points: number[] = [];
		for (let i = 0; i < 6; i++) {
			const angle = (i / 6) * Math.PI * 2 - Math.PI / 2;
			points.push(centerX + radius * Math.cos(angle), centerY + radius * Math.sin(angle));
		}
		return points;
	}

	function createHexTile(
		randomFunc: () => number,
		graphics: Graphics,
		displayRadius: number,
		hasHole: boolean,
		holeRadiusRatio: number
	) {
		graphics.clear();
		const outerCornerRadius = Math.max(1, displayRadius * 0.02);

		graphics
			.roundPoly(0, 0, displayRadius - 0.5, 6, outerCornerRadius)
			.fill({ color: primaryColorHex, alpha: uniformHexAlpha })
			.stroke({ color: primaryContainerColorHex, width: 1.5 });

		if (hasHole && displayRadius > HOLE_SUITABILITY_THRESHOLD) {
			const innerRadius = displayRadius * holeRadiusRatio;
			if (innerRadius > ABSOLUTE_MIN_RADIUS * 0.25) {
				const innerCornerRadius = Math.max(1, innerRadius * 0.02);
				graphics
					.roundPoly(0, 0, innerRadius - 0.5, 6, innerCornerRadius)
					.fill(pageBackgroundColorHex)
					.stroke({ color: primaryContainerColorHex, width: 1 });
			}
		}

		if (browser && displayRadius > 1) {
			const hitAreaPoints = getHexagonPoints(displayRadius - 0.5);
			if (hitAreaPoints.length >= 6) {
				graphics.hitArea = new Polygon(hitAreaPoints);
				graphics.eventMode = 'static';
			}
		}
	}

	interface PotentialHex {
		x: number;
		y: number;
		displayRadius: number;
		isBig: boolean;
		forceHole?: boolean;
		forceNoHole?: boolean;
		id: number;
	}
	let hexIdCounter = 0;

	function generateRandomHexagons(
		randomFunc: () => number,
		width: number,
		height: number,
		typicalBiasPointPropValue: number
	) {
		if (!app || !browser || !backgroundContentContainer) return;

		backgroundContentContainer.removeChildren().forEach((child) => child.destroy());

		const potentialHexagons: PotentialHex[] = [];
		hexIdCounter = 0;

		const drawChance = 2.0;
		const chanceForBigHex = 0.045;
		const paddingRatio = 0.18;
		const effectiveCellRadius = BIG_RANGE_MAX * (1 + paddingRatio);
		const cellLayoutWidth = effectiveCellRadius * 1.5;
		const cellLayoutHeight = Math.sqrt(3) * effectiveCellRadius;

		const cols = Math.ceil(width / cellLayoutWidth) + 2;
		const rows = Math.ceil(height / cellLayoutHeight) + 2;

		const gridTotalWidth = cols * cellLayoutWidth;
		const gridTotalHeight = rows * cellLayoutHeight;

		const startX = (width - gridTotalWidth) / 2 + cellLayoutWidth / 2;
		const startY = (height - gridTotalHeight) / 2 + cellLayoutHeight / 2;

		const clampedTypicalBias = Math.max(
			ABSOLUTE_MIN_RADIUS,
			Math.min(typicalBiasPointPropValue, TYPICAL_RANGE_MAX)
		);
		const maxOffsetAmount = effectiveCellRadius * RANDOM_OFFSET_FACTOR;

		for (let r = 0; r < rows; r++) {
			for (let c = 0; c < cols; c++) {
				if (randomFunc() < drawChance) {
					let currentDisplayRadius;
					let isBigHex = randomFunc() < chanceForBigHex;
					if (isBigHex) {
						currentDisplayRadius = BIG_RANGE_MIN + randomFunc() * (BIG_RANGE_MAX - BIG_RANGE_MIN);
					} else {
						const weightTowardsUpperTypical = 0.65;
						let randomRoll = randomFunc();
						if (randomRoll < weightTowardsUpperTypical && clampedTypicalBias < TYPICAL_RANGE_MAX) {
							currentDisplayRadius =
								clampedTypicalBias + randomFunc() * (TYPICAL_RANGE_MAX - clampedTypicalBias);
						} else if (ABSOLUTE_MIN_RADIUS < clampedTypicalBias) {
							currentDisplayRadius =
								ABSOLUTE_MIN_RADIUS + randomFunc() * (clampedTypicalBias - ABSOLUTE_MIN_RADIUS);
						} else {
							currentDisplayRadius =
								clampedTypicalBias === ABSOLUTE_MIN_RADIUS ||
								clampedTypicalBias === TYPICAL_RANGE_MAX
									? ABSOLUTE_MIN_RADIUS + randomFunc() * (TYPICAL_RANGE_MAX - ABSOLUTE_MIN_RADIUS)
									: clampedTypicalBias;
						}
						currentDisplayRadius = Math.max(
							ABSOLUTE_MIN_RADIUS,
							Math.min(currentDisplayRadius, TYPICAL_RANGE_MAX)
						);
					}
					currentDisplayRadius = Math.max(ABSOLUTE_MIN_RADIUS, currentDisplayRadius);
					let gx = c * cellLayoutWidth;
					let gy = r * cellLayoutHeight;
					if (c % 2 !== 0) gy += cellLayoutHeight / 2;
					const randomOffsetX = (randomFunc() - 0.5) * 2 * maxOffsetAmount;
					const randomOffsetY = (randomFunc() - 0.5) * 2 * maxOffsetAmount;
					potentialHexagons.push({
						id: hexIdCounter++,
						x: startX + gx + randomOffsetX,
						y: startY + gy + randomOffsetY,
						displayRadius: currentDisplayRadius,
						isBig: isBigHex
					});
				}
			}
		}

		if (potentialHexagons.length > 0) {
			for (let i = potentialHexagons.length - 1; i > 0; i--) {
				const j = Math.floor(randomFunc() * (i + 1));
				[potentialHexagons[i], potentialHexagons[j]] = [potentialHexagons[j], potentialHexagons[i]];
			}
			potentialHexagons[0].forceNoHole = true;
			if (potentialHexagons.length > 1) {
				for (const hex of potentialHexagons) {
					if (
						hex.id !== potentialHexagons[0].id &&
						hex.displayRadius > HOLE_SUITABILITY_THRESHOLD
					) {
						hex.forceHole = true;
						break;
					}
				}
			}
		}

		for (const hexConfig of potentialHexagons) {
			const tile = new Graphics();
			backgroundContentContainer.addChild(tile);

			let actualAttemptHole = hexConfig.forceHole
				? true
				: hexConfig.forceNoHole
					? false
					: hexConfig.displayRadius > HOLE_SUITABILITY_THRESHOLD * 0.9 && randomFunc() < 0.6;
			const holeRatio = 0.5 + randomFunc() * 0.25;
			createHexTile(randomFunc, tile, hexConfig.displayRadius, actualAttemptHole, holeRatio);
			tile.position.set(hexConfig.x, hexConfig.y);
		}
	}

	function getEffectiveSeed(): string {
		if (seed) {
			return seed;
		}
		if (browser) {
			const seedKey = 'hexagonBackgroundSeed_v2';
			let sessionSeed = sessionStorage.getItem(seedKey);
			if (!sessionSeed) {
				sessionSeed = Date.now().toString() + Math.random().toString();
				sessionStorage.setItem(seedKey, sessionSeed);
			}
			return sessionSeed;
		}
		return 'default-seed-v2';
	}

	function handleScroll() {
		if (backgroundContentContainer) {
			backgroundContentContainer.y = -window.scrollY * PARALLAX_SPEED_FACTOR;
		}
	}

	function updateColorsFromCss() {
		const styles = getComputedStyle(document.body);
		pageBackgroundColorHex = parseInt(
			styles.getPropertyValue('--color-background').trim().substring(1),
			16
		);
		primaryColorHex = parseInt(
			styles.getPropertyValue('--color-primary').trim().substring(1),
			16
		);
		const primaryContainerStr = styles.getPropertyValue('--color-primary-container').trim();
		primaryContainerColorHex = parseInt(primaryContainerStr.substring(1), 16);
		console.log("refresh colors: ", primaryContainerStr);
	}

	function regenerateHexagons() {
		if (app && hostElement && backgroundContentContainer) {
			updateColorsFromCss(); // Update colors before regenerating
			const currentSeed = getEffectiveSeed();
			const seededRandom = seedrandom(currentSeed);
			generateRandomHexagons(
				seededRandom,
				window.innerWidth,
				window.innerHeight * BACKGROUND_HEIGHT_MULTIPLIER,
				biasPointForTypical
			);
			backgroundContentContainer.y = -(window.innerHeight * (BACKGROUND_HEIGHT_MULTIPLIER - 1)) / 2;
			handleScroll();
		}
	}

	function handleResize() {
		if (app && hostElement && backgroundContentContainer) {
			app.renderer.resize(window.innerWidth, window.innerHeight);
			regenerateHexagons(); // Call regenerate on resize
		}
	}

	onMount(async () => {
		if (browser && hostElement) {
			// ++ CREATE debounced handler instance with a 250ms wait time
			debouncedResizeHandler = debounce(handleResize, 250);

			updateColorsFromCss(); // Initial color load

			app = new Application();
			await app.init({
				resizeTo: window,
				antialias: true,
				backgroundAlpha: 0
			});

			if (!hostElement.contains(app.canvas)) {
				hostElement.appendChild(app.canvas);
			}

			backgroundContentContainer = new PixiContainer();
			app.stage.addChild(backgroundContentContainer);

			regenerateHexagons(); // Initial hexagon generation

			// ++ USE the debounced handler in the observer
			resizeObserver = new ResizeObserver(debouncedResizeHandler);
			resizeObserver.observe(document.body);

			window.addEventListener('scroll', handleScroll, { passive: true });
			handleScroll();

			// Listen for custom theme change event
			document.body.addEventListener('themeChanged', regenerateHexagons);
		}
	});

	onDestroy(() => {
		if (resizeObserver && document.body) {
			resizeObserver.unobserve(document.body);
		}
		if (browser) {
			window.removeEventListener('scroll', handleScroll);
			document.body.removeEventListener('themeChanged', regenerateHexagons);
		}
		if (app) {
			app.destroy(true, { children: true, texture: true });
		}
	});
</script>

<div bind:this={hostElement} class="background-parallax-container"></div>

<style>
	.background-parallax-container {
		position: fixed;
		top: 0;
		left: 0;
		width: 100vw;
		height: 100dvh;
		z-index: -1;
		background-color: transparent;
		overflow: hidden;
		pointer-events: none;
	}

	.background-parallax-container::before {
		content: '';
		position: absolute;
		top: 0;
		left: 0;
		width: 100%;
		height: 100%;
		background: linear-gradient(
			135deg,
			rgba(var(--on-background-rgb, 224, 224, 224), 0.02) 0%,
			rgba(var(--on-background-rgb, 224, 224, 224), 0.005) 40%,
			rgba(var(--on-background-rgb, 224, 224, 224), 0) 65%
		);
		z-index: 1;
	}

	:global(.background-parallax-container > canvas) {
		position: relative;
		z-index: 2;
		display: block;
	}
</style>
