import { BehaviorSubject } from "rxjs";

export class Special {
  strength: number = 4;
  perception: number = 4;
  endurance: number = 4;
  charisma: number = 4;
  intelligence: number = 4;
  agility: number = 4;
  luck: number = 4;

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
  strength: number = 4;
  perception: number = 4;
  endurance: number = 4;
  charisma: number = 4;
  intelligence: number = 4;
  agility: number = 4;
  luck: number = 4;

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
