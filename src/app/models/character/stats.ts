import { Special } from "./special";

export class Stats {
  static DEF_CARRY_WEIGHT = 150;

  maxHp: number = 0;
  defense: number = 0;
  carryWeight: number = Stats.DEF_CARRY_WEIGHT;
  meleeBonus: number = 0;
  initiative: number = 0;

  updateStats(special: Special, level: number, hpModifier: number = 1, carryWeightModifier: number = 0) {
    this.carryWeight = Stats.DEF_CARRY_WEIGHT + special.strength * 10 + carryWeightModifier;
    this.initiative = special.perception + special.agility;
    this.defense = special.agility > 0 ? special.agility > 8 ? 2 : 1 : 0;
    this.maxHp = (special.endurance * hpModifier) + special.luck + level;
    this.meleeBonus = special.strength > 6 ? special.strength > 8 ? special.strength > 11 ? 3 : 2 : 1 : 0;
  }
}
