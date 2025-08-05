export class MiscellanyItem {
  name: string = "";
  effects: string = "";
  weight: number = 0;
  cost:  number = 0;
  rarity: number = 0;
}

export class MiscellanyItemData {
  name: string = "";
  effects: string = "";
  weight: number = 0;
  cost:  number = 0;
  rarity: number = 0;

  static map(original: MiscellanyItemData): MiscellanyItem {
    let result = new MiscellanyItem();

    result.name = original.name;
    result.effects = original.effects;
    result.weight = original.weight;
    result.cost = original.cost;
    result.rarity = original.rarity;

    return result;
  }
}
