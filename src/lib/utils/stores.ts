import { writable } from 'svelte/store';
import type { ActionCardData, CharacterCardData, AnyCardData } from './Cards';

function create_buildDeck() {
	const { subscribe, set, update } = writable<Deck>({
		name: 'New Deck',
		cards: {
			characters: [],
			actions: []
		}
	});

	const reset = () => {
		set({
			name: 'New Deck',
			cards: {
				characters: [],
				actions: []
			}
		});
	};

	const addCharacter = (card: Card) => {
		update((deck) => {
			deck.cards.characters.push(card);
			return deck;
		});
	};

	const addAction = (card: Card) => {
		update((deck) => {
			deck.cards.actions.push(card);
			deck.cards.actions.sort((a, b) => a.id - b.id);
			return deck;
		});
	};

	const removeCharacter = (id: number) => {
		update((deck) => {
			const index = deck.cards.characters.findIndex((x) => x.id === id);
			if (index !== -1) deck.cards.characters.splice(index, 1);
			return deck;
		});
	};

	const removeAction = (id: number) => {
		update((deck) => {
			const index = deck.cards.actions.findIndex((x) => x.id === id);
			if (index !== -1) deck.cards.actions.splice(index, 1);
			return deck;
		});
	};

	return {
		subscribe,
		set,
		reset,
		addCharacter,
		addAction,
		removeCharacter,
		removeAction
	};
}

function create_buildFilters() {
	const { subscribe, set, update } = writable<Filters>({
		characters: [
			{
				name: 'Element',
				value: 'element',
				options: [
					{ name: 'Cryo', value: 'element_cryo', active: false, filter: (x) => x.element_type === 301 },
					{ name: 'Hydro', value: 'element_hydro', active: false, filter: (x) => x.element_type === 302 },
					{ name: 'Pyro', value: 'element_pyro', active: false, filter: (x) => x.element_type === 303 },
					{ name: 'Electro', value: 'element_electro', active: false, filter: (x) => x.element_type === 304 },
					{ name: 'Anemo', value: 'element_anemo', active: false, filter: (x) => x.element_type === 307 },
					{ name: 'Geo', value: 'element_geo', active: false, filter: (x) => x.element_type === 305 },
					{ name: 'Dendro', value: 'element_dendro', active: false, filter: (x) => x.element_type === 306 }
				]
			}
		],
		actions: [
			{
				name: 'Equipment Cards',
				value: 'equipment',
				options: [
					{ name: 'All', value: 'equipment_all', active: false, filter: (x) => x.action_type === 'Equipment Cards' },
					{ name: 'Talent', value: 'equipment_talent', active: false, filter: (x) => x.action_card_tags.includes('Talent') },
					{ name: 'Weapon', value: 'equipment_weapon', active: false, filter: (x) => x.action_card_tags.includes('Weapon') },
					{ name: 'Artifact', value: 'equipment_artifact', active: false, filter: (x) => x.action_card_tags.includes('Artifact') }
				]
			},
			{
				name: 'Support Cards',
				value: 'support',
				options: [
					{ name: 'All', value: 'support_all', active: false, filter: (x) => x.action_type === 'Support Cards' },
					{ name: 'Location', value: 'support_location', active: false, filter: (x) => x.action_card_tags.includes('Location') },
					{ name: 'Companion', value: 'support_companion', active: false, filter: (x) => x.action_card_tags.includes('Companion') },
					{ name: 'Item', value: 'support_item', active: false, filter: (x) => x.action_card_tags.includes('Item') }
				]
			},
			{
				name: 'Event Cards',
				value: 'event',
				options: [
					{ name: 'All', value: 'event_all', active: false, filter: (x) => x.action_type === 'Event Cards' },
					{ name: 'Elemental Resonance', value: 'event_resonance', active: false, filter: (x) => x.action_card_tags.includes('Elemental Resonance') },
					{ name: 'Food', value: 'event_food', active: false, filter: (x) => x.action_card_tags.includes('Food') }
				]
			}
		]
	});

	const reset = () => {
		set({
			characters: [
				{
					name: 'Element',
					value: 'element',
					options: [
						{ name: 'Cryo', value: 'element_cryo', active: false, filter: (x) => x.element_type === 301 },
						{ name: 'Hydro', value: 'element_hydro', active: false, filter: (x) => x.element_type === 302 },
						{ name: 'Pyro', value: 'element_pyro', active: false, filter: (x) => x.element_type === 303 },
						{ name: 'Electro', value: 'element_electro', active: false, filter: (x) => x.element_type === 304 },
						{ name: 'Anemo', value: 'element_anemo', active: false, filter: (x) => x.element_type === 307 },
						{ name: 'Geo', value: 'element_geo', active: false, filter: (x) => x.element_type === 305 },
						{ name: 'Dendro', value: 'element_dendro', active: false, filter: (x) => x.element_type === 306 }
					]
				}
			],
			actions: [
				{
					name: 'Equipment Cards',
					value: 'equipment',
					options: [
						{ name: 'All', value: 'equipment_all', active: false, filter: (x) => x.action_type === 'Equipment Cards' },
						{ name: 'Talent', value: 'equipment_talent', active: false, filter: (x) => x.action_card_tags.includes('Talent') },
						{ name: 'Weapon', value: 'equipment_weapon', active: false, filter: (x) => x.action_card_tags.includes('Weapon') },
						{ name: 'Artifact', value: 'equipment_artifact', active: false, filter: (x) => x.action_card_tags.includes('Artifact') }
					]
				},
				{
					name: 'Support Cards',
					value: 'support',
					options: [
						{ name: 'All', value: 'support_all', active: false, filter: (x) => x.action_type === 'Support Cards' },
						{ name: 'Location', value: 'support_location', active: false, filter: (x) => x.action_card_tags.includes('Location') },
						{ name: 'Companion', value: 'support_companion', active: false, filter: (x) => x.action_card_tags.includes('Companion') },
						{ name: 'Item', value: 'support_item', active: false, filter: (x) => x.action_card_tags.includes('Item') }
					]
				},
				{
					name: 'Event Cards',
					value: 'event',
					options: [
						{ name: 'All', value: 'event_all', active: false, filter: (x) => x.action_type === 'Event Cards' },
						{ name: 'Elemental Resonance', value: 'event_resonance', active: false, filter: (x) => x.action_card_tags.includes('Elemental Resonance') },
						{ name: 'Food', value: 'event_food', active: false, filter: (x) => x.action_card_tags.includes('Food') }
					]
				}
			]
		});
	};

	return {
		subscribe,
		set,
		reset
	};
}

