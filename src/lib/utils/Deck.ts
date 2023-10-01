import { writable } from 'svelte/store';
import { Storage } from './Storage';

export class Deck {
	public static cards: DeckCards = {
		character: [],
		action: []
	};

	static isEmpty() {
		return Deck.cards.character.length === 0 && Deck.cards.action.length === 0;
	}

	static isFull() {
		return Deck.cards.character.length === 3 && Deck.cards.action.length === 30;
	}

	static empty() {
		Deck.cards = {
			character: [],
			action: []
		};

		store_deckCards.set(Deck.cards);
	}

	static copy() {
		if (!Deck.isFull()) return;
	}

	static save(window: Window) {
		if (!Deck.isFull()) return;
		Storage.decks.push({ name: 'New Deck', cards: Deck.cards });
		Storage.save(window);
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
