export class WeaponMod {
  name: string = "";
  prefix: string = "";
  weaponType: string = "";
  type: string = "";
  damageChange?: number;
  fixDamage?: number;
  newDamageType?: string;
  fireRateChange?: number;
  rangeChange?: number;
  gainedEffects?: string[];
  removedEffects?: string[];
  gainedQualities?: string[];
  removedQualities?: string[];
  effects?: string;
  effectText: string = "";
  weightChange: number = 0;
  costChange: number = 0;
  perks: string[] = [];
}

export class WeaponModData {
  name: string = "";
  prefix: string = "";
  weaponType: string = "";
  type: string = "";
  damageChange?: number;
  fixDamage?: number;
  newDamageType?: string;
  fireRateChange?: number;
  rangeChange?: number;
  gainedEffects?: string[];
  removedEffects?: string[];
  gainedQualities?: string[];
  removedQualities?: string[];
  effects?: string;
  weightChange: number = 0;
  costChange: number = 0;
  perks: string[] = [];

  static map(original: WeaponModData): WeaponMod {
    let result = new WeaponMod();

    result.name = original.name;
    result.prefix = original.prefix;
    result.weaponType = original.weaponType;
    result.type = original.type;
    result.damageChange = original.damageChange;
    result.fixDamage = original.fixDamage;
    result.newDamageType = original.newDamageType;
    result.fireRateChange = original.fireRateChange;
    result.rangeChange = original.rangeChange;
    result.gainedEffects = original.gainedEffects;
    result.removedEffects = original.removedEffects;
    result.gainedQualities = original.gainedQualities;
    result.removedQualities = original.removedQualities;
    result.effects = original.effects;
    result.effectText = WeaponModData.getEffectsText(original);
    result.weightChange = original.weightChange;
    result.costChange = original.costChange;
    result.perks = original.perks;

    return result;
  }

  static getEffectsText(mod: WeaponModData): string {
    let result: string[] = [];

    if (mod.damageChange) result.push(`${mod.damageChange > 0 ? '+' : ''}${mod.damageChange} damage`);
    if (mod.fixDamage) result.push(`Change damage to ${mod.fixDamage}`);
    if (mod.newDamageType) result.push(`Change damage type to ${mod.newDamageType}`);
    if (mod.fireRateChange) result.push(`${mod.fireRateChange > 0 ? '+' : ''}${mod.fireRateChange} Fire Rate`);
    if (mod.rangeChange) result.push(`${mod.rangeChange > 0 ? 'Increase' : 'Reduce'} Range by ${Math.abs(mod.rangeChange)} step`);
    if (mod.gainedEffects) result.push(`Gain ${mod.gainedEffects.join(', ')}`);
    if (mod.removedEffects) result.push(`Remove ${mod.removedEffects.join(', ')}`);
    if (mod.gainedQualities) result.push(`Gain ${mod.gainedQualities.join(', ')}`);
    if (mod.removedQualities) result.push(`Remove ${mod.removedQualities.join(', ')}`);
    if (mod.effects) result.push(mod.effects);

    return result.join(", ");
  }
}
