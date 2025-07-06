export class Weapon {
  name: string = "";
  skill: string = "";
  damage: number = 0;
  effects: string[] = [];
  type: string = "";
  rate: number = 0;
  range: string = "";
  qualities: string[] = [];
  ammo: string = "";
  weight: number = 0;
  cost: number = 0;
  rarity: number = 0;
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
  ammo: string = "";
  weight: number = 0;
  cost: number = 0;
  rarity: number = 0;

  static map(original: WeaponData): Weapon {
    let result = new Weapon();

    result.name = original.name;
    result.skill = original.skill;
    result.damage = original.damage;
    result.effects = original.effects;
    result.type = original.type;
    result.rate = original.rate;
    result.range = original.range;
    result.qualities = original.qualities;
    result.ammo = original.ammo;
    result.weight = original.weight;
    result.cost = original.cost;
    result.rarity = original.rarity;

    return result;
  }
}
