import { Special } from "./special";
import { SpecialAbbreviationEnum } from "./special-abbreviation-enum";

export class Perk {
  name: string = "";
  maxRanks: number = 1;
  requiredLevel: number = 0;
  requiredSpecial: PerkRequirement[] = [];
  description: string = "";

  ranks: number = 0;
  isSelected: boolean = false;
  isAvailable: boolean = true;

  updateAvailability(special: Special, level: number) {
    if (level < this.requiredLevel) {
      this.isAvailable = false;
      return;
    }

    for (let req of this.requiredSpecial) {
      if (this.name == "Armorer")
        console.log(req, special)
      switch (req.specialName) {
        case SpecialAbbreviationEnum.STR:
          this.isAvailable = special.strength >= req.points;
          break;
        case SpecialAbbreviationEnum.PER:
          this.isAvailable = special.perception >= req.points;
          break;
        case SpecialAbbreviationEnum.END:
          this.isAvailable = special.endurance >= req.points;
          break;
        case SpecialAbbreviationEnum.CHA:
          this.isAvailable = special.charisma >= req.points;
          break;
        case SpecialAbbreviationEnum.INT:
          this.isAvailable = special.intelligence >= req.points;
          break;
        case SpecialAbbreviationEnum.AGI:
          this.isAvailable = special.agility >= req.points;
          break;
        case SpecialAbbreviationEnum.LCK:
          this.isAvailable = special.luck >= req.points;
          break;
      }
    }
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
