<script lang="ts">
	import SavedDeck from '$lib/components/SavedDeck.svelte';
	import { Storage, store_storageDecks } from '$lib/utils/Storage';

	Storage.load(window);
</script>

<div class="flex flex-col pb-32">
	{#each $store_storageDecks as deck, index}
		<SavedDeck {deck} {index} />
	{/each}
</div>

<style lang="postcss">
</style>
