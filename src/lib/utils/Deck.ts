import { writable } from 'svelte/store';

export class Deck {
	public static cards: DeckCards = {
		character: [],
		action: []
	};
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
