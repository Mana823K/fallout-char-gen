export class Weapon {
  name: string = "";
  type: string = "";
  damage: number = 0;
  effects: string[] = [];
  effectsText: string = "";
  damageType: string = "";
  rate: number = 0;
  range: string = "";
  qualities: string[] = [];
  qualitiesText: string = "";
  ammo: string[] = [];
  ammoText: string = "";
  weight: number = 0;
  cost: number = 0;
  rarity: number = 0;
  special?: string;
  mods: string[] = [];
  modNotes?: string;

  updateTexts() {
    this.effectsText = this.effects.join(", ");
    this.qualitiesText = this.qualities.join(", ");
    this.ammoText = this.ammo.join(", ");
  }
}

export class WeaponData {
  name: string = "";
  type: string = "";
  damage: number = 0;
  effects: string[] = [];
  damageType: string = "";
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
    result.type = original.type;
    result.damage = original.damage;
    result.effects = original.effects;
    result.damageType = original.damageType;
    result.rate = original.rate;
    result.range = original.range;
    result.qualities = original.qualities;
    result.ammo = original.ammo;
    result.weight = original.weight;
    result.cost = original.cost;
    result.rarity = original.rarity;
    result.special = original.special;
    result.mods = original.mods;
    result.modNotes = original.modNotes;

    result.updateTexts();
    
    return result;
  }
}
