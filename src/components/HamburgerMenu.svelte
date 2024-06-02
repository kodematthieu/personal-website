<script lang="ts">
	import { gsap } from "gsap";

	export let sidebar: string;
	let isOpen = false;

	const attr0From = { x1: 25, y1: 35, x2: 275, y2: 35 };
	const attr0Into = { x2: 150, y2: 50, x1: 42, y1: 237 };
	const attr1From = { x1: 25, y1: 150, x2: 275, y2: 150 };
	const attr2Into = { x1: 42, y1: 237, x2: 258, y2: 238 };
	const attr2From = { x1: 25, y1: 265, x2: 275, y2: 265 };
	const attr1Into = { x2: 258, y2: 238, x1: 150, y1: 50 };
	const duration = 0.25;

	function toggle() {
		const elem = document.querySelector(sidebar);
		const tl = gsap.timeline({
			yoyo: true,
			defaults: {
				duration,
				ease: "linear",
				delay: 0,
			},
		});
		if (isOpen) {
			gsap.fromTo(
				"line:nth-child(1)",
				{ attr: attr0Into },
				{ attr: attr0From, duration },
			).play();
			gsap.fromTo(
				"line:nth-child(2)",
				{ attr: attr1Into },
				{ attr: attr1From, duration },
			).play();
			gsap.fromTo(
				"line:nth-child(3)",
				{ attr: attr2Into },
				{ attr: attr2From, duration },
			).play();
			elem?.classList.remove("active");
		} else {
			gsap.fromTo(
				"line:nth-child(1)",
				{ attr: attr0From },
				{ attr: attr0Into, duration },
			).play();
			gsap.fromTo(
				"line:nth-child(2)",
				{ attr: attr1From },
				{ attr: attr1Into, duration },
			).play();
			gsap.fromTo(
				"line:nth-child(3)",
				{ attr: attr2From },
				{ attr: attr2Into, duration },
			).play();
			elem?.classList.add("active");
		}
		isOpen = !isOpen;
		tl.reverse();
		tl.play();
	}

	$: isOpen;
</script>

<button type="button" on:click={toggle} class:isOpen>
	<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 300 300">
		<line x1="25" y1="35" x2="275" y2="35" />
		<line x1="25" y1="150" x2="275" y2="150" />
		<line x1="25" y1="265" x2="275" y2="265" />
	</svg>
</button>

<style lang="scss">
	button {
		background: none;
		border: none;
		padding: 0;
		outline: inherit;
		aspect-ratio: 1/1;
		height: 25px;
		cursor: pointer;
	}
	line {
		stroke: white;
		stroke-width: 50px;
		stroke-linecap: round;
		stroke-linejoin: round;
	}

	@media (min-width: 600px) {
		button {
			display: none;
		}
	}
</style>
