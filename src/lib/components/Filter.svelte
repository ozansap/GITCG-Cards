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

<div class="w-full rounded-3xl border-2 border-color_text p-2 text-sm text-color_text shadow-10 shadow-white/20">
	<div class="flex items-center justify-between gap-2 {when(expanded, 'mb-8')}">
		<div class="flex flex-1">
			<button on:click={() => (cardType = 'character')} class="min-w-[5rem] flex-1 rounded-l-full border-2 border-r-0 border-color_text py-1 text-center transition {when(cardType === 'character', 'border-r-2 border-white bg-white/20 text-white')}">
				<p>Character</p>
			</button>
			<button on:click={() => (cardType = 'action')} class="min-w-[5rem] flex-1 rounded-r-full border-2 border-l-0 border-color_text py-1 text-center transition {when(cardType === 'action', 'border-l-2 border-white bg-white/20 text-white')}">
				<p>Action</p>
			</button>
		</div>
		<div class="flex min-w-[7rem] flex-1 items-center rounded-full border-2 border-color_text">
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
				<fieldset class="relative mt-6 rounded-full border-2 border-color_text text-xs">
					<legend class="ml-8 h-0 px-2 leading-[0]">{category.name}</legend>
					<div class="grid {Filters.styles.category[category.value].grid} px-1 text-xs">
						{#each category.options as option, k}
							<div class="px-1 py-2">
								<button on:click={() => (option.active = !option.active)} class="flex h-full w-full items-center justify-center rounded-full border-2 border-color_text p-1 text-center {when(option.active, Filters.styles.option[option.value].active)}">
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
