<script lang="ts">
	import { navigationLinks } from '$lib/navigation';

	// MODIFICATION: Accept isSidebarOpen state prop
	let { onToggle, isSidebarOpen }: { onToggle: () => void; isSidebarOpen: boolean } = $props();
</script>

// /src/lib/components/layout/MainHeader.svelte
<header class="main-header">
	<div class="container">
		<a href="#nexus" class="logo">
			<!-- SVG Icon: The Architect's Sigil (Dynamic Version) -->
			<svg
				version="1.1"
				xmlns="http://www.w3.org/2000/svg"
				xmlns:xlink="http://www.w3.org/1999/xlink"
				viewBox="0 0 1920 1920"
			>
				<defs>
					<path
						id="major-ray"
						d="M 960 35 Q 945 375, 830 775 A 150 100 0 0 1 1090 775 Q 975 375, 960 35 Z"
					/>
					<path id="minor-ray" d="M 960 160 L 875 605 L 960 580 L 1045 605 Z" />
				</defs>
				<circle class="logo-core" cx="960" cy="960" r="150" />
				<g style="fill: var(--logo-major-ray-color);">
					<use xlink:href="#major-ray" transform="rotate(0, 960, 960)" />
					<use xlink:href="#major-ray" transform="rotate(120, 960, 960)" />
					<use xlink:href="#major-ray" transform="rotate(240, 960, 960)" />
				</g>
				<g style="fill: var(--logo-minor-ray-color);">
					<use xlink:href="#minor-ray" transform="rotate(60, 960, 960)" />
					<use xlink:href="#minor-ray" transform="rotate(180, 960, 960)" />
					<use xlink:href="#minor-ray" transform="rotate(300, 960, 960)" />
				</g>
			</svg>
			KodeMat<span class="logo-tagline"> // Systematic Synthesis</span>
		</a>

		<nav class="main-nav">
			<ul>
				{#each navigationLinks as link}
					<li><a href={link.href}>{link.label}</a></li>
				{/each}
			</ul>
		</nav>

		<!-- MODIFICATION: Add class directive for open state -->
		<button
			class="hamburger-button"
			class:is-open={isSidebarOpen}
			onclick={onToggle}
			aria-label="Toggle navigation menu"
		>
			<span class="hamburger-bar"></span>
			<span class="hamburger-bar"></span>
			<span class="hamburger-bar"></span>
		</button>
	</div>
</header>

<style>
	.main-header {
		background-color: var(--color-bg-dark-light);
		padding: 1.5rem 0;
		border-bottom: 1px solid var(--color-outline);
		position: fixed;
		top: 0;
		z-index: 1000;
		width: 100%;
		box-shadow: 0 2px 10px rgba(0, 0, 0, 0.5);
	}

	.main-header .container {
		display: flex;
		justify-content: space-between;
		align-items: center;
	}

	.logo {
		/* Define the base colors for the logo in "Analysis Mode" */
		--logo-major-ray-color: var(--color-purple-primary);
		--logo-minor-ray-color: var(--color-core-red);
		--logo-core-color-a: var(--color-text-light); /* White */
		--logo-core-color-b: var(--color-core-black); /* Black */

		font-family: 'Space Mono', monospace;
		font-size: 1.8rem;
		color: var(--color-purple-light);
		text-shadow: 0 0 10px var(--color-purple-primary);
		letter-spacing: 1px;
		display: flex;
		align-items: center;
		animation: pulse-logo-text 3s infinite alternate ease-in-out;
		transition:
			color 0.3s ease,
			text-shadow 0.3s ease; /* Smooth color transition for state shift */
	}

	/* MODIFICATION: Style the tagline to be subordinate to the main logo text */
	.logo-tagline {
		display: none; /* Hidden on mobile by default */
		font-size: 1.3rem; /* Reduced font size */
		font-weight: 400; /* Lighter weight */
		color: var(--color-text-dim);
		margin-left: 0.75em;
		letter-spacing: normal; /* Override parent styles */
		text-shadow: none; /* Override parent styles */
		animation: none; /* Override parent styles */
		vertical-align: middle;
	}

	.logo svg {
		margin-right: 10px;
		width: 32px;
		height: 32px;
		animation: rotate-logo 20s infinite linear;
		transition: filter 0.3s ease; /* For potential glow changes */
	}

	.logo svg .logo-core {
		/* Apply the new instant-switch animation */
		animation: core-pulse-color 4s infinite linear; /* Use 'linear' for crisp changes */
		transition: fill 0.3s ease; /* Keep for general fill changes if any */
	}

	/* Define the animations */
	@keyframes rotate-logo {
		from {
			transform: rotate(0deg);
		}
		to {
			transform: rotate(360deg);
		}
	}

	/* NEW: Instant switch for core color */
	@keyframes core-pulse-color {
		0% {
			fill: var(--logo-core-color-a);
		} /* Start with white */
		49% {
			fill: var(--logo-core-color-a);
		} /* Hold white until almost 50% */
		50% {
			fill: var(--logo-core-color-b);
		} /* Instantly switch to black */
		99% {
			fill: var(--logo-core-color-b);
		} /* Hold black until almost 100% */
		100% {
			fill: var(--logo-core-color-a);
		} /* Instantly switch back to white */
	}

	@keyframes pulse-logo-text {
		0% {
			text-shadow: 0 0 5px var(--color-purple-primary);
		}
		50% {
			text-shadow: 0 0 20px var(--color-purple-light);
		}
		100% {
			text-shadow: 0 0 5px var(--color-purple-primary);
		}
	}

	/* STATE SHIFT: Override logo colors when in Flow State */
	:global(body.debug-mode) .logo {
		--logo-major-ray-color: var(--color-core-red);
		/* Minor rays are already red, so no change needed, but could be specified */
		/* --logo-minor-ray-color: var(--color-core-red); */
	}

	/* --- Navigation Styles --- */
	.main-nav ul {
		list-style: none;
		display: flex;
	}
	.main-nav li {
		margin-left: 2.5rem;
	}
	.main-nav a {
		font-family: 'Space Mono', monospace;
		font-size: 1.1rem;
		color: var(--color-text-dim);
		position: relative;
		padding-bottom: 5px;
		transition: color 0.3s ease;
	}
	.main-nav a::after {
		content: '';
		position: absolute;
		left: 0;
		bottom: 0;
		width: 0;
		height: 2px;
		background-color: var(--color-purple-primary);
		transition: width 0.3s ease;
	}
	.main-nav a:hover {
		color: var(--color-purple-light);
	}
	.main-nav a:hover::after {
		width: 100%;
	}

	/* --- ADDITION: Hamburger Button Styles --- */
	.hamburger-button {
		display: none; /* Hidden by default */
		flex-direction: column;
		justify-content: space-around;
		width: 30px;
		height: 24px;
		background: transparent;
		border: none;
		cursor: pointer;
		padding: 0;
		z-index: 1001; /* Above header content */
	}

	.hamburger-bar {
		width: 100%;
		height: 3px;
		background-color: var(--color-text-dim);
		border-radius: 2px;
		transition: all 0.3s ease;
		transform-origin: center;
	}

	/* --- ADDITION: Hamburger to X animation --- */
	.hamburger-button.is-open .hamburger-bar:nth-child(1) {
		transform: translateY(8px) rotate(45deg);
	}
	.hamburger-button.is-open .hamburger-bar:nth-child(2) {
		opacity: 0;
	}
	.hamburger-button.is-open .hamburger-bar:nth-child(3) {
		transform: translateY(-8px) rotate(-45deg);
	}

	/* --- Responsive header adjustments --- */
	@media (min-width: 992px) {
		/* MODIFICATION: Show tagline on desktop views */
		.logo-tagline {
			display: inline;
		}
	}

	@media (max-width: 992px) {
		.main-nav li {
			margin-left: 1.5rem;
		}
	}

	@media (max-width: 768px) {
		.main-header {
			padding: 1rem 0;
		}
		.main-header .container {
			flex-direction: row; /* Keep it as a row to have logo and hamburger side-by-side */
			justify-content: space-between;
			gap: 0.75rem;
		}

		/* MODIFICATION: Hide desktop nav, show hamburger */
		.main-nav {
			display: none;
		}
		.hamburger-button {
			display: flex;
		}
	}

	@media (max-width: 480px) {
		.logo {
			font-size: 1.5rem;
		}
	}
</style>
