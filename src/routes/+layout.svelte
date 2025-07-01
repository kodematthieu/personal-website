<!-- src/routes/+layout.svelte -->
<script lang="ts">
	import { i18n } from '$lib/i18n';
	import { ParaglideJS } from '@inlang/paraglide-sveltekit';
	import '../app.css'; // Imports truly global styles and theme variables
	import { onMount } from 'svelte';

	let { children } = $props();

	// Global client-side logic remains here
	onMount(() => {
		let tapCount = 0;
		let lastTapTime = 0;
		const TAP_THRESHOLD_MS = 300; // Time in ms between taps to be considered consecutive

		const handleTap = () => {
			const currentTime = Date.now();
			if (currentTime - lastTapTime < TAP_THRESHOLD_MS) {
				tapCount++;
			} else {
				tapCount = 1; // Reset count if taps are too far apart
			}
			lastTapTime = currentTime;

			if (tapCount >= 5) {
				document.body.classList.toggle('debug-mode');
				const isDebugMode = document.body.classList.contains('debug-mode');
				if (isDebugMode) {
					console.log(
						'%c:: DEBUG MODE ACTIVATED (5-TAP EASTER EGG) ::',
						'color: #ff0033; font-weight: bold; text-shadow: 0 0 5px #ff0033;'
					);
				} else {
					console.log('%c:: DEBUG MODE DEACTIVATED ::', 'color: #9d00ff; font-weight: bold;');
				}
				tapCount = 0; // Reset count after activation/deactivation
			}
		};

		document.body.addEventListener('click', handleTap);
		document.body.addEventListener('touchstart', handleTap, { passive: true });

		return () => {
			document.body.removeEventListener('click', handleTap);
			document.body.removeEventListener('touchstart', handleTap);
		};
	});
</script>

<ParaglideJS {i18n}>
	{@render children()}
</ParaglideJS>
