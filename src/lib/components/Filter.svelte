<script lang="ts">
	import type { CardType } from '$lib/utils/Cards';
	import { Filters, store_filterValues } from '$lib/utils/Filters';
	import { when } from '$lib/utils/helpers';
	import SVG_filter from '../svg/filter.svelte';
	import SVG_search from '../svg/search.svelte';

	export let cardType: CardType;
	export let query: string;

	let expanded = false;
</script>

<div class="sticky top-0 z-10 w-full border-b-2 border-color_accent bg-color_bg/80 p-4 text-color_text backdrop-blur">
	<div class="flex items-center justify-between gap-2 text-sm {when(expanded, 'mb-8')}">
		<div class="relative flex flex-1 rounded-full border-2 border-color_accent">
			<div class="absolute -z-10 h-full min-w-[5rem] rounded-full bg-color_primary {when(cardType === 'character', 'left-0', 'right-0')}" />
			<button on:click={() => (cardType = 'character')} class="min-w-[5rem] flex-1 py-1 text-center transition {when(cardType === 'character', 'text-white')}">
				<p>Character</p>
			</button>
			<button on:click={() => (cardType = 'action')} class="min-w-[5rem] flex-1 py-1 text-center transition {when(cardType === 'action', 'text-white')}">
				<p>Action</p>
			</button>
		</div>
		<div class="flex min-w-[7rem] flex-1 items-center rounded-full border-2 border-color_accent">
			<div class="ml-1 h-full w-6">
				<SVG_search />
			</div>
			<input bind:value={query} type="text" placeholder="Search" class="w-0 flex-1 rounded-r-full bg-transparent px-2 py-1 text-white placeholder-color_text" />
		</div>
		<button on:click={() => (expanded = !expanded)} class="flex h-8 items-center justify-center {when(expanded, 'text-white')}">
			<SVG_filter />
		</button>
	</div>
	{#each Object.entries($store_filterValues) as [menuType, menu], i}
		{#if cardType === menuType && expanded}
			{#each menu as category, j}
				<fieldset class="relative mt-6 rounded-full border-2 border-color_accent text-xs">
					<legend class="ml-8 h-0 px-2 leading-[0]">{category.name}</legend>
					<div class="grid {Filters.styles.category[category.value].grid} px-1 text-xs">
						{#each category.options as option, k}
							<div class="px-1 py-2">
								<button on:click={() => (option.active = !option.active)} class="flex h-full w-full items-center justify-center rounded-full border-2 border-color_accent p-1 text-center {when(option.active, Filters.styles.option[option.value].active)}">
									{#if menuType === 'character'}
										<img src="/ui/elements/{option.name.toLowerCase()}.png" alt={option.name} class="flex-1 {when(!option.active, 'grayscale')}" />
									{:else}
										<p>{option.name}</p>
									{/if}
								</button>
							</div>
						{/each}
					</div>
				</fieldset>
			{/each}
		{/if}
	{/each}
</div>
