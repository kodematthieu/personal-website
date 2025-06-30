<script lang="ts">
	import { Meta, Story, Template } from '@storybook/addon-svelte-csf';
	import Button from '$lib/components/ui/Button.svelte';
</script>

<Meta
	title="Example/Button"
	component={Button}
	argTypes={{
		label: { control: 'text' },
		href: { control: 'text' }
	}}
/>

<Template let:args>
	<Button {...args}>{args.label}</Button>
</Template>

<Story
	name="Primary Button"
	args={{
		label: 'Click Me',
		class: 'btn'
	}}
/>

<Story
	name="Link Button"
	args={{
		label: 'Go to Google',
		href: 'https://google.com',
		class: 'btn'
	}}
/>
