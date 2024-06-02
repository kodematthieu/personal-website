<script>
	import NavSlideMobile from "./NavSlideMobile.svelte";

	export let sections;
</script>

<div class="side-nav" class:active={false}>
	<NavSlideMobile {sections} parent="main" />
</div>

<style lang="scss">
	.side-nav {
		right: calc(-80% - 1px);
		width: 80%;
		z-index: 2;
		backdrop-filter: blur(5px);
		position: absolute;
		top: 40px;
		height: calc(100% - 50px);
		padding: 15px;
		border-left: 1px solid #fff;
		transition: right 0.25s ease;
		&.active {
			right: 0;
		}
		@media (min-width: 600px) {
			display: none;
		}
	}
</style>
