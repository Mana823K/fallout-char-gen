export class Chem {
  name: string = "";
  effects: string = "";
  duration: string = "";
  addictive: number = 0;
  addiction?: string;
  cost:  number = 0;
  rarity: number = 0;
  notes?: string;
}

export class ChemData {
  name: string = "";
  effects: string = "";
  duration: string = "";
  addictive: number = 0;
  addiction?: string;
  cost:  number = 0;
  rarity: number = 0;
  notes?: string;

  static map(original: ChemData): Chem {
    let result = new Chem();

    result.name = original.name;
    result.effects = original.effects;
    result.duration = original.duration;
    result.addictive = original.addictive;
    result.addiction = original.addiction;
    result.cost = original.cost;
    result.rarity = original.rarity;
    result.notes = original.notes;

    return result;
  }
}
