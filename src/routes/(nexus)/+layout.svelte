<!-- src/routes/(nexus)/+layout.svelte -->
<script lang="ts">
	import { onMount, type Snippet } from 'svelte';

	import MainHeader from '$lib/components/layout/MainHeader.svelte';
	import MainFooter from '$lib/components/layout/MainFooter.svelte';
	import HexagonBackground from '$lib/components/layout/HexagonBackground.svelte';
	import GridBackground from '$lib/components/layout/GridBackground.svelte';

	let { children } = $props<{ children: Snippet }>();

	// Smooth Scroll for Navigation (specific to this layout)
	onMount(() => {
		document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
			anchor.addEventListener('click', function (this: Element, e) {
				e.preventDefault();
				document.querySelector(this.getAttribute('href')!)?.scrollIntoView({
					behavior: 'smooth'
				});
			});
		});
	});
</script>

<!-- Background components are part of the nexus layout -->
<HexagonBackground seed={'SYSTEMATIC_SYNTHESIS_NEXUS'} />
<GridBackground />

<!-- Render the layout components -->
<MainHeader />

<!-- The main scrollable content area -->
<div class="site-content-wrapper">
	<main class="main-content-area">
		{@render children()}
	</main>
</div>

<MainFooter />

<style>
	.site-content-wrapper {
		position: relative;
		z-index: 1;
		min-height: 100vh;
		/* MODIFICATION: Make wrapper a flex container */
		display: flex;
		flex-direction: column;
	}
	.main-content-area {
		/* MODIFICATION: Allow main area to grow and fill space */
		flex: 1;
		display: flex;
		flex-direction: column;
	}
</style>
