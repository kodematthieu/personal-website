// src/lib/theme.ts
import { browser } from '$app/environment';

export function toggleTheme() {
	if (!browser) return;

	const body = document.body;
	const isDebug = body.classList.contains('debug-mode');

	// Invalidate the seed
	console.log('[theme.ts] Removing hexagon seed...');
	sessionStorage.removeItem('hexagonBackgroundSeed_v2');

	// Toggle the class
	body.classList.toggle('debug-mode', !isDebug);

	// Log the state change
	if (!isDebug) {
		console.log(
			'%c:: FLOW STATE ENGAGED ::',
			'color: #ff0033; font-weight: bold; text-shadow: 0 0 5px #ff0033;'
		);
	} else {
		console.log('%c:: ANALYSIS MODE RESUMED ::', 'color: #9d00ff; font-weight: bold;');
	}

	// Dispatch a custom event to notify components of the theme change
	body.dispatchEvent(new CustomEvent('themeChanged'));
}
