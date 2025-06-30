export interface NavLink {
	href: string;
	label: string;
}

export const navigationLinks: NavLink[] = [
	{ href: '#nexus', label: '~ Nexus' },
	{ href: '#architect', label: '~ The Architect' },
	{ href: '#disciplines', label: '~ Disciplines' },
	{ href: '#constructs', label: '~ Constructs' },
	{ href: '#transmit', label: '~ Transmit' }
];
