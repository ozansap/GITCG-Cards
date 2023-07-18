import cards from '../cards.json';

export class Cards {
	static version = cards.latest as Version;
	static list: CardsList = cards[Cards.version] as CardsList;
}

export type CardsList = {
	character: CharacterCard[];
	action: ActionCard[];
};

export type CharacterCard = {
	id: number;
	name: string;
	element_type: number;
	role_skill_infos: CharacterSkillInfo[];
	weapon: string;
	belongs: CharacterFaction[];
	hp: string;
	resource: string;
};

export type CharacterSkillInfo = {
	skill_text: string;
	skill_costs: CharacterSkillCost[];
	type: CharacterSkillType[];
	resource: string;
	name: string;
	id: string;
};

export type CharacterSkillCost = {
	cost_type: string;
	icon: string;
	cost_num: string;
};

export type ActionCard = {
	id: number;
	name: string;
	content: string;
	action_type: ActionType;
	rank_id: number;
	cost_num1: string;
	cost_type1_icon: string;
	cost_num2: string;
	cost_type2_icon: string;
	action_card_tags: ActionCardTag[];
	resource: string;
};

type CharacterFaction = '' | 'Fatui' | 'Hilichurl' | 'Inazuma' | 'Liyue' | 'Mondstadt' | 'Monster' | 'Sumeru';

type CharacterSkillType = 'Elemental Burst' | 'Elemental Skill' | 'Normal Attack' | 'Passive Skill';

type ActionCardTag = '' | 'Artifact' | 'Bow' | 'Catalyst' | 'Claymore' | 'Combat Action' | 'Companion' | 'Elemental Resonance' | 'Food' | 'Item' | 'Location' | 'Polearm' | 'Sword' | 'Talent' | 'Weapon';

type ActionType = 'Equipment Cards' | 'Event Cards' | 'Support Cards';

export type CardType = 'character' | 'action';

export type AnyCard = CharacterCard | ActionCard;

type Version = Exclude<keyof typeof cards, 'latest'>;

export type CardTypes = {
	character: CharacterCard;
	action: ActionCard;
};
