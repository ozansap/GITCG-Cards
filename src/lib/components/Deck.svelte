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

<div class="fixed bottom-0 z-10 max-h-screen w-full border-t-2 border-color_accent bg-color_bg/70 shadow-20 shadow-white/20 backdrop-blur">
	<div class="flex w-full touch-none flex-col overflow-hidden">
		<div class="mx-auto my-4 h-1 w-48 rounded-full bg-white" />
		<div class="mx-10 mb-4 flex justify-around">
			{#each characterCards as card}
				<button on:click={() => removeCharacter(card.id)}>
					<img class="w-16" src="/cards/{card.id}.webp" alt={card.name} />
				</button>
			{/each}
		</div>
		<div class="mx-8 grid grid-cols-5 gap-3">
			{#each $store_deckCards.action as card}
				<button class="flex justify-center" on:click={() => removeAction(card.id)}>
					<img src="/cards/{card.id}.webp" alt={card.name} />
				</button>
			{/each}
		</div>
	</div>
</div>
