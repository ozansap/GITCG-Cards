<script lang="ts">
	import SavedDeck from '$lib/components/SavedDeck.svelte';
	import { store_savedDecks } from '$lib/utils/stores';
</script>

<div class="flex flex-col pb-32">
	{#if $store_savedDecks.length === 0}
		<h3 class="mx-auto mt-32 text-xl">You have no saved decks...</h3>
	{/if}
	{#each $store_savedDecks as deck, index}
		<SavedDeck {deck} {index} />
	{/each}
</div>
