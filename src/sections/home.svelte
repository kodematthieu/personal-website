<script lang="ts">
	import Typed from "typed.js";
	import { onMount } from "svelte";
	import { IconBrandGithubFilled, IconCode } from "@tabler/icons-svelte";
	import { useMediaQuery } from "svelte-breakpoints";

	let nameTextElem: HTMLElement;
	let nameTextStringsElem: HTMLDivElement;

	onMount(() => {
		const isMobile = window.matchMedia("(max-width: 600px)").matches;
		new Typed(nameTextElem, {
			stringsElement: nameTextStringsElem,
			smartBackspace: true,
			typeSpeed: 40,
			backSpeed: 20,
			backDelay: 3000,
			loop: true,
		});
	});
	function scroll() {
		const parent = document.querySelector("main");
		const next = document.getElementById("projects");
		parent?.scrollTo({
			top: next?.offsetTop,
			behavior: "smooth",
		});
	}
</script>

<section id="home">
	<div class="hide" bind:this={nameTextStringsElem}>
		<p>Karel Matthieu L. Logro</p>
		<p>
			KodeMat
			<em
				style="font-size: 16px;align-self: center;color: var(--accentColor);"
				>(/kOHdꞏmæt/)</em
			>
		</p>
	</div>
	<h1 class="name-text">
		Hi, I'm <span bind:this={nameTextElem}></span>
	</h1>
	<p>
		I'm an 18-year-old student passionate about <em>Programming</em>
	</p>
	<p>
		I discovered programming at the age of 11 and have been developing my
		skills ever since.
	</p>
	<p>
		Currently, I'm interested in systems programming with Rust and exploring
		new technologies.
	</p>
	<div class="spacer"></div>
	<div class="links">
		<a
			href="https://github.com/kodematthieu"
			class="styleless"
			target="_blank"><IconBrandGithubFilled /> <span>GitHub</span></a
		>
		<a
			href="https://github.com/kodematthieu/personal-website"
			class="styleless"
			target="_blank"><IconCode /><span>Source Code</span></a
		>
	</div>
	<button type="button" class="scroll" on:click={scroll}></button>
</section>

<style lang="scss">
	.hide {
		display: none;
	}
	section {
		padding: 40px;
		position: relative;
	}
	h1 {
		margin: 0 auto;
		font-family: "Lexend";
		font-size: 30px;
		height: 100px;
	}
	p {
		font-family: "Lexend";
		font-size: 18px;
		> em {
			font-weight: 500;
			font-style: normal;
			color: #e10600;
		}
		&:not(:nth-child(1)) {
			margin-top: 15px;
		}
	}
	.spacer {
		height: 25px;
	}
	.links {
		display: flex;
		flex-direction: row;
		align-items: center;
		> a {
			width: fit-content;
			display: flex;
			flex-direction: row;
			align-items: center;
			padding: 10px;
			border-radius: 5px;
			border: 1.5px solid var(--accentColor);
			transition: background 0.25s ease;
			padding: 10px 15px;
			cursor: pointer;
			> span {
				margin-left: 10px;
				font-size: 14px;
			}
			&:nth-child(2) {
				margin-left: 10px;
			}
			&:hover {
				background-color: var(--accentColor);
			}
		}
	}

	.scroll {
		width: 60px;
		height: 60px;
		border: 2px solid var(--accentColor);
		border-radius: 50%;
		position: absolute;
		bottom: 150px;
		animation: down 1.5s infinite;
		left: 50%;
		transform: translateX(-50%);
		animation: down 1.5s infinite;
		cursor: pointer;
		&::before {
			content: "";
			position: absolute;
			top: 15px;
			left: 18px;
			width: 18px;
			height: 18px;
			border-left: 2px solid var(--accentColor);
			border-bottom: 2px solid var(--accentColor);
			transform: rotate(-45deg);
		}
		@media (max-height: 800px) {
			bottom: 75px;
		}
		@media (max-height: 700px) {
			bottom: 50px;
		}
	}

	@keyframes down {
		0% {
			transform: translate(-50%, 0px);
		}
		20% {
			transform: translate(-50%, 15px);
		}
		40% {
			transform: translate(-50%, 0px);
		}
	}
</style>
