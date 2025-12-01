<!-- src/routes/+layout.svelte -->
<script lang="ts">
	import '../app.css'; // Imports truly global styles and theme variables
	import { onMount } from 'svelte';

	let { children } = $props();

	// Global client-side logic remains here
	onMount(() => {
		let tapCount = 0;
		let lastTapTime = 0;
		const TAP_THRESHOLD_MS = 150; // Time in ms between taps to be considered consecutive
		let isToggleOnCooldown = false; // New cooldown flag
		const COOLDOWN_DURATION_MS = 500; // Cooldown period after a toggle

		const handleTap = () => {
			if (isToggleOnCooldown) {
				return; // Ignore taps during cooldown
			}

			const currentTime = Date.now();
			if (currentTime - lastTapTime < TAP_THRESHOLD_MS) {
				tapCount++;
			} else {
				tapCount = 1; // Reset count if taps are too far apart
			}
			lastTapTime = currentTime;

			if (tapCount >= 3) {
				document.body.classList.toggle('debug-mode');
				document.body.dispatchEvent(new CustomEvent('themeChanged'));
				const isDebugMode = document.body.classList.contains('debug-mode');
				if (isDebugMode) {
					console.log(
						'%c:: DEBUG MODE ACTIVATED (3-TAP EASTER EGG) ::',
						'color: #ff0033; font-weight: bold; text-shadow: 0 0 5px #ff0033;',
					);
				} else {
					console.log('%c:: DEBUG MODE DEACTIVATED ::', 'color: #9d00ff; font-weight: bold;');
				}
				tapCount = 0; // Reset count after activation/deactivation

				isToggleOnCooldown = true; // Activate cooldown
				setTimeout(() => {
					isToggleOnCooldown = false;
				}, COOLDOWN_DURATION_MS);
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

<div class="app-container">
	{@render children()}
</div>

<style>
	.app-container {
		display: flex;
		flex-direction: column;
		min-height: 100vh;
	}
</style>
