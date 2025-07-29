export class Weapon {
  name: string = "";
  skill: string = "";
  damage: number = 0;
  effects: string[] = [];
  effectsText: string = "";
  type: string = "";
  rate: number = 0;
  range: string = "";
  qualities: string[] = [];
  qualitiesText: string = "";
  ammo: string[] = [];
  weight: number = 0;
  cost: number = 0;
  rarity: number = 0;
  special?: string;
  mods: string[] = [];
  modNotes?: string
}

export class WeaponData {
  name: string = "";
  skill: string = "";
  damage: number = 0;
  effects: string[] = [];
  type: string = "";
  rate: number = 0;
  range: string = "";
  qualities: string[] = [];
  ammo: string[] = [];
  weight: number = 0;
  cost: number = 0;
  rarity: number = 0;
  special?: string;
  mods: string[] = [];
  modNotes?: string

  static map(original: WeaponData): Weapon {
    let result = new Weapon();

    result.name = original.name;
    result.skill = original.skill;
    result.damage = original.damage;
    result.effects = original.effects;
    result.effectsText = original.effects.join(", ");
    result.type = original.type;
    result.rate = original.rate;
    result.range = original.range;
    result.qualities = original.qualities;
    result.qualitiesText = original.qualities.join(", ");
    result.ammo = original.ammo;
    result.weight = original.weight;
    result.cost = original.cost;
    result.rarity = original.rarity;
    result.special = original.special;
    result.mods = original.mods;
    result.modNotes = original.modNotes;

    return result;
  }
}
