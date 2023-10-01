import { writable } from 'svelte/store';
import type { DeckCards } from './Deck';

export class Storage {
	public static decks: StorageDeck[] = [];

	static add() {}

	static empty() {
		Storage.decks = [];
		store_storageDecks.set(Storage.decks);
	}

	static load(window: Window) {
		const decks = window.localStorage.getItem('decks');
		if (decks) {
			Storage.decks = JSON.parse(decks);
			store_storageDecks.set(Storage.decks);
		}
	}

	static save(window: Window) {
		window.localStorage.setItem('decks', JSON.stringify(Storage.decks));
	}
}

export const store_storageDecks = writable(Storage.decks);

export type StorageDeck = {
	name: string;
	cards: DeckCards;
};
