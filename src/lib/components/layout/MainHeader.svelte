<script lang="ts">
	import { navigationLinks } from '$lib/navigation';

	// MODIFICATION: Accept isSidebarOpen, activeSectionId, and onToggle props
	let {
		onToggle,
		isSidebarOpen,
		activeSectionId
	}: { onToggle: () => void; isSidebarOpen: boolean; activeSectionId: string } = $props();
</script>

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
					<li>
						<a href={link.href} class:active={link.href === '#' + activeSectionId}>{link.label}</a>
					</li>
				{/each}
			</ul>
		</nav>

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
		background-color: var(--color-surface);
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
		--logo-major-ray-color: var(--color-primary);
		--logo-minor-ray-color: var(--color-core-red);
		--logo-core-color-a: var(--color-text-light);
		--logo-core-color-b: var(--color-core-black);
		font-family: 'Space Mono', monospace;
		font-size: 1.8rem;
		color: var(--color-primary-light);
		text-shadow: 0 0 10px var(--color-primary);
		letter-spacing: 1px;
		display: flex;
		align-items: center;
		animation: pulse-logo-text 3s infinite alternate ease-in-out;
		transition:
			color 0.3s ease,
			text-shadow 0.3s ease;
	}

	.logo-tagline {
		display: none;
		font-size: 1.3rem;
		font-weight: 400;
		color: var(--color-text-dim);
		margin-left: 0.75em;
		letter-spacing: normal;
		text-shadow: none;
		animation: none;
		vertical-align: middle;
	}

	.logo svg {
		margin-right: 10px;
		width: 32px;
		height: 32px;
		animation: rotate-logo 20s infinite linear;
		transition: filter 0.3s ease;
	}

	.logo svg .logo-core {
		animation: core-pulse-color 4s infinite linear;
		transition: fill 0.3s ease;
	}

	@keyframes rotate-logo {
		from {
			transform: rotate(0deg);
		}
		to {
			transform: rotate(360deg);
		}
	}

	@keyframes core-pulse-color {
		0%,
		49% {
			fill: var(--logo-core-color-a);
		}
		50%,
		99% {
			fill: var(--logo-core-color-b);
		}
		100% {
			fill: var(--logo-core-color-a);
		}
	}

	@keyframes pulse-logo-text {
		0% {
			text-shadow: 0 0 5px var(--color-primary);
		}
		50% {
					text-shadow: 0 0 20px var(--color-primary-light);
		}
		100% {
			text-shadow: 0 0 5px var(--color-primary);
		}
	}

	:global(body.debug-mode) .logo {
		--logo-major-ray-color: var(--color-core-red);
	}

	/* --- Navigation Styles --- */
	.main-nav ul {
		list-style: none;
		display: flex;
	}
	.main-nav li {
		margin-left: 1.5rem;
	}
	.main-nav a {
		font-family: 'Space Mono', monospace;
		color: var(--color-text-dim);
		position: relative;
		padding: 5px 10px;
		transition: all 0.3s ease;
	}

	/* Bracket animation for HOVER on INACTIVE links */
	.main-nav a:not(.active):hover {
		color: var(--color-text-light);
	}
	.main-nav a:not(.active)::before,
	.main-nav a:not(.active)::after {
		content: '[';
		position: absolute;
		top: 50%;
		font-weight: bold;
		color: var(--color-secondary);
		opacity: 0;
		transform: translateY(-50%) scale(0.5);
		transition:
			opacity 0.3s ease,
			transform 0.3s ease;
	}
	.main-nav a:not(.active)::before {
		content: '[';
		left: -5px;
	}
	.main-nav a:not(.active)::after {
		content: ']';
		right: -5px;
	}
	.main-nav a:not(.active):hover::before,
	.main-nav a:not(.active):hover::after {
		opacity: 1;
		transform: translateY(-50%) scale(1);
	}

	/* "Target Lock" corners for the ACTIVE link */
	.main-nav a.active {
		color: var(--color-text-light);
		text-shadow: 0 0 8px var(--color-secondary);
	}
	.main-nav a.active::before,
	.main-nav a.active::after {
		content: '';
		position: absolute;
		width: 8px;
		height: 8px;
		opacity: 1;
		transition: all 0.3s ease;
	}
	.main-nav a.active::before {
		top: 2px;
		left: 3px;
		border-top: 2px solid var(--color-secondary);
		border-left: 2px solid var(--color-secondary);
	}
	.main-nav a.active::after {
		bottom: 2px;
		right: 3px;
		border-bottom: 2px solid var(--color-secondary);
		border-right: 2px solid var(--color-secondary);
	}

	/* --- Hamburger Button Styles --- */
	.hamburger-button {
		display: none;
		flex-direction: column;
		justify-content: space-between;
		width: 30px;
		height: 24px;
		background: transparent;
		border: none;
		cursor: pointer;
		padding: 0;
		z-index: 1001;
	}
	.hamburger-bar {
		width: 100%;
		height: 3px;
		background-color: var(--color-text-dim);
		border-radius: 2px;
		transition: all 0.3s ease;
		transform-origin: center;
	}
	.hamburger-button.is-open .hamburger-bar:nth-child(1) {
		transform: translateY(10.5px) rotate(45deg);
	}
	.hamburger-button.is-open .hamburger-bar:nth-child(2) {
		opacity: 0;
	}
	.hamburger-button.is-open .hamburger-bar:nth-child(3) {
		transform: translateY(-10.5px) rotate(-45deg);
	}

	/* --- Responsive header adjustments --- */
	@media (min-width: 992px) {
		.logo-tagline {
			display: inline;
		}
	}
	@media (max-width: 992px) {
		.main-nav li {
			/* MODIFICATION: Scaled down spacing */
			margin-left: 0.8rem;
		}
	}
	@media (max-width: 768px) {
		.main-header {
			padding: 1rem 0;
		}
		.main-header .container {
			flex-direction: row;
			justify-content: space-between;
			gap: 0.75rem;
		}
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
