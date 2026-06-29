import type { Props as MentalCardProps } from '$lib/components/MentalCard.svelte';

export const mentalCards: MentalCardProps[] = [
	{
		name: 'Solitude',
		rating: 9,
		path: 'erudition',
		description:
			'The withdrawal into singular focus. Noise collapses, distractions dissolve, and what remains is the raw signal — a mind turned inward with surgical precision. This is where deep comprehension lives: long uninterrupted arcs of thought, pattern recognition across dense material, and the quiet certainty that comes from sitting with a problem until it yields.',
	},
	{
		name: 'Burst',
		rating: 8,
		path: 'elation',
		description:
			'Spontaneous ignition. A surge of momentum that bypasses deliberation entirely — action before the inner critic can intervene. Burst is what ships things at 3 AM, rewrites a system in a weekend, and thrives on the electric feedback loop of doing. It burns bright and fast, converting raw impulse into tangible output before the window closes.',
	},
	{
		name: 'Suspend',
		rating: 7,
		path: 'nihility',
		description:
			'The deliberate refusal to act. Not paralysis — negation as strategy. Suspend recognizes that some problems dissolve on their own, that premature commitment is its own failure mode, and that the void between decisions is where options stay open. It conserves cognitive resources by letting the unworthy tasks starve, clearing the field for what actually matters.',
	},
	{
		name: 'Overclock',
		rating: 10,
		path: 'enigmata',
		description:
			"The mind that refuses to stop decomposing. Every problem forks into sub-problems, every answer spawns three new questions, and the analysis keeps recursing past diminishing returns. Overclock finds the hidden variable everyone else missed — but also twelve hypothetical variables that don't exist. Maximum resolution, minimum mercy on the thinker.",
	},
];
