<script lang="ts">
	import type { AnyCardData } from '$lib/utils/Cards';
	import type { CardType } from '$lib/utils/Cards';
	import { when } from '$lib/utils/helpers';
	import { store_buildDeck } from '$lib/utils/stores';

	export let cardType: CardType;
	export let cardData: AnyCardData;
	export let index: number;

	const singleCopy = cardType === 'characters' || (330000 < cardData.id && cardData.id < 331000);

	function handle() {
		if (unavailable) return;
		let card = { id: cardData.id, name: cardData.name };

		if (cardType === 'characters') {
			if ($store_buildDeck.cards.characters.length === 3) return;
			store_buildDeck.addCharacter(card);
		} else {
			if ($store_buildDeck.cards.actions.length === 30) return;
			store_buildDeck.addAction(card);
		}

		$store_buildDeck = $store_buildDeck;
	}

	$: count = $store_buildDeck.cards[cardType].filter((x) => x.id === cardData.id).length;
	$: unavailable = singleCopy ? count === 1 : count === 2;
</script>

<button on:click={handle} class="flex items-center justify-center rounded-md border-2 border-transparent hover:!border-white">
	<div class="p-2">
		<img src="/cards/{cardData.id}.webp" alt={cardData.name} class={when(unavailable, 'grayscale')} />
	</div>
</button>
