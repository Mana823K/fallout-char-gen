import { SpecialEnum } from "./special-enum";

export class Special {
  static MIN_VALUE = 4;
  static MAX_VALUE = 10;
  static MAX_POINTS = 40;

  strength: number = 5;
  perception: number = 5;
  endurance: number = 5;
  charisma: number = 5;
  intelligence: number = 5;
  agility: number = 5;
  luck: number = 5;

  get pointsSum(): number {
    return this.strength + this.perception + this.endurance
    + this.charisma + this.intelligence + this.agility + this.luck;
  }

  getValue(special: SpecialEnum) {
    switch (special) {
      case SpecialEnum.STR:
        return this.strength;
      case SpecialEnum.PER:
        return this.perception;
      case SpecialEnum.END:
        return this.endurance;
      case SpecialEnum.CHA:
        return this.charisma;
      case SpecialEnum.INT:
        return this.intelligence;
      case SpecialEnum.AGI:
        return this.agility;
      case SpecialEnum.LCK:
        return this.luck;
    }
  }
}

export class SpecialSaveData {
  strength: number = 5;
  perception: number = 5;
  endurance: number = 5;
  charisma: number = 5;
  intelligence: number = 5;
  agility: number = 5;
  luck: number = 5;

  constructor(original: Special) {
    return {
      strength: original.strength,
      perception: original.perception,
      endurance: original.endurance,
      charisma: original.charisma,
      intelligence: original.intelligence,
      agility: original.agility,
      luck: original.luck
    }
  }

  static map(data: SpecialSaveData): Special {
    let result = new Special();

    result.strength = data.strength;
    result.perception = data.perception;
    result.endurance = data.endurance;
    result.charisma = data.charisma;
    result.intelligence = data.intelligence;
    result.agility = data.agility;
    result.luck = data.luck;

    return result;
  }
}
