<script lang="ts">
	import Deck from '$lib/components/Deck.svelte';
	import Filter from '$lib/components/Filter.svelte';
	import type { AnyCard, CardType } from '$lib/utils/Cards';
	import { Cards } from '$lib/utils/Cards';
	import Card from '$lib/components/Card.svelte';
	import { Filters, store_filterValues, type FilterValuesCategory } from '$lib/utils/Filters';
	import { store_deckCards } from '$lib/utils/Deck';

	let cardType: CardType = 'character';
	let query = '';

	$: filters = $store_filterValues[cardType] as FilterValuesCategory<AnyCard>[];
	$: filtered = Filters.apply(Cards.list[cardType], filters, query);
</script>

<Filter bind:cardType bind:query />

<div class="flex-1">
	<div class="grid w-full grid-cols-4 p-2 pb-44">
		{#each filtered as card, index}
			<Card {cardType} {card} {index} />
		{/each}
	</div>
</div>

{#if $store_deckCards.character.length > 0 || $store_deckCards.action.length > 0}
	<Deck />
{/if}

<style lang="postcss">
</style>
