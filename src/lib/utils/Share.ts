import { Cards, type Version } from '$lib/utils/Cards';
import type { Deck } from './stores';
import { convertBase } from 'simple-base-converter';

const chars = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz';

// prettier-ignore
const b = {			// bit counts
	v: 8, 				// version
	c: 8, 				// character index
	a: 11, 				// action index
	d: 1 					// action count
};

export const encode = (deck: Deck): string => {
	const data = toShareData(deck);
	const binary = Encode.header(data.version) + Encode.characters(data.characters) + Encode.actions(data.actions);
	return convertBase(binary, 2, chars);
};

export const decode = (code: string): Deck => {
	const binary = convertBase(code, chars, 2);
	const version = Decode.header(binary.slice(0, b['v']));
	const characters = Decode.characters(binary.slice(b['v'], b['v'] + b['c'] * 3));
	const actions = Decode.actions(binary.slice(b['v'] + b['c'] * 3));
	return fromShareData({ version, characters, actions });
};

class Encode {
	static header(version: Version): string {
		return parseInt(version).toString(2).padStart(b['v'], '0');
	}

	static characters(characters: number[]): string {
		let res = '';

		for (const character of characters) {
			res += character.toString(2).padStart(b['c'], '0');
		}

		return res;
	}

	static actions(actions: ShareData['actions']): string {
		let res = '';

		for (const [index, value] of Object.entries(actions)) {
			res += parseInt(index).toString(2).padStart(b['a'], '0');
			res += value.toString(2).padStart(b['d'], '0');
		}

		return res;
	}
}

class Decode {
	static header(binary: string): Version {
		return parseInt(binary, 2).toString() as Version;
	}

	static characters(binary: string): number[] {
		const res = [];

		for (let i = 0; i < binary.length; i += b['c']) {
			res.push(parseInt(binary.slice(i, i + b['c']), 2));
		}

		return res;
	}

	static actions(binary: string): ShareData['actions'] {
		const res: ShareData['actions'] = {};

		for (let i = 0; i < binary.length; i += b['a'] + b['d']) {
			const index = parseInt(binary.slice(i, i + b['a']), 2);
			const value = parseInt(binary.slice(i + b['a'], i + b['a'] + b['d']), 2);
			res[index] = value;
		}

		return res;
	}
}

const toShareData = (deck: Deck): ShareData => {
	let shareData: ShareData = {
		version: Cards.version,
		characters: deck.cards.characters.map((character) => Cards.list.characters.findIndex((c) => c.id === character.id)),
		actions: {}
	};

	for (const action of deck.cards.actions) {
		const index = Cards.list.actions.findIndex((a) => a.id === action.id);
		shareData.actions[index] ? shareData.actions[index]++ : (shareData.actions[index] = 1);
	}

	return shareData;
};

const fromShareData = (data: ShareData): Deck => {
	let deck: Deck = {
		name: 'Imported Deck',
		cards: {
			characters: [],
			actions: []
		}
	};

	for (const character of data.characters) {
		deck.cards.characters.push(Cards.list.characters[character]);
	}

	for (const [index, value] of Object.entries(data.actions)) {
		const action = Cards.list.actions[parseInt(index)];
		for (let i = 0; i < value; i++) {
			deck.cards.actions.push(action);
		}
	}

	return deck;
};

type ShareData = {
	version: Version;
	characters: number[];
	actions: {
		[index: string]: number;
	};
};

type Unsure<T> = [error: null, result: T] | [error: string, result: null];
