<script lang="ts">
	import type { AnyCard } from '$lib/utils/Cards';
	import type { CardType } from '$lib/utils/Cards';
	import { store_deckCards } from '$lib/utils/Deck';

	export let cardType: CardType;
	export let card: AnyCard;
	export let index: number;

	function handle() {
		let deckCard = { id: card.id, name: card.name };

		if (cardType === 'character') {
			if ($store_deckCards.character.filter((x) => x.id === card.id).length === 1) return;
			if ($store_deckCards.character.length === 3) return;
			$store_deckCards.character.push(deckCard);
		} else {
			if ($store_deckCards.action.filter((x) => x.id === card.id).length === 2) return;
			if ($store_deckCards.action.length === 30) return;
			$store_deckCards.action.push(deckCard);
			$store_deckCards.action.sort((a, b) => a.id - b.id);
		}

		$store_deckCards = $store_deckCards;
	}
</script>

<button on:click={handle} class="flex items-center justify-center rounded-md border-2 border-transparent hover:!border-white">
	<div class="p-2">
		<img src="/cards/{card.id}.webp" alt={card.name} />
	</div>
</button>
