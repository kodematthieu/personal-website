<script module lang="ts">
	import erudition from '$lib/assets/images/erudition.png';
	import elation from '$lib/assets/images/elation.png';
	import nihility from '$lib/assets/images/nihility.png';
	import enigmata from '$lib/assets/images/enigmata.png';

	export const PATH_DATA = {
		erudition: {
			src: erudition,
			alt: 'Erudition HSR',
		},
		elation: {
			src: elation,
			alt: 'Elation HSR',
		},
		nihility: {
			src: nihility,
			alt: 'Nihility HSR',
		},
		enigmata: {
			src: enigmata,
			alt: 'Enigmata HSR',
		},
	} as const;

	export type PathType = keyof typeof PATH_DATA;

	export interface Props {
		name: string;
		rating?: number;
		path: PathType;
		description?: string;
		children?: import('svelte').Snippet;
		footer?: import('svelte').Snippet;
	}
</script>

<script lang="ts">
	import FlipCard from './FlipCard.svelte';

	let { name, rating, path, description, children, footer }: Props = $props();

	const pathInfo = $derived(PATH_DATA[path]);
</script>

<FlipCard>
	<div class="flex flex-col justify-between h-full p-3 text-slate-200 w-full">
		<!-- Header Block -->
		<div class="flex justify-between items-center w-full gap-2">
			<div class="text-left flex-1">
				<h3 class="text-sm font-ethnocentric text-white tracking-wider leading-none">{name}</h3>
				<!-- Rate Bar (1-10 scale mapped to 5 segments) -->
				{#if rating !== undefined}
					<div class="flex gap-1 mt-2.5">
						{#each Array(5) as _, i (i)}
							{@const segmentValue = i * 2 + 2}
							{#if rating >= segmentValue}
								<div
									class="w-5 h-1 bg-amber-400 -skew-x-20 shadow-[0_0_5px_rgba(251,191,36,0.5)]"
								></div>
							{:else if rating === segmentValue - 1}
								<div
									class="w-5 h-1 bg-linear-to-r from-amber-400 from-50% to-amber-400/15 to-50% -skew-x-20 shadow-[0_0_3px_rgba(251,191,36,0.3)]"
								></div>
							{:else}
								<div class="w-5 h-1 bg-amber-400/15 -skew-x-20"></div>
							{/if}
						{/each}
					</div>
				{/if}
			</div>
			<!-- Thumbnail -->
			<img
				src={pathInfo.src}
				alt={pathInfo.alt}
				class="w-10 h-10 object-contain filter drop-shadow-[0_0_8px_rgba(255,255,255,0.2)] select-none pointer-events-none"
				draggable="false"
			/>
		</div>

		<!-- Body Content -->
		{#if children}
			{@render children()}
		{:else if description}
			<p class="text-xs text-slate-300 leading-relaxed text-left mt-3 mb-auto">
				{description}
			</p>
		{/if}

		<!-- Footer -->
		{#if footer}
			{@render footer()}
		{/if}
	</div>
	{#snippet back()}
		<div class="flex items-center justify-center h-full w-full">
			<img
				src={pathInfo.src}
				alt="{pathInfo.alt} (Back)"
				class="size-28 object-contain filter drop-shadow-[0_0_15px_rgba(255,255,255,0.15)] select-none pointer-events-none"
				draggable="false"
			/>
		</div>
	{/snippet}
</FlipCard>
