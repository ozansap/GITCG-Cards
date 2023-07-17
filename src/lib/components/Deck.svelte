<script lang="ts">
	import { store_deckCards } from '$lib/utils/Deck';
	import { tweened } from 'svelte/motion';
	import { cubicOut } from 'svelte/easing';
	import { onMount } from 'svelte';

	let dragger: HTMLElement;

	let dragging = false;
	let dragStart = 0;
	let dragEnd = 0;

	let positions = [0, 0];
	let posIndex = 1;
	let hidden = 9000;

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
		let nonempty = $store_deckCards.action.length || $store_deckCards.character.length;
		if (!nonempty) position.set(hidden);
		else if ($position === hidden) position.set(positions[1]);
	}

	onMount(async () => {
		hidden = window.innerHeight + 100;
		positions[1] = window.innerHeight - 165;

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

<div style="top:{$position}px" class="fixed z-10 h-screen w-full touch-none select-none border-t-2 border-color_accent bg-color_bg/80 shadow-20 shadow-white/20 backdrop-blur">
	<div class="flex w-full flex-col overflow-hidden">
		<div bind:this={dragger} class="center flex h-10 w-full">
			<div class="mx-auto h-1 w-48 rounded-full bg-white" />
		</div>
		<div class="mx-10 mb-4 flex justify-around">
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
