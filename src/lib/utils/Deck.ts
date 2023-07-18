import { writable } from 'svelte/store';

export class Deck {
	public static cards: DeckCards = {
		character: [],
		action: []
	};

	static empty() {
		Deck.cards = {
			character: [],
			action: []
		};

		store_deckCards.set(Deck.cards);
	}
}

export const store_deckCards = writable(Deck.cards);

export type DeckCards = {
	character: DeckCard[];
	action: DeckCard[];
};

export type DeckCard = {
	name: string;
	id: number;
};
