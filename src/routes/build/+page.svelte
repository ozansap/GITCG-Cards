<script lang="ts">
	import Deck from '$lib/components/Deck.svelte';
	import Filter from '$lib/components/Filter.svelte';
	import type { AnyCard, CardType } from '$lib/utils/Cards';
	import { Cards } from '$lib/utils/Cards';
	import Card from '$lib/components/Card.svelte';
	import { Filters, store_filterValues, type FilterValuesCategory } from '$lib/utils/Filters';
	import Nav from '$lib/components/Nav.svelte';

	let cardType: CardType = 'character';
	let query = '';

	$: filters = $store_filterValues[cardType] as FilterValuesCategory<AnyCard>[];
	$: filtered = Filters.apply(Cards.list[cardType], filters, query);
</script>

<Filter bind:cardType bind:query />

<div class="flex-1">
	<div class="grid w-full grid-cols-4 p-2 pb-64">
		{#each filtered as card, index}
			<Card {cardType} {card} {index} />
		{/each}
	</div>
</div>

<Deck />
<Nav />

<style lang="postcss">
</style>
