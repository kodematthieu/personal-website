<script lang="ts">
	// Data and imports for page sections
	import ArchitectSection from '$lib/components/sections/ArchitectSection.svelte';
	import DisciplinesSection from '$lib/components/sections/DisciplinesSection.svelte';
	import HeroSection from '$lib/components/sections/HeroSection.svelte';
	import ProjectsSection, { type Project } from '$lib/components/sections/ProjectsSection.svelte';
	import TransmitSection from '$lib/components/sections/TransmitSection.svelte';

	// All data for the page sections is now cleanly managed here.
	// In the future, this data could come from a CMS or an API fetch.
	const introductoryText = [
		'I am a software engineering student and a systems thinker, driven by a deep curiosity for how reality truly functions and a desire to create something new. My approach centers on dissecting complex concepts down to their fundamental principles, whether in physics, mathematics, or code.',
		'I focus on building and optimizing within consistent, rule-based systems, always seeking clarity and efficiency in design. Understanding underlying principles is paramount, as "control is the closest I\'ll ever have towards absolute freedom", allowing logic to shape environments and automate possibilities.',
	];
	const crystallineLogicSkills: string[] = [
		'Systems Programming',
		'Performance Optimization',
		'Algorithm Design & Analysis',
		'Logical Soundness & Determinism',
		'Resource Efficiency',
		'Elegant & Maintainable Abstractions',
		'Foundational Python Engineering',
	];

	const etherealCreativitySkills: string[] = [
		'First-Principles Deconstruction',
		'Systematic Synthesis',
		'Iterative & Experimental Prototyping',
		'Conceptual Compression',
		'Pragmatic & Purposeful Rule-Breaking',
		'Mathematical & Logical Rigor',
		'Strategic Autonomy',
	];

	const allProjects: Project[] = [
		// {
		// 	title: 'Kernel Module Loader',
		// 	description:
		// 		'A secure and efficient utility for dynamically loading and managing Linux kernel modules at runtime.',
		// 	projectTypeLabel: '<System: Kernel Utility>',
		// 	techTags: ['C', 'Linux Kernel', 'System Calls', 'Security'],
		// 	githubLink: 'https://github.com/kodematthieu/kernel-module-loader'
		// },
		// {
		// 	title: 'Concurrent Task Scheduler',
		// 	description:
		// 		'A high-performance scheduler designed for parallel task execution across multiple CPU cores with minimal overhead.',
		// 	projectTypeLabel: '<System: Concurrency Engine>',
		// 	techTags: ['Rust', 'Concurrency', 'Algorithms', 'Optimization'],
		// 	githubLink: 'https://github.com/kodematthieu/task-scheduler'
		// },
		// {
		// 	title: 'Network Packet Analyzer',
		// 	description:
		// 		'A command-line tool for capturing, parsing, and analyzing network traffic at the raw packet level.',
		// 	projectTypeLabel: '<Module: Packet Inspector>',
		// 	techTags: ['GoLang', 'Networking', 'Packet Capture', 'CLI'],
		// 	githubLink: 'https://github.com/kodematthieu/packet-analyzer'
		// },
		// {
		// 	title: 'Embedded Firmware Update System',
		// 	description:
		// 		'Developed a robust over-the-air (OTA) firmware update mechanism for resource-constrained embedded devices.',
		// 	projectTypeLabel: '<Protocol: OTA Firmware>',
		// 	techTags: ['C++', 'Embedded Systems', 'Firmware', 'Security'],
		// 	githubLink: 'https://github.com/kodematthieu/firmware-updater'
		// }
	];
	const featuredProjects = allProjects.slice(0, 3);
</script>

<!-- The page is now a clean composition of its sections -->
<HeroSection />
<ArchitectSection content={introductoryText} />
<DisciplinesSection
	crystallineSkills={crystallineLogicSkills}
	etherealSkills={etherealCreativitySkills}
/>
<ProjectsSection projects={featuredProjects} />
<TransmitSection />

<style>
	/* 
	  The +page.svelte style block is now EMPTY.
	  All styles have been moved to their respective components.
	*/
</style>
