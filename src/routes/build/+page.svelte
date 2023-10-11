<script lang="ts">
	import Deck from '$lib/components/BuildDeck.svelte';
	import Filter from '$lib/components/BuildFilter.svelte';
	import type { AnyCardData, CardType } from '$lib/utils/Cards';
	import { Cards } from '$lib/utils/Cards';
	import Card from '$lib/components/BuildCard.svelte';
	import { store_buildFilters, type FilterCategory } from '$lib/utils/stores';

	let cardType: CardType = 'characters';
	let query = '';

	$: filters = $store_buildFilters[cardType] as FilterCategory<AnyCardData>[];
	$: filtered = applyFilters(Cards.list[cardType], filters, query);

	function applyFilters<T extends AnyCardData>(cards: T[], filters: FilterCategory<T>[], query: string): T[] {
		const search = (x: T) => x.name.toLowerCase().includes(query.toLowerCase());
		let active: ((x: T) => boolean)[] = [];

		for (const category of filters) {
			for (const option of category.options) {
				if (option.active) active.push(option.filter);
			}
		}

		const filtered = cards.filter((x) => {
			if (!search(x)) return false;

			if (active.length === 0) return true;

			for (const filter of active) {
				if (filter(x)) return true;
			}
		});

		return filtered;
	}
</script>

<Filter bind:cardType bind:query />

<div class="flex-1">
	<div class="grid w-full grid-cols-4 p-2 pb-32">
		{#each filtered as cardData}
			<Card {cardType} {cardData} />
		{/each}
	</div>
</div>

<Deck />
