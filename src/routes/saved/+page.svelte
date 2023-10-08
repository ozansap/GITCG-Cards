<script lang="ts">
	import SavedDeck from '$lib/components/SavedDeck.svelte';
	import { store_savedDecks } from '$lib/utils/stores';
</script>

<div class="flex flex-col pb-32">
	{#each $store_savedDecks as deck, index}
		<SavedDeck {deck} {index} />
	{/each}
</div>
