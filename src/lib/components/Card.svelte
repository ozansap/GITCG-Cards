<script lang="ts">
	import type { ActionCard, CharacterCard } from '$lib/utils/Cards';
	import type { CardType } from '$lib/utils/Cards';

	export let cardType: CardType;
	export let card: CharacterCard | ActionCard;
	export let index: number;
</script>

<div class="p-1">
	<img src="/cards/{card.id}.webp" alt={card.name} />
</div>
