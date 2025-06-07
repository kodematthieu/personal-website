<!-- src/routes/+layout.svelte -->
<script lang="ts">
	import { i18n } from '$lib/i18n';
	import { ParaglideJS } from '@inlang/paraglide-sveltekit';
	import '../app.css'; // Imports truly global styles and theme variables
	import { onMount } from 'svelte';

	let { children } = $props();

	// Global client-side logic remains here
	onMount(() => {
		// "State Shift" Easter Egg (Ctrl + Shift + D)
		let flowStateActive = false;
		const keyListener = (e: KeyboardEvent) => {
			if (e.ctrlKey && e.shiftKey && e.key === 'D') {
				flowStateActive = !flowStateActive;
				document.body.classList.toggle('debug-mode', flowStateActive);
				if (flowStateActive) {
					console.log(
						'%c:: FLOW STATE ENGAGED ::',
						'color: #ff0033; font-weight: bold; text-shadow: 0 0 5px #ff0033;'
					);
				} else {
					console.log('%c:: ANALYSIS MODE RESUMED ::', 'color: #9d00ff; font-weight: bold;');
				}
			}
		};
		document.addEventListener('keydown', keyListener);

		return () => {
			document.removeEventListener('keydown', keyListener);
		};
	});
</script>

<ParaglideJS {i18n}>
	{@render children()}
</ParaglideJS>
