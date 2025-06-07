import type { Snippet } from 'svelte';
import type { AdvancedXOR } from '$lib/types';

interface HighlightCardGeneralStyleProps {
	hoverEffect?: 'lift' | 'glow' | 'border-accent' | 'background-accent' | 'none';
	background?: string;
	borderColor?: string;
	borderWidth?: string;
	borderRadius?: string;
	cardPadding?: string;
	boxShadow?: string;
	borderStyle?: string;
	contentAlignment?: 'start' | 'center';
}

interface LinkProps {
	href: string;
	target?: '_self' | '_blank' | '_parent' | '_top';
	rel?: string;
}

interface HoverEffectNone {
	hoverEffect?: 'none';
	hoverLiftAmount?: never;
	hoverGlowSpread?: never;
	hoverEffectDuration?: never;
}
interface HoverEffectLift {
	hoverEffect: 'lift';
	hoverLiftAmount?: string;
	hoverGlowSpread?: never;
	hoverEffectDuration?: string;
}
interface HoverEffectGlow {
	hoverEffect: 'glow';
	hoverGlowSpread?: string;
	hoverLiftAmount?: never;
	hoverEffectDuration?: string;
}
interface HoverEffectColorAccent {
	hoverEffect: 'border-accent' | 'background-accent';
	hoverLiftAmount?: never;
	hoverGlowSpread?: never;
	hoverEffectDuration?: string;
}
type HighlightCardHoverProps =
	| HoverEffectNone
	| HoverEffectLift
	| HoverEffectGlow
	| HoverEffectColorAccent;

interface HighlightCardStructuredBase {
	title: string;
	details: string;
	titleColor?: string;
	detailsColor?: string;
	textAlign?: 'left' | 'center' | 'right' | 'justify';
	titleFontSize?: string;
	titleFontWeight?: string | number;
	detailsFontSize?: string;
	detailsLineHeight?: string | number;
	detailsMaxWidth?: string;
	gapBetweenTitleAndDetails?: string;
}

interface HighlightCardStructuredWithIcon extends HighlightCardStructuredBase {
	icon: any;
	iconPlacement?: 'top' | 'left' | 'right';
	iconSize?: string;
	iconWrapperPadding?: string;
	iconWrapperShape?: 'circle' | 'square' | 'rounded';
	iconColor?: string;
	iconBackgroundColor?: string;
	iconSpacing?: string;
}

interface HighlightCardStructuredNoIcon extends HighlightCardStructuredBase {
	icon?: never;
	iconPlacement?: never;
	iconSize?: never;
	iconWrapperPadding?: never;
	iconWrapperShape?: never;
	iconColor?: never;
	iconBackgroundColor?: never;
	iconSpacing?: never;
}

type StructuredContentProps = HighlightCardStructuredWithIcon | HighlightCardStructuredNoIcon;

interface SlottedContentProps {
	children: Snippet;
}

interface HighlightCardNamedSlots {
	rawHeader?: Snippet;
	header?: Snippet;
	footer?: Snippet;
}

export type HighlightCardProps = HighlightCardGeneralStyleProps &
	HighlightCardHoverProps &
	HighlightCardNamedSlots &
	AdvancedXOR<LinkProps, { href?: never }> &
	AdvancedXOR<StructuredContentProps, SlottedContentProps>;
