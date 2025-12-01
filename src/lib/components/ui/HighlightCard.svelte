<script lang="ts">
	import Icon from '@iconify/svelte';
	import type { HighlightCardProps } from './HighlightCard.types';
	import DOMPurify from 'isomorphic-dompurify';

	let {
		// Implicit content props
		title,
		details,
		icon,

		// Link-related props
		href,
		target = '_self',
		rel,

		// Hover Effect Props
		hoverEffect = 'none',
		hoverLiftAmount = '-4px',
		hoverGlowSpread = '15px',
		hoverEffectDuration = '0.2s',

		// General Style Props
		background,
		borderColor,
		borderWidth = '2px',
		borderRadius = '10px',
		cardPadding = '1.75rem',
		boxShadow = 'none',
		borderStyle = 'solid',
		contentAlignment = 'start', // 'start' or 'center' for items in the card column

		// Structured content related props
		textAlign = 'left', // 'left', 'center', 'right', 'justify' for text within content blocks
		titleColor,
		detailsColor,
		iconPlacement = 'top',
		iconSize = '1.75rem',
		iconWrapperPadding = '0.75rem',
		iconWrapperShape = 'circle',
		iconColor,
		iconBackgroundColor,

		// Typography props
		titleFontSize,
		titleFontWeight,
		detailsFontSize,
		detailsLineHeight,
		detailsMaxWidth, // Max width for the content block (icon-title-row, details-block etc.)
		gapBetweenTitleAndDetails = '0.5rem',

		// Consolidated Icon spacing
		iconSpacing = '1rem', // Space between icon and title (if side) or icon and text block (if top)

		// Explicit Named Slots
		rawHeader,
		header,
		footer,
		children,
	}: HighlightCardProps = $props();

	const isStructuredContent = $derived(title !== undefined && details !== undefined);
	const actualRel = $derived(href && target === '_blank' && !rel ? 'noopener noreferrer' : rel);

	// --- DYNAMIC SANITIZATION ---
	const sanitizedDetails = $derived(details ? DOMPurify.sanitize(details) : '');

	// --- Dynamic Style Computations using $derived ---

	const wrapperStyle = $derived(`
        --card-border-width: ${borderWidth};
        --card-actual-border-color: ${borderColor || 'var(--color-outline)'};
        --card-actual-border-radius: ${borderRadius};
        --box-shadow: ${boxShadow};
        --border-style: ${borderStyle};
        --hover-effect-duration: ${hoverEffectDuration};
        --hover-lift-amount: ${hoverLiftAmount};
        --hover-glow-spread: ${hoverGlowSpread};
        ${href ? 'cursor: pointer;' : ''}
    `);

	// Style for the main .highlight-card div
	const cardFlexLayoutStyle = $derived(`
        background: ${background || 'var(--color-surface)'};
        border-radius: ${borderRadius};
        padding: ${cardPadding};
        display: flex;
        flex-direction: column; /* Card content (header, main content, footer) is always stacked vertically */
        align-items: ${contentAlignment === 'center' ? 'center' : 'flex-start'}; /* Aligns children (content blocks) horizontally */
		gap: 0.75rem; /* A small default gap between header/content/footer blocks; can be refined */
    `);

	// Style for the icon's direct wrapper
	const iconWrapperStyle = $derived(`
        background-color: ${iconBackgroundColor || 'var(--color-primary-container)'};
        padding: ${iconWrapperPadding};
        border-radius: ${iconWrapperShape === 'circle' ? '50%' : iconWrapperShape === 'square' ? '0' : '0.5rem'};
        flex-shrink: 0; /* Prevent icon from shrinking if in a flex row */
		display: inline-flex; /* Ensures wrapper fits icon content */
		align-items: center;
		justify-content: center;
    `);

	const iconElementStyle = $derived(`
        color: ${iconColor || 'var(--color-on-primary-container)'};
        width: ${iconSize};
        height: ${iconSize};
    `);

	// Container for stacked title and details (when icon is 'top' or no icon)
	const textContentStackedStyle = $derived(`
		width: 100%; /* Takes full width of its alignment container */
		max-width: ${detailsMaxWidth || '100%'}; /* Constrains this block if contentAlignment is center */
		text-align: ${textAlign}; /* Text alignment within this block */
	`);

	const titleStyleStandard = $derived(`
		color: ${titleColor || 'var(--color-on-surface)'};
		font-size: ${titleFontSize || '1.05rem'};
		font-weight: ${titleFontWeight || '500'};
		margin-bottom: ${title && details ? gapBetweenTitleAndDetails : '0'}; /* Only add margin if details follow */
	`);

	const detailsStyleStandard = $derived(`
		color: ${detailsColor || 'var(--color-on-surface-variant)'};
		font-size: ${detailsFontSize || '0.85rem'};
		line-height: ${detailsLineHeight || '1.6'};
	`);

	// Container for icon and title when icon is 'left' or 'right'
	const iconTitleRowFlexStyle = $derived(`
		display: flex;
		flex-direction: ${iconPlacement === 'right' ? 'row-reverse' : 'row'};
		gap: ${iconSpacing};
		align-items: center;
		width: 100%;
		max-width: ${detailsMaxWidth || '100%'};
	`);

	// Wrapper for the title text when icon is 'left' or 'right'
	const titleInRowWrapperStyle = $derived(`
		flex-grow: 1; /* Allows title to take remaining space beside icon */
		text-align: ${textAlign}; /* Aligns the title text itself within this wrapper */
	`);

	const titleStyleForIconRow = $derived(`
		color: ${titleColor || 'var(--color-on-surface)'};
		font-size: ${titleFontSize || '1.05rem'};
		font-weight: ${titleFontWeight || '500'};
		/* margin-bottom is handled by details-block's margin-top or overall card gap */
	`);

	// Container for the details block when icon is 'left' or 'right'
	const detailsBlockStyle = $derived(`
		width: 100%;
		max-width: ${detailsMaxWidth || '100%'}; /* Constrains this block */
		text-align: ${textAlign}; /* Text alignment for details */
		margin-top: ${title && details ? gapBetweenTitleAndDetails : '0'}; /* Space above details if title (and thus icon-title-row) exists */
	`);

	const detailsStyleForIconRow = $derived(`
		color: ${detailsColor || 'var(--color-on-surface-variant)'};
		font-size: ${detailsFontSize || '0.85rem'};
		line-height: ${detailsLineHeight || '1.6'};
	`);

	function handleCardAction(event: KeyboardEvent | MouseEvent) {
		if (
			href &&
			(event.type === 'click' ||
				(event instanceof KeyboardEvent && (event.key === 'Enter' || event.key === ' ')))
		) {
			window.open(href, target, actualRel);
		}
	}