function create_savedDecks() {
	const { subscribe, set, update } = writable<Deck[]>([]);
	let w: Window;

	const reset = () => {
		set([]);
	};

	const add = (deck: Deck) => {
		if (deck.cards.characters.length < 3) return;
		if (deck.cards.actions.length < 30) return;

		update((decks) => {
			decks.push(deck);
			return decks;
		});
		save();
	};

	const remove = (index: number) => {
		update((decks) => {
			decks.splice(index, 1);
			return decks;
		});
		save();
	};

	const save = () => {
		update((decks) => {
			w.localStorage.setItem('decks', JSON.stringify(decks));
			return decks;
		});
	};

	const load = (window: Window) => {
		update((decks) => {
			const savedDecks = window.localStorage.getItem('decks');
			if (savedDecks) return JSON.parse(savedDecks);
			else return decks;
		});
		w = window;
	};

	return {
		subscribe,
		set,
		reset,
		add,
		remove,
		save,
		load
	};
}

export const store_buildDeck = create_buildDeck();
export const store_buildFilters = create_buildFilters();
export const store_savedDecks = create_savedDecks();

export type Deck = {
	name: string;
	cards: {
		characters: Card[];
		actions: Card[];
	};
};

export type Card = {
	id: number;
	name: string;
};

type Filters = {
	characters: FilterCategory<CharacterCardData>[];
	actions: FilterCategory<ActionCardData>[];
};

export type FilterCategory<T extends AnyCardData> = {
	name: string;
	value: FilterCategories;
	options: FilterOption<T>[];
};

export type FilterOption<T extends AnyCardData> = {
	name: string;
	value: FilterOptions;
	active: boolean;
	filter: (x: T) => boolean;
};

export type FilterStyles = {
	category: {
		[key in FilterCategories]: {
			grid: string;
		};
	};
	option: {
		[key in FilterOptions]: {
			active: string;
		};
	};
};

export type FilterCategories = 'element' | 'equipment' | 'support' | 'event';

export type FilterOptions = 'element_cryo' | 'element_hydro' | 'element_pyro' | 'element_electro' | 'element_anemo' | 'element_geo' | 'element_dendro' | 'equipment_all' | 'equipment_talent' | 'equipment_weapon' | 'equipment_artifact' | 'support_all' | 'support_location' | 'support_companion' | 'support_item' | 'event_all' | 'event_resonance' | 'event_food';
