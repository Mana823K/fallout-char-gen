export class Special {
  static MIN_VALUE = 4;
  static MAX_VALUE = 10;

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

  static map(data: SpecialData): Special {
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

export class SpecialData {
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
}
