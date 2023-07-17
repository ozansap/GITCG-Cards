import { writable } from 'svelte/store';
import type { ActionCard, AnyCard, CharacterCard } from './Cards';

export class Filters {
	static values: FilterValues = {
		character: [
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
		action: [
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
	};

	static styles: FilterStyles = {
		category: {
			element: {
				grid: 'grid-cols-[1fr_1fr_1fr_1fr_1fr_1fr_1fr]'
			},
			equipment: {
				grid: 'grid-cols-[1fr_1fr_1fr_1fr]'
			},
			support: {
				grid: 'grid-cols-[1fr_1fr_1fr_1fr]'
			},
			event: {
				grid: 'grid-cols-[1fr_2fr_1fr]'
			}
		},
		option: {
			element_cryo: {
				active: '!border-cryo bg-cryo/20'
			},
			element_hydro: {
				active: '!border-hydro bg-hydro/20'
			},
			element_pyro: {
				active: '!border-pyro bg-pyro/20'
			},
			element_electro: {
				active: '!border-electro bg-electro/20'
			},
			element_anemo: {
				active: '!border-anemo bg-anemo/20'
			},
			element_geo: {
				active: '!border-geo bg-geo/20'
			},
			element_dendro: {
				active: '!border-dendro bg-dendro/20'
			},
			equipment_all: {
				active: 'bg-color_primary text-white'
			},
			equipment_talent: {
				active: 'bg-color_primary text-white'
			},
			equipment_weapon: {
				active: 'bg-color_primary text-white'
			},
			equipment_artifact: {
				active: 'bg-color_primary text-white'
			},
			support_all: {
				active: 'bg-color_primary text-white'
			},
			support_location: {
				active: 'bg-color_primary text-white'
			},
			support_companion: {
				active: 'bg-color_primary text-white'
			},
			support_item: {
				active: 'bg-color_primary text-white'
			},
			event_all: {
				active: 'bg-color_primary text-white'
			},
			event_resonance: {
				active: 'bg-color_primary text-white'
			},
			event_food: {
				active: 'bg-color_primary text-white'
			}
		}
	};

	static apply<T extends AnyCard>(cards: T[], filters: FilterValuesCategory<T>[], query: string): T[] {
		const search = (x: T) => x.name.toLowerCase().includes(query.toLowerCase());
		let active: ((x: T) => boolean)[] = [];

		for (const category of filters) {
			for (const option of category.options) {
				if (option.active) active.push(option.filter);
			}
		}

		const filtered = cards.filter((x) => {
			if (!search(x)) return false;

			if (active.length === 0) return true;

			for (const filter of active) {
				if (filter(x)) return true;
			}
		});

		return filtered;
	}
}

export const store_filterValues = writable(Filters.values);

export type FilterValues = {
	character: FilterValuesCategory<CharacterCard>[];
	action: FilterValuesCategory<ActionCard>[];
};

export type FilterValuesCategory<T extends AnyCard> = {
	name: string;
	value: FilterCategories;
	options: FilterValuesOption<T>[];
};

export type FilterValuesOption<T extends AnyCard> = {
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
