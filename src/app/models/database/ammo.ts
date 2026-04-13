export class Ammo {
  name: string = "";
  subType?: string;
  quantityFound: number = 0;
  quantityRolled: number = 0;
  weight: number = 0;
  cost:  number = 0;
  rarity: number = 0;
  notes: string = "";

  static getQuantityText(ammo: AmmoData): string {
    let result: string[] = [];

    if (ammo.quantityFound > 0) result.push(ammo.quantityFound.toString());
    if (ammo.quantityRolled > 0) result.push(ammo.quantityRolled + " CD");

    return result.join(" + ");
  }
}

export class AmmoData {
  name: string = "";
  subType?: string;
  quantityFound: number = 0;
  quantityRolled: number = 0;
  weight: number = 0;
  cost:  number = 0;
  rarity: number = 0;
  notes: string = "";

  static map(original: AmmoData): Ammo {
    let result = new Ammo();

    result.name = original.name;
    result.subType = original.subType;
    result.quantityFound = original.quantityFound;
    result.quantityRolled = original.quantityRolled;
    result.weight = original.weight;
    result.cost = original.cost;
    result.rarity = original.rarity;
    result.notes = original.notes;

    return result;
  }
}
