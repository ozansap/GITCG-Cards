<script lang="ts">
	import SVG_add from '$lib/svg/add.svelte';
	import SVG_home from '$lib/svg/home.svelte';
	import SVG_bookmark from '$lib/svg/bookmark.svelte';
	import { when } from '$lib/utils/helpers';

	export let route: string;

	const pages = [
		{
			name: 'Build',
			path: '/build',
			icon: SVG_add
		},
		{
			name: 'Home',
			path: '/',
			icon: SVG_home
		},
		{
			name: 'Saved',
			path: '/saved',
			icon: SVG_bookmark
		}
	];
</script>

<div class="fixed bottom-0 z-10 flex w-full border-t-2 border-color_accent bg-color_bg/90 py-2 text-color_text backdrop-blur">
	<div class="m-auto flex flex-shrink gap-4">
		{#each pages as page}
			<a href={page.path} class="flex w-20 flex-col items-center justify-center rounded-xl py-2 {when(route === page.path, 'bg-color_primary text-white')}">
				<div class="w-8">
					<svelte:component this={page.icon} />
				</div>
				<h2 class="leading-none">{page.name}</h2>
			</a>
		{/each}
	</div>
</div>
