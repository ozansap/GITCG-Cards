<script lang="ts">
	import type { CardType } from '../types/types';
	import SVG_filter from '../icons/filter.svelte';
	import SVG_search from '../icons/search.svelte';

	let cardType: CardType = 1;
	let expanded = true;

	let filters = [
		[
			{
				name: 'Element',
				grid: 'grid-cols-[1fr_1fr_1fr_1fr_1fr_1fr_1fr]',
				options: [
					{ name: 'Cryo', value: false },
					{ name: 'Hydro', value: false },
					{ name: 'Pyro', value: false },
					{ name: 'Electro', value: false },
					{ name: 'Anemo', value: false },
					{ name: 'Geo', value: false },
					{ name: 'Dendro', value: false }
				]
			}
		],
		[
			{
				name: 'Equipment Cards',
				grid: 'grid-cols-[1fr_1fr_1fr_1fr]',
				options: [
					{ name: 'All', value: false },
					{ name: 'Talent', value: false },
					{ name: 'Weapon', value: false },
					{ name: 'Artifact', value: false }
				]
			},
			{
				name: 'Support Cards',
				grid: 'grid-cols-[1fr_1fr_1fr_1fr]',
				options: [
					{ name: 'All', value: false },
					{ name: 'Location', value: false },
					{ name: 'Companion', value: false },
					{ name: 'Item', value: false }
				]
			},
			{
				name: 'Event Cards',
				grid: 'grid-cols-[1fr_2fr_1fr]',
				options: [
					{ name: 'All', value: false },
					{ name: 'Elemental Resonance', value: false },
					{ name: 'Food', value: false }
				]
			}
		]
	];
</script>

<div class="w-full rounded-3xl border-2 border-color_accent p-2 text-sm text-color_text shadow-10 shadow-white/20">
	<div class="flex items-center justify-between {expanded && 'mb-8'}">
		<div class="flex rounded-full border-2 border-color_accent">
			<button on:click={() => (cardType = 0)} class="w-20 rounded-l-full py-1 text-center transition {cardType === 0 && 'bg-white/20 text-white shadow-10 shadow-white/60'}">
				<p class="border-r border-color_accent">Character</p>
			</button>
			<button on:click={() => (cardType = 1)} class="w-20 rounded-r-full py-1 text-center transition {cardType === 1 && 'bg-white/20 text-white shadow-10 shadow-white/60'}">
				<p class="border-l border-color_accent">Action</p>
			</button>
		</div>
		<div class="flex w-28 items-center rounded-full border-2 border-color_accent">
			<div class="ml-1 h-full w-6">
				<SVG_search />
			</div>
			<input type="text" placeholder="Search" class="w-0 flex-1 rounded-r-full bg-transparent px-2 py-1 text-white placeholder-color_text" />
		</div>
		<button on:click={() => (expanded = !expanded)} class="flex h-8 items-center justify-center {expanded && 'text-white'}">
			<SVG_filter />
		</button>
	</div>
	{#each filters as menu, i}
		{#if cardType === i && expanded}
			{#each filters[i] as filter, j}
				<div class="relative mt-4 rounded-full border-2 border-color_accent text-xs">
					<h3 class="absolute top-[-13px] left-6 bg-black px-3">{filter.name}</h3>
					<div class="grid {filter.grid} px-1 text-[10px]">
						{#each filter.options as option, k}
							<div class="py-2 px-1">
								<button on:click={() => (option.value = !option.value)} class="h-full w-full rounded-full border border-color_accent py-1 text-center {option.value && 'border-white bg-white/20 text-white'}">
									<p>{option.name}</p>
								</button>
							</div>
						{/each}
					</div>
				</div>
			{/each}
		{/if}
	{/each}
</div>
