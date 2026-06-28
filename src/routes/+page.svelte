<script>
	import MentalCard from '$lib/components/MentalCard.svelte';
</script>

<div class="flex flex-col items-center justify-center min-h-screen gap-8 p-8">
	<h1 class="text-3xl font-extrabold text-white tracking-wide">Customizable Flip Cards</h1>
	<p class="text-slate-400 max-w-md text-center">
		Click the cards below to experience the 3D flip animation. The contents are fully custom HTML.
	</p>

	<div class="flex flex-wrap gap-8 justify-center mt-4">
		<!-- Card 1: MentalCard component (Solitude) -->
		<MentalCard
			title="Solitude"
			rating={9}
			path="erudition"
			description="Interdum et malesuada fames ac ante ipsum primis in faucibus. Aenean sit amet nisi tortor. Vivamus placerat felis nec ante pretium, sed vestibulum nunc laoreet. Curabitur at vestibulum nisi. Donec blandit urna non posuere mollis. Phasellus venenatis tempor felis ultricies aliquet. Nunc vehicula bibendum dui eu ultrices. Aenean tempor, felis."
		/>

		<!-- Card 2: MentalCard component (Burst) -->
		<MentalCard
			title="Burst"
			rating={8}
			path="elation"
			description="Aliquam sem eros, rutrum sed ipsum vel, feugiat fermentum dolor. Pellentesque at ornare libero. Sed convallis turpis vel aliquet vestibulum. Suspendisse quis condimentum nisi, id elementum massa. In nec accumsan erat. In eleifend fermentum bibendum. Suspendisse vitae placerat justo. Ut eget enim eu odio pharetra accumsan vel eget tellus. Nam."
		/>

		<!-- Card 3: MentalCard component (Suspend) -->
		<MentalCard
			title="Suspend"
			rating={7}
			path="nihility"
			description="Integer ut consequat mauris. Praesent eget tempor massa, sit amet molestie felis. Donec gravida arcu sit amet sollicitudin dignissim. Praesent pellentesque pellentesque arcu, eget venenatis nunc. Vivamus rutrum sed turpis et aliquet. Nullam ultrices justo et cursus tincidunt. Nunc porta dui id sapien maximus, a porttitor magna rhoncus. Morbi at."
		/>
	</div>
</div>
