<script>
	import CardCarousel from '$lib/components/CardCarousel.svelte';
	import { mentalCards } from '$lib/data/mentalCards';
</script>

<div
	class="flex flex-col items-center justify-center min-h-screen gap-6 p-8 overflow-hidden w-full"
>
	<h1
		class="text-3xl font-extrabold text-white tracking-wide font-ethnocentric text-center drop-shadow-[0_0_15px_rgba(255,255,255,0.1)]"
	>
		Mental Deck
	</h1>
	<p class="text-slate-400 max-w-md text-center text-sm">
		An attunement index of cognitive alignments. Navigate with Arrow keys or clicks, click the
		center card to flip.
	</p>

	<div class="w-full flex justify-center mt-4">
		<CardCarousel cards={mentalCards} />
	</div>
</div>
