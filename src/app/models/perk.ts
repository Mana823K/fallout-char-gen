import { Special } from "./special";

export class Perk {
  name: string = "";
  maxRanks: number = 1;
  requirements: PerkRequirement = new PerkRequirement();
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

    return result;
  }
}
