<script lang="ts">
	import { store_buildFilters } from '$lib/utils/stores';
	import type { CardType } from '$lib/utils/Cards';
	import { when } from '$lib/utils/helpers';
	import SVG_filter from '../svg/filter.svelte';
	import SVG_search from '../svg/search.svelte';

	export let cardType: CardType;
	export let query: string;

	let expanded = false;

	const filterStyles = {
		category: {
			element: {
				grid: 'grid-cols-[1fr_1fr_1fr_1fr_1fr_1fr_1fr]'
			},
			equipment: {
				grid: 'grid-cols-[1fr_1fr_1fr_1fr]'
			},
			support: {
				grid: 'grid-cols-[1fr_1fr_1fr_1fr]'
			},
			event: {
				grid: 'grid-cols-[1fr_2fr_1fr]'
			}
		},
		option: {
			element_cryo: {
				active: '!border-cryo bg-cryo/20'
			},
			element_hydro: {
				active: '!border-hydro bg-hydro/20'
			},
			element_pyro: {
				active: '!border-pyro bg-pyro/20'
			},
			element_electro: {
				active: '!border-electro bg-electro/20'
			},
			element_anemo: {
				active: '!border-anemo bg-anemo/20'
			},
			element_geo: {
				active: '!border-geo bg-geo/20'
			},
			element_dendro: {
				active: '!border-dendro bg-dendro/20'
			},
			equipment_all: {
				active: 'bg-color_primary text-white'
			},
			equipment_talent: {
				active: 'bg-color_primary text-white'
			},
			equipment_weapon: {
				active: 'bg-color_primary text-white'
			},
			equipment_artifact: {
				active: 'bg-color_primary text-white'
			},
			support_all: {
				active: 'bg-color_primary text-white'
			},
			support_location: {
				active: 'bg-color_primary text-white'
			},
			support_companion: {
				active: 'bg-color_primary text-white'
			},
			support_item: {
				active: 'bg-color_primary text-white'
			},
			event_all: {
				active: 'bg-color_primary text-white'
			},
			event_resonance: {
				active: 'bg-color_primary text-white'
			},
			event_food: {
				active: 'bg-color_primary text-white'
			}
		}
	};
</script>

<div class="sticky top-0 z-10 w-full border-b-2 border-color_accent bg-color_bg/80 p-4 text-color_text backdrop-blur">
	<div class="flex items-center justify-between gap-2 text-sm {when(expanded, 'mb-8')}">
		<div class="relative flex flex-1 rounded-full border-2 border-color_accent">
			<div class="absolute -z-10 h-full min-w-[5rem] rounded-full bg-color_primary {when(cardType === 'characters', 'left-0', 'right-0')}" />
			<button on:click={() => (cardType = 'characters')} class="min-w-[5rem] flex-1 py-1 text-center transition {when(cardType === 'characters', 'text-white')}">
				<p>Character</p>
			</button>
			<button on:click={() => (cardType = 'actions')} class="min-w-[5rem] flex-1 py-1 text-center transition {when(cardType === 'actions', 'text-white')}">
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
	{#each Object.entries($store_buildFilters) as [menuType, menu], i}
		{#if cardType === menuType && expanded}
			{#each menu as category, j}
				<fieldset class="relative mt-6 rounded-full border-2 border-color_accent text-xs">
					<legend class="ml-8 h-0 px-2 leading-[0]">{category.name}</legend>
					<div class="grid {filterStyles.category[category.value].grid} px-1 text-xs">
						{#each category.options as option, k}
							<div class="px-1 py-2">
								<button on:click={() => (option.active = !option.active)} class="flex h-full w-full items-center justify-center rounded-full border-2 border-color_accent p-1 text-center {when(option.active, filterStyles.option[option.value].active)}">
									{#if menuType === 'characters'}
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
