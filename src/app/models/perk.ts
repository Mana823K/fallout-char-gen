import { Special } from "./special";

export class Perk {
  name: string = "";
  maxRanks: number = 1;
  requiredLevel: number = 0;
  requiredSpecial: PerkRequirement[] = [];
  description: string = "";

  ranks: number = 0;
  isSelected: boolean = false;
  isAvailable: boolean = false;

  updateAvailability(special: Special) {
    this.isAvailable = true;
  }
}

export class PerkRequirement {
  specialName: string = "";
  points: number = 0;
}

export class PerkData {
  name: string = "";
  maxRanks: number = 1;
  requiredLevel: number = 0;
  requiredSpecial: PerkRequirement[] = [];
  description: string = "";

  static map(original: PerkData): Perk {
    let result = new Perk();

    result.name = original.name;
    result.maxRanks = original.maxRanks;
    result.requiredLevel = original.requiredLevel;
    result.requiredSpecial = original.requiredSpecial;
    result.description = original.description;

    return result;
  }
}
