import { Special } from "./special";
import { SpecialEnum } from "./special-enum";

export class Perk {
  name: string = "";
  maxRanks: number = 1;
  requirements: PerkRequirement = new PerkRequirement();
  requirementText: string = "";
  description: string = "";

  ranks: number = 0;
  isSelected: boolean = false;
  isAvailable: boolean = true;

  updateAvailability(special: Special, level: number) {
    this.isAvailable = level >= this.requirements.level
                    && special.strength >= this.requirements.str
                    && special.perception >= this.requirements.per
                    && special.endurance >= this.requirements.end
                    && special.charisma >= this.requirements.cha
                    && special.intelligence >= this.requirements.int
                    && special.agility >= this.requirements.agi
                    && special.luck >= this.requirements.lck;
  }

  setRequirementText() {
    var result = [];
    if (this.requirements.str > 0) { result.push(`${SpecialEnum.STR} ${this.requirements.str}`) }
    if (this.requirements.per > 0) { result.push(`${SpecialEnum.PER} ${this.requirements.per}`) }
    if (this.requirements.end > 0) { result.push(`${SpecialEnum.END} ${this.requirements.end}`) }
    if (this.requirements.cha > 0) { result.push(`${SpecialEnum.CHA} ${this.requirements.cha}`) }
    if (this.requirements.int > 0) { result.push(`${SpecialEnum.INT} ${this.requirements.int}`) }
    if (this.requirements.agi > 0) { result.push(`${SpecialEnum.AGI} ${this.requirements.agi}`) }
    if (this.requirements.lck > 0) { result.push(`${SpecialEnum.LCK} ${this.requirements.lck}`) }
    if (this.requirements.level > 0) { result.push(`Level ${this.requirements.level}+`) }
    if (this.requirements.other && this.requirements.other.length > 0) { result.push(this.requirements.other) }

    this.requirementText = result.length > 0 ? result.join(", ") : "None";
  }
}

export class PerkRequirement {
  level: number = 0;
  str: number = 0;
  per: number = 0;
  end: number = 0;
  cha: number = 0;
  int: number = 0;
  agi: number = 0;
  lck: number = 0;
  other?: string;
}

export class PerkData {
  name: string = "";
  ranks: number = 1;
  level: number = 0;
  str: number = 0;
  per: number = 0;
  end: number = 0;
  cha: number = 0;
  int: number = 0;
  agi: number = 0;
  lck: number = 0;
  other?: string;
  desc: string = "";

  static map(original: PerkData): Perk {
    let result = new Perk();

    result.name = original.name;
    result.maxRanks = original.ranks;
    result.requirements.level = original.level;
    result.requirements.str = original.str;
    result.requirements.per = original.per;
    result.requirements.end = original.end;
    result.requirements.cha = original.cha;
    result.requirements.int = original.int;
    result.requirements.agi = original.agi;
    result.requirements.lck = original.lck;
    result.requirements.other = original.other;
    result.description = original.desc;

    result.setRequirementText();

    return result;
  }
}
