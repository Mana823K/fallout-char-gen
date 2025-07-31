export class Armor {
  name: string = "";
  type: string = "";
  physicalRes: number = 0;
  energyRes: number = 0;
  radiationRes: number = 0;
  locationCovered: string[] = [];
  locationCoveredText: string = "";
  weight: number = 0;
  cost:  number = 0;
  rarity: number = 0;
  special?: string;
  mods: string[] = []
}

export class ArmorData {
  name: string = "";
  type: string = "";
  physicalRes: number = 0;
  energyRes: number = 0;
  radiationRes: number = 0;
  locationCovered: string[] = [];
  weight: number = 0;
  cost:  number = 0;
  rarity: number = 0;
  special?: string;
  mods: string[] = []

  static map(original: ArmorData): Armor {
    let result = new Armor();

    result.name = original.name;
    result.type = original.type;
    result.physicalRes = original.physicalRes;
    result.energyRes = original.energyRes;
    result.radiationRes = original.radiationRes;
    result.locationCovered = original.locationCovered;
    result.locationCoveredText = original.locationCovered.join(", ");
    result.weight = original.weight;
    result.cost = original.cost;
    result.rarity = original.rarity;
    result.special = original.special;
    result.mods = original.mods;

    return result;
  }
}
