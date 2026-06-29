<script>
	import MentalCard from '$lib/components/MentalCard.svelte';
	import { mentalCards } from '$lib/data/mentalCards';
</script>

<div class="flex flex-col items-center justify-center min-h-screen gap-8 p-8">
	<h1 class="text-3xl font-extrabold text-white tracking-wide">Customizable Flip Cards</h1>
	<p class="text-slate-400 max-w-md text-center">
		Click the cards below to experience the 3D flip animation. The contents are fully custom HTML.
	</p>

	<div class="flex flex-wrap gap-8 justify-center mt-4">
		{#each mentalCards as card (card.name)}
			<MentalCard
				name={card.name}
				rating={card.rating}
				path={card.path}
				description={card.description}
			/>
		{/each}
	</div>
</div>
