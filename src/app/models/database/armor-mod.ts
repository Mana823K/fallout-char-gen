export class ArmorMod {
  name: string = "";
  type: string = "";
  physicalRes: number = 0;
  energyRes: number = 0;
  radiationRes: number = 0;
  effects?: string;
  weight: number = 0;
  cost:  number = 0;
  perks: string[] = [];
}

export class ArmorModData {
  name: string = "";
  type: string = "";
  physicalRes: number = 0;
  energyRes: number = 0;
  radiationRes: number = 0;
  effects?: string;
  weight: number = 0;
  cost:  number = 0;
  perks: string[] = [];

  static map(original: ArmorModData): ArmorMod {
    let result = new ArmorMod();

    result.name = original.name;
    result.type = original.type;
    result.physicalRes = original.physicalRes;
    result.energyRes = original.energyRes;
    result.radiationRes = original.radiationRes;
    result.effects = original.effects;
    result.weight = original.weight;
    result.cost = original.cost;
    result.perks = original.perks;

    return result;
  }
}
