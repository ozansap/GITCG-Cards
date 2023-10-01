<script lang="ts">
	import { Deck, store_deckCards } from '$lib/utils/Deck';
	import { tweened } from 'svelte/motion';
	import { cubicOut } from 'svelte/easing';
	import { beforeUpdate, onMount } from 'svelte';
	import { when } from '$lib/utils/helpers';
	import SVG_save from '$lib/svg/bookmark_add.svelte';
	import SVG_copy from '$lib/svg/copy.svelte';
	import SVG_delete from '$lib/svg/delete.svelte';

	let dragger: HTMLElement;

	let dragging = false;
	let dragStart = 0;
	let dragEnd = 0;

	let positions = [0, 0, 0];
	let posIndex = 1;
	let hidden = 9000;

	let full = false;
	let empty = true;

	const position = tweened(hidden, {
		duration: 400,
		easing: cubicOut
	});

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

	$: {
		$store_deckCards.character.length, $store_deckCards.action.length;

		full = Deck.isFull();
		empty = Deck.isEmpty();

		if (empty) position.set(hidden);
		else if ($position === hidden) position.set(positions[1]);
	}

	beforeUpdate(async () => {
		hidden = window.innerHeight;
		positions[1] = window.innerHeight - 82 - 30 - 110 - 32 - 32 - 64;
		positions[2] = window.innerHeight - 82 - 62;
	});

	onMount(async () => {
		dragger.addEventListener('touchstart', start);
		window.addEventListener('touchend', end);
		window.addEventListener('touchmove', move);
		dragger.addEventListener('mousedown', start);
		window.addEventListener('mouseup', end);
		window.addEventListener('mouseleave', end);
		window.addEventListener('mousemove', move);

		function move(e: MouseEvent | TouchEvent) {
			if (!dragging) return;
			let target = e instanceof MouseEvent ? e.clientY : e.touches[0].clientY;
			dragEnd = target;
			position.set(target);
		}

		function start(e: MouseEvent | TouchEvent) {
			dragging = true;
			dragStart = e instanceof MouseEvent ? e.clientY : e.touches[0].clientY;
		}

		function end() {
			let movement = dragging ? dragEnd - dragStart : 0;
			dragging = false;

			if (movement > 100 && posIndex < positions.length - 1) posIndex++;
			if (movement < -100 && posIndex > 0) posIndex--;

			position.set(positions[posIndex]);
		}
	});
</script>

<div style="top:{$position}px" class="-20 fixed z-10 h-screen w-full touch-none select-none border-t-2 border-color_accent bg-color_bg/80 backdrop-blur">
	<div class="flex w-full flex-col overflow-hidden">
		<div bind:this={dragger} class="center flex h-16 w-full">
			<div class="mx-auto h-1 w-48 rounded-full bg-white" />
		</div>
		<div class="mb-8 flex h-8 w-full justify-between px-6 text-center">
			<h3 class="flex items-center justify-center">{$store_deckCards.action.length}/30</h3>
			<div class="flex gap-2">
				<button on:click={() => Deck.copy()} class="flex items-center justify-center rounded-lg px-2 {when(full, 'bg-color_primary text-white', 'cursor-default bg-color_accent text-color_text')}">
					<div class="w-6"><SVG_copy /></div>
					Copy
				</button>
				<button on:click={() => Deck.save(window)} class="flex items-center justify-center rounded-lg px-2 {when(full, 'bg-color_primary text-white', 'cursor-default bg-color_accent text-color_text')}">
					<div class="w-6"><SVG_save /></div>
					Save
				</button>
				<button on:click={() => Deck.empty()} class="flex items-center justify-center rounded-lg bg-red-600 px-2">
					<div class="w-6"><SVG_delete /></div>
					Empty
				</button>
			</div>
		</div>
		<div class="mx-10 mb-8 flex justify-around">
			{#each characterCards as card}
				<button on:click={() => removeCharacter(card.id)}>
					<img class="w-16" src="/cards/{card.id}.webp" alt={card.name} />
				</button>
			{/each}
		</div>
		<div class="mx-8 grid grid-cols-6 gap-2">
			{#each $store_deckCards.action as card}
				<button class="flex justify-center" on:click={() => removeAction(card.id)}>
					<img src="/cards/{card.id}.webp" alt={card.name} />
				</button>
			{/each}
		</div>
	</div>
</div>
