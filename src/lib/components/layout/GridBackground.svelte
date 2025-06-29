<script lang="ts">
</script>

<div class="grid-background-wrapper"></div>

<style lang="scss">
	.grid-background-wrapper {
		position: fixed;
		top: 0;
		left: 0;
		width: 100vw;
		min-height: 100dvh; /* Use dvh for dynamic viewport height */
		height: 100%;
		z-index: -1; /* Placed below HexagonBackground (which is -1) */
		pointer-events: none; /* Crucial: allows clicks to pass through */
		overflow: hidden; /* Contains animations without creating scrollbars */
		background: radial-gradient(
			circle at center,
			rgba(var(--color-deep-indigo-primary-rgb), 0.1) 0%,
			rgba(15, 15, 26, 0.7) 70%
		); /* Radial gradient now lives here */
	}

	/* Background Grid Animation */
	.grid-background-wrapper::before,
	.grid-background-wrapper::after {
		content: '';
		position: absolute;
		top: 0;
		left: 0;
		width: 100%;
		height: 100%;
		background-repeat: repeat;
		opacity: 0.1;
		z-index: 1; /* z-index relative to the wrapper */
	}

	.grid-background-wrapper::before {
		background-image: linear-gradient(
				to right,
				transparent 1px,
				var(--color-primary) 1px,
				var(--color-primary) 2px,
				transparent 2px
			),
			linear-gradient(
				to bottom,
				transparent 1px,
				var(--color-primary) 1px,
				var(--color-primary) 2px,
				transparent 2px
			);
		background-size: 50px 50px;
		animation: grid-shift 120s linear infinite;
	}

	.grid-background-wrapper::after {
		background-image: linear-gradient(
				to right,
				transparent 1px,
				var(--color-secondary) 1px,
				var(--color-secondary) 2px,
				transparent 2px
			),
			linear-gradient(
				to bottom,
				transparent 1px,
				var(--color-secondary) 1px,
				var(--color-secondary) 2px,
				transparent 2px
			);
		background-size: 100px 100px;
		animation: grid-shift 180s reverse linear infinite;
	}

	@keyframes grid-shift {
		from {
			background-position: 0 0;
		}
		to {
			background-position: 100% 100%;
		}
	}
</style>
