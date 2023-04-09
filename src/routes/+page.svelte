<script lang="ts">
	import Deck from '$lib/components/Deck.svelte';
	import Filter from '$lib/components/Filter.svelte';
	import type { AnyCard, CardType } from '$lib/utils/Cards';
	import { Cards } from '$lib/utils/Cards';
	import Card from '$lib/components/Card.svelte';
	import { Filters, filterValues, type FilterValuesCategory } from '$lib/utils/Filters';

	let cardType: CardType = 'character';
	let query = '';

	$: filters = $filterValues[cardType] as FilterValuesCategory<AnyCard>[];
	$: filtered = Filters.apply(Cards.list[cardType], filters, query);
</script>

<div class="sticky top-0 w-full border-b-2 border-color_accent bg-black/70 p-4 shadow-20 shadow-white/20 backdrop-blur">
	<Filter bind:cardType bind:query />
</div>

<div class="flex-1">
	<div class="mb-40 grid w-full grid-cols-4 gap-2 p-2">
		{#each filtered as card, index}
			<div class="flex items-center justify-center rounded-md hover:border-2">
				<Card {cardType} {card} {index} />
			</div>
		{/each}
	</div>
</div>

<div class="fixed bottom-0 h-40 w-full border-t-2 border-color_accent bg-black/70 p-2 shadow-20 shadow-white/20 backdrop-blur">
	<Deck />
</div>

<style lang="postcss">
</style>
