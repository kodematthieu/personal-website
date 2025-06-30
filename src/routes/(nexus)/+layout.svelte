<!-- src/routes/(nexus)/+layout.svelte -->
<script lang="ts">
	import { onMount, type Snippet, onDestroy } from 'svelte';

	import MainHeader from '$lib/components/layout/MainHeader.svelte';
	import MainFooter from '$lib/components/layout/MainFooter.svelte';
	import HexagonBackground from '$lib/components/layout/HexagonBackground.svelte';
	import GridBackground from '$lib/components/layout/GridBackground.svelte';
	import Sidebar from '$lib/components/layout/Sidebar.svelte';

	let { children } = $props<{ children: Snippet }>();

	let isSidebarOpen = $state(false);
	let activeSectionId = $state('nexus'); // Default to the top section

	let observer: IntersectionObserver;

	function toggleSidebar() {
		isSidebarOpen = !isSidebarOpen;
	}

	onMount(() => {
		// Smooth scroll for anchor links
		document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
			anchor.addEventListener('click', function (this: Element, e) {
				e.preventDefault();
				const targetEl = document.querySelector(this.getAttribute('href')!);
				if (targetEl) {
					targetEl.scrollIntoView({
						behavior: 'smooth'
					});
				}
			});
		});

		// Intersection Observer for active section highlighting
		const sections = document.querySelectorAll('section[id]');
		const observerOptions = {
			root: null, // observes intersections relative to the viewport
			rootMargin: '-50% 0px -50% 0px', // Triggers when the section is in the vertical center
			threshold: 0 // Triggers as soon as any part of the target is visible within the rootMargin
		};

		observer = new IntersectionObserver((entries) => {
			entries.forEach((entry) => {
				if (entry.isIntersecting) {
					activeSectionId = entry.target.id;
				}
			});
		}, observerOptions);

		sections.forEach((section) => {
			observer.observe(section);
		});
	});

	onDestroy(() => {
		if (observer) {
			observer.disconnect();
		}
	});
</script>

// /src/routes/(nexus)/+layout.svelte // /src/routes/(nexus)/+layout.svelte
<HexagonBackground seed={'SYSTEMATIC_SYNTHESIS_NEXUS'} />
<GridBackground />

<!-- MODIFICATION: Pass state, toggle function, and activeSectionId to the header -->
<MainHeader onToggle={toggleSidebar} {isSidebarOpen} {activeSectionId} />

<Sidebar isOpen={isSidebarOpen} onClose={toggleSidebar} {activeSectionId} />

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
		display: flex;
		flex-direction: column;
	}
	.main-content-area {
		flex: 1;
		display: flex;
		flex-direction: column;
	}
</style>
