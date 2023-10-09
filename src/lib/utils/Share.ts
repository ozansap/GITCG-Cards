import { Cards, type Version } from '$lib/utils/Cards';
import type { Deck } from './stores';
import { convertBase } from 'simple-base-converter';

const chars = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz';

// prettier-ignore
const b = {			// bit counts
	v: 8, 				// version
	c: 8, 				// character index
	d: 5, 				// doubles count
	a: 11, 				// action index
};

export const encode = (deck: Deck): string => {
	const data = toShareData(deck);
	const binary = '1' + Encode.header(data.version) + Encode.characters(data.characters) + Encode.actions(data.actions);
	return convertBase(binary, 2, chars);
};

export const decode = (code: string): Maybe<Deck> => {
	try {
		const binary = convertBase(code, chars, 2).slice(1);
		const version = Decode.header(binary.slice(0, b['v']));
		const characters = Decode.characters(binary.slice(b['v'], b['v'] + b['c'] * 3));
		const actions = Decode.actions(binary.slice(b['v'] + b['c'] * 3));
		console.log({ version, characters, actions });
		return {
			result: fromShareData({ version, characters, actions }),
			error: null
		};
	} catch (err: any) {
		return {
			result: null,
			error: err.message
		};
	}
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
		let count = 0;
		let doubles = '';
		let singles = '';

		for (const [index, value] of Object.entries(actions)) {
			const action = parseInt(index).toString(2).padStart(b['a'], '0');
			value === 2 ? ((doubles += action), count++) : (singles += action);
		}

		return count.toString(2).padStart(b['d'], '0') + doubles + singles;
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
		const count = parseInt(binary.slice(0, b['d']), 2);

		for (let i = 0; i < count; i++) {
			const index = parseInt(binary.slice(b['d'] + i * b['a'], b['d'] + (i + 1) * b['a']), 2);
			res[index] = 2;
		}

		for (let i = count; i < Math.floor(binary.length / b['a']); i++) {
			const index = parseInt(binary.slice(b['d'] + i * b['a'], b['d'] + (i + 1) * b['a']), 2);
			res[index] = 1;
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

type Maybe<T> = { error: null; result: T } | { error: string; result: null };
