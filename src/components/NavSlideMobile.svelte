<script>
	import levenshtein from "damerau-levenshtein";
	import { gsap } from "gsap";
	import { onMount } from "svelte";

	export let sections;
	export let parent;

	let container;
	let selection;

	$: active = 0;

	onMount(() => {
		hashchange();
		const node = document.querySelector(parent);
		node?.addEventListener("scroll", () => {
			const top = document
				.querySelector("header")
				.getBoundingClientRect().top;
			if (top !== 0) window.scrollTo(0, 0);
			const { y, height } = node.getBoundingClientRect();
			const first = document.querySelector(`#${sections[0].id}`);
			const t = (y - first?.getBoundingClientRect().y) / height;
			selection.style.top = `${
				(t *
					Number.parseFloat(
						getComputedStyle(container).getPropertyValue("height"),
					)) /
				sections.length
			}px`;
			if (Math.round(t) === t) {
				history.pushState(null, "", `#${sections[t].id}`);
			}
			active = Math.round(t);
		});
	});

	function hashchange() {
		let found = [-1, "", false];
		const hash = location.hash.slice(1);
		if (!hash) {
			found = [0, "#home", true];
		} else {
			for (const [i, e] of sections.entries()) {
				const cmp = levenshtein(hash, e.id);
				if (cmp.similarity > 0.5) {
					found = [i, e.id, cmp.similarity === 1];
					break;
				}
			}
		}
		active = found[0];
		if (found[0] < 0) return;
		if (!found[2]) history.pushState(null, "", `#${found[1]}`);

		const node = document.querySelector(parent);
		const elem = document.getElementById(found[1]);
		if (elem) {
			const top = elem.getBoundingClientRect().top;
			node.scrollTo(0, top);
		}
	}
	function click(idx, id) {
		const node = document.querySelector(parent);
		const elem = document.getElementById(id);
		if (elem) {
			const top = elem.getBoundingClientRect().top;
			node.scrollTo({
				top: node.scrollTop + top,
				behavior: "smooth",
			});
		}
		if (active === idx) return;
		history.pushState(null, "", `#${id}`);
	}
</script>

<svelte:window on:hashchange={hashchange} on:load={hashchange} />

<div class="nav-slide" bind:this={container}>
	{#each sections.entries() as [idx, { id, name, active_color }]}
		<button
			type="button"
			class:active={idx == active}
			style="--active-color: {active_color};"
			on:click={() => click(idx, id)}>{name}</button
		>
	{/each}
	<span
		class="selection"
		style="height: calc(100% / {sections.length});"
		bind:this={selection}
	></span>
</div>

<style lang="scss">
	div {
		display: flex;
		flex-direction: column;
		justify-content: space-evenly;
		align-items: center;
		position: relative;
		> button {
			width: 100%;
			font-family: "Lexend Exa";
			text-transform: uppercase;
			transition: color 0.5s ease;
			font-size: larger;
			height: 50px;
		}
		> .active {
			color: var(--active-color);
		}
		> .selection {
			top: 0;
			position: absolute;
			height: 100%;
			width: 100%;
			z-index: -1;
			overflow: hidden;
			&:before {
				content: "";
				position: absolute;
				top: 50%;
				left: 50%;
				width: 150%;
				aspect-ratio: 2/1;
				transform: translate(-50%, -50%) rotate(-45deg);
				background-color: #fff3;
			}
		}
	}
</style>
