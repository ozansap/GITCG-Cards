<script lang="ts">
	import { goto } from '$app/navigation';
	import SVG_code from '$lib/svg/code.svelte';
	import SVG_image from '$lib/svg/image.svelte';
	import SVG_add from '$lib/svg/add.svelte';
	import { decode } from '$lib/utils/Share.js';
	import { store_buildDeck } from '$lib/utils/stores.js';
	import { toast } from '$lib/utils/toast.js';

	const importCode = async () => {
		const text = await navigator.clipboard.readText();
		const deck = decode(text).result;

		if (deck === null) return toast.error('Text copied in your clipboard is not a valid deck code!');

		store_buildDeck.set({ ...deck });
		goto('/build');
	};

	const importImage = () => {
		toast.error('This feature is coming soon!');
	};
</script>

<div class="mx-4 mt-16 flex flex-col items-center">
	<h1 class="mb-8 text-3xl font-bold">Build your own deck</h1>
	<div class="flex w-40 flex-col items-center gap-8 text-xl">
		<button on:click={() => goto('/build')} class="flex w-full items-center rounded-lg bg-color_primary px-2 py-1">
			<div class="w-6"><SVG_add /></div>
			<div class="m-auto">Build</div>
		</button>
	</div>

	<div class="my-8 flex w-full items-center">
		<div class="mr-4 flex-grow border-t-2 border-color_text" />
		<p class="text-2xl font-bold text-color_text">or</p>
		<div class="ml-4 flex-grow border-t-2 border-color_text" />
	</div>

	<h1 class="mb-8 text-3xl font-bold">Import deck from</h1>
	<div class="flex w-40 flex-col items-center gap-8 text-xl">
		<button on:click={importCode} class="flex w-full items-center rounded-lg bg-color_primary px-2 py-1">
			<div class="w-6"><SVG_code /></div>
			<div class="m-auto">Deck Code</div>
		</button>
		<button on:click={importImage} class="flex w-full items-center rounded-lg bg-color_primary px-2 py-1">
			<div class="w-6"><SVG_image /></div>
			<div class="m-auto">Deck Image</div>
		</button>
	</div>
</div>