</script>

<div class="highlight-card-outer-wrapper">
	{#if rawHeader}{@render rawHeader()}{/if}

	{#if href}
		<a
			class="highlight-card-wrapper {hoverEffect !== 'none' ? 'hover-effect-' + hoverEffect : ''}"
			style={wrapperStyle}
			{href}
			{target}
			rel={actualRel}
		>
			<div class="highlight-card" style={cardFlexLayoutStyle}>
				{#if isStructuredContent}
					{#if header}{@render header()}{/if}

					{#if icon}
						{#if iconPlacement === 'top'}
							<!-- Icon Top Layout -->
							<div
								class="icon-wrapper-top"
								style={`${iconWrapperStyle} margin-bottom: ${iconSpacing};`}
							>
								<Icon
									{icon}
									class="highlight-icon"
									aria-hidden="true"
									focusable="false"
									style={iconElementStyle}
								/>
							</div>
							<div class="text-content-stacked" style={textContentStackedStyle}>
								{#if title}<h3 class="highlight-title" style={titleStyleStandard}>{title}</h3>{/if}
								{#if details}<p class="highlight-description" style={detailsStyleStandard}>
										<!-- eslint-disable-next-line svelte/no-at-html-tags -->
										{@html sanitizedDetails}
									</p>{/if}
							</div>
						{:else}
							<!-- iconPlacement is 'left' or 'right' -->
							<!-- Icon Side Layout -->
							<div class="icon-title-row" style={iconTitleRowFlexStyle}>
								<div class="icon-wrapper-side" style={iconWrapperStyle}>
									<Icon
										{icon}
										class="highlight-icon"
										aria-hidden="true"
										focusable="false"
										style={iconElementStyle}
									/>
								</div>
								{#if title}
									<div class="title-in-row-wrapper" style={titleInRowWrapperStyle}>
										<h3 class="highlight-title" style={titleStyleForIconRow}>{title}</h3>
									</div>
								{/if}
							</div>
							{#if details}
								<div class="details-block" style={detailsBlockStyle}>
									<p class="highlight-description" style={detailsStyleForIconRow}>
										<!-- eslint-disable-next-line svelte/no-at-html-tags -->
										{@html sanitizedDetails}
									</p>
								</div>
							{/if}
						{/if}
					{:else}
						<!-- No icon -->
						<div class="text-content-stacked" style={textContentStackedStyle}>
							{#if title}<h3 class="highlight-title" style={titleStyleStandard}>{title}</h3>{/if}
							{#if details}<p class="highlight-description" style={detailsStyleStandard}>
									<!-- eslint-disable-next-line svelte/no-at-html-tags -->
									{@html sanitizedDetails}
								</p>{/if}
						</div>
					{/if}

					{#if footer}{@render footer()}{/if}
				{:else if children}
					{@render children()}
				{/if}
			</div>
		</a>
	{:else}
		<!-- Non-link version -->
		<div
			class="highlight-card-wrapper {hoverEffect !== 'none' ? 'hover-effect-' + hoverEffect : ''}"
			style={wrapperStyle}
			role="button"
			tabindex="0"
			onclick={handleCardAction}
			onkeydown={handleCardAction}
		>
			<div class="highlight-card" style={cardFlexLayoutStyle}>
				{#if isStructuredContent}
					{#if header}{@render header()}{/if}

					{#if icon}
						{#if iconPlacement === 'top'}
							<!-- Icon Top Layout -->
							<div
								class="icon-wrapper-top"
								style={`${iconWrapperStyle} margin-bottom: ${iconSpacing};`}
							>
								<Icon
									{icon}
									class="highlight-icon"
									aria-hidden="true"
									focusable="false"
									style={iconElementStyle}
								/>
							</div>
							<div class="text-content-stacked" style={textContentStackedStyle}>
								{#if title}<h3 class="highlight-title" style={titleStyleStandard}>{title}</h3>{/if}
								{#if details}<p class="highlight-description" style={detailsStyleStandard}>
										<!-- eslint-disable-next-line svelte/no-at-html-tags -->
										{@html sanitizedDetails}
									</p>{/if}
							</div>
						{:else}
							<!-- iconPlacement is 'left' or 'right' -->
							<!-- Icon Side Layout -->
							<div class="icon-title-row" style={iconTitleRowFlexStyle}>
								<div class="icon-wrapper-side" style={iconWrapperStyle}>
									<Icon
										{icon}
										class="highlight-icon"
										aria-hidden="true"
										focusable="false"
										style={iconElementStyle}
									/>
								</div>
								{#if title}
									<div class="title-in-row-wrapper" style={titleInRowWrapperStyle}>
										<h3 class="highlight-title" style={titleStyleForIconRow}>{title}</h3>
									</div>
								{/if}
							</div>
							{#if details}
								<div class="details-block" style={detailsBlockStyle}>
									<p class="highlight-description" style={detailsStyleForIconRow}>
										<!-- eslint-disable-next-line svelte/no-at-html-tags -->
										{@html sanitizedDetails}
									</p>
								</div>
							{/if}
						{/if}
					{:else}
						<!-- No icon -->
						<div class="text-content-stacked" style={textContentStackedStyle}>
							{#if title}<h3 class="highlight-title" style={titleStyleStandard}>{title}</h3>{/if}
							{#if details}<p class="highlight-description" style={detailsStyleStandard}>
									<!-- eslint-disable-next-line svelte/no-at-html-tags -->
									{@html sanitizedDetails}
								</p>{/if}
						</div>
					{/if}

					{#if footer}{@render footer()}{/if}
				{:else if children}
					{@render children()}
				{/if}
			</div>
		</div>
	{/if}
</div>

<style>
	.highlight-card-outer-wrapper {
		position: relative;
	}
	.highlight-card-wrapper {
		position: relative;
		padding: var(--card-border-width);
		box-sizing: border-box;
		display: flex; /* Ensures .highlight-card inside takes up space correctly for border effects */
		border-radius: var(--card-actual-border-radius);
		transition:
			transform var(--hover-effect-duration, 0.2s) ease-out,
			box-shadow var(--hover-effect-duration, 0.2s) ease-out;
		box-shadow: var(--box-shadow, none);
		border-style: var(--border-style, solid);
		width: 100%; /* Ensure wrapper takes full width of its container */
	}

	.highlight-card-wrapper::before {
		content: '';
		position: absolute;
		top: 0;
		left: 0;
		right: 0;
		bottom: 0;
		background-color: var(--card-actual-border-color);
		z-index: -1;
		box-sizing: border-box;
		border-radius: var(--card-actual-border-radius);
		transition:
			background-color var(--hover-effect-duration, 0.2s) ease-out,
			box-shadow var(--hover-effect-duration, 0.2s) ease-out;
	}

	.highlight-card {
		/* This is the main content area inside the border/padding wrapper */
		width: 100%;
		height: 100%;
		box-sizing: border-box;
		/* display: flex, flex-direction, align-items, gap are set by cardFlexLayoutStyle */
	}

	/* No specific CSS needed for .icon-wrapper-top, .icon-wrapper-side, .text-content-stacked,
	   .icon-title-row, .title-in-row-wrapper, .details-block as their layout
	   is primarily controlled by dynamic inline styles derived from props. */

	.highlight-icon {
		display: block; /* Ensures icon behaves predictably within its wrapper */
	}

	.highlight-title {
		/* Base title styles, specific typography from derived styles */
		font-family: 'Outfit', sans-serif;
	}
	.highlight-description {
		/* Base description styles, specific typography from derived styles */
		font-family: 'Lexend', sans-serif;
	}

	/* --- Hover Effects --- */
	.highlight-card-wrapper.hover-effect-lift:hover {
		transform: translateY(var(--hover-lift-amount, -4px));
	}
	.highlight-card-wrapper.hover-effect-glow:hover::before {
		box-shadow: 0 0 var(--hover-glow-spread, 15px) 0px var(--card-actual-border-color);
	}
	.highlight-card-wrapper.hover-effect-border-accent:hover::before {
		background-color: var(--color-primary);
	}
	.highlight-card-wrapper.hover-effect-background-accent:hover .highlight-card {
		background-color: var(--color-primary-container);
	}
</style>
