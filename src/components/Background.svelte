<script>
	import Hexagon from "@tabler/icons-svelte/IconHexagon.svelte";
	import { onMount } from "svelte";
	import Two from "two.js";
	import { Random, MersenneTwister19937 } from "random-js";

	let random;
	let parentStyle;
	let two;
	let elem;
	let accent;
	let tiles = [];

	onMount(() => {
		random = new Random(MersenneTwister19937.seed("125445887"));
		parentStyle = getComputedStyle(document.querySelector("main"));
		accent = parentStyle.getPropertyValue("--accentColor");
		two = new Two({
			autostart: true,
			domElement: elem,
		});
		draw();
	});
	function draw() {
		tiles.splice(0, tiles.length);
		two.width = Number.parseFloat(parentStyle.getPropertyValue("width"));
		two.height =
			Number.parseFloat(parentStyle.getPropertyValue("height")) * 3;

		const size = 50;
		const width = size * (Math.sqrt(3) / 2) * 2;
		const height = size * 2;
		const cols = two.width / width + 1;
		const rows = two.height / (height * 0.75) + 1;
		let offX = -width / 2;
		let offY = -height / 2;
		for (let j = 0; j < rows; j++) {
			for (let i = 0; i < cols; i++) {
				let x = i * width;
				const y = j * height * 0.75;
				const prob = (y / two.height) * 4.5;
				if (Math.round(random.real(0, prob)) === 0) continue;
				if (j % 2 === 0) {
					x += offX;
				}
				let tile = createTile(two, offX + x, offY + y, size);
				tile.fill = "#000";
				tile.opacity = 1;
				tile.noStroke();
				tile.on(
					"mouseenter",
					() => {
						console.log(i, j);
						tile.stroke = accent;
					},
					false,
				);
				tile.on(
					"mouseleave",
					() => {
						tile.noStroke();
					},
					false,
				);
				tiles.push(tile);
			}
		}
	}
	function createTile(two, x, y, size) {
		const tile = two.makePolygon(x, y, size, 6);
		tile.rotation = Math.PI / 6;
		return tile;
	}
</script>

<svelte:window on:resize={draw} />

<canvas bind:this={elem}></canvas>

<style>
	canvas {
		position: absolute;
		width: 100%;
		height: 300%;
		z-index: -1;
	}
</style>
