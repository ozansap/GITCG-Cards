<script lang="ts">
	import { store_deckCards } from '$lib/utils/Deck';

	const defaultCard = { id: 0, name: 'Empty' };
	$: characterCards = Array(3)
		.fill(0)
		.map((x, i) => (x = $store_deckCards.character[i] ?? defaultCard));

	function removeCharacter(id: number) {
		const index = $store_deckCards.character.findIndex((x) => x.id === id);
		$store_deckCards.character.splice(index, 1);
		$store_deckCards.character = $store_deckCards.character;
	}

	function removeAction(id: number) {
		const index = $store_deckCards.action.findIndex((x) => x.id === id);
		$store_deckCards.action.splice(index, 1);
		$store_deckCards.action = $store_deckCards.action;
	}
</script>

<div class="flex w-full flex-col py-4">
	<h2 class="mb-4 ml-4">My Deck</h2>
	<div class="flex flex-1 overflow-x-scroll px-4">
		<div class="flex shrink-0 gap-1">
			{#each characterCards as card}
				<button on:click={() => removeCharacter(card.id)}>
					<img class="w-14" src="/cards/{card.id}.webp" alt={card.name} />
				</button>
			{/each}
		</div>
		<div class="mx-3 border" />
		<div class="flex shrink-0 gap-1">
			{#each $store_deckCards.action as card}
				<button on:click={() => removeAction(card.id)}>
					<img class="w-14" src="/cards/{card.id}.webp" alt={card.name} />
				</button>
			{/each}
		</div>
	</div>
</div>
