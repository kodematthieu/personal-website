<!-- src/routes/(nexus)/+layout.svelte -->
<script lang="ts">
	import { onMount, type Snippet } from 'svelte';

	import MainHeader from '$lib/components/layout/MainHeader.svelte';
	import MainFooter from '$lib/components/layout/MainFooter.svelte';
	import HexagonBackground from '$lib/components/layout/HexagonBackground.svelte';
	import GridBackground from '$lib/components/layout/GridBackground.svelte';
	import Sidebar from '$lib/components/layout/Sidebar.svelte';

	let { children } = $props<{ children: Snippet }>();

	let isSidebarOpen = $state(false);

	function toggleSidebar() {
		isSidebarOpen = !isSidebarOpen;
	}

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

// /src/routes/(nexus)/+layout.svelte
<HexagonBackground seed={'SYSTEMATIC_SYNTHESIS_NEXUS'} />
<GridBackground />

<!-- MODIFICATION: Pass state and toggle function to the header -->
<MainHeader onToggle={toggleSidebar} {isSidebarOpen} />

<Sidebar isOpen={isSidebarOpen} onClose={toggleSidebar} />

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
