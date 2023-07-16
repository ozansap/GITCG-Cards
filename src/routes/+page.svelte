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

<div class="sticky z-10 top-0 w-full border-b-2 border-color_accent bg-black/70 p-4 shadow-20 shadow-white/20 backdrop-blur">
	<Filter bind:cardType bind:query />
</div>

<div class="flex-1">
	<div class="grid w-full grid-cols-4 p-2 pb-44">
		{#each filtered as card, index}
			<Card {cardType} {card} {index} />
		{/each}
	</div>
</div>

{#if $store_deckCards.character.length > 0 || $store_deckCards.action.length > 0}
	<div class="fixed bottom-0 z-10 w-full border-t-2 border-color_accent bg-black/70 shadow-20 shadow-white/20 backdrop-blur">
		<Deck />
	</div>
{/if}

<style lang="postcss">
</style>
