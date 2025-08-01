export class Consumable {
  name: string = "";
  type: string = "";
  heal: number = 0;
  effects: string = "";
  irradiated: boolean = false;
  weight: number = 0;
  cost:  number = 0;
  rarity: number = 0;
  notes?: string;
}

export class ConsumableData {
  name: string = "";
  type: string = "";
  heal: number = 0;
  effects: string = "";
  irradiated: boolean = false;
  weight: number = 0;
  cost:  number = 0;
  rarity: number = 0;
  notes?: string;

  static map(original: ConsumableData): Consumable {
    let result = new Consumable();

    result.name = original.name;
    result.type = original.type;
    result.heal = original.heal;
    result.effects = original.effects;
    result.irradiated = original.irradiated;
    result.weight = original.weight;
    result.cost = original.cost;
    result.rarity = original.rarity;
    result.notes = original.notes;

    return result;
  }
}
