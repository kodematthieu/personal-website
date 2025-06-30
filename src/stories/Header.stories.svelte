<script lang="ts">
	import { Meta, Story } from '@storybook/addon-svelte-csf';
	import MainHeader from '$lib/components/layout/MainHeader.svelte';
</script>

<Meta
	title="Layout/MainHeader"
	component={MainHeader}
	parameters={{
		layout: 'fullscreen'
	}}
/>

<Story name="Default" />
