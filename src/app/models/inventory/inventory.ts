import { Ammo } from "../database/ammo";
import { Armor } from "../database/armor";
import { Chem } from "../database/chem";
import { Consumable } from "../database/consumable";
import { Magazine } from "../database/magazine";
import { MiscellanyItem } from "../database/miscellany-item";
import { Weapon } from "../database/weapon";

export class Inventory {
  static readonly STORAGE_NAME = "InventoryData";

  weapons: InventoryItem<Weapon>[] = [];
  ammo: InventoryItem<Ammo>[] = [];
  armor: InventoryItem<Armor>[] = [];
  consumables: InventoryItem<Consumable>[] = [];
  chems: InventoryItem<Chem>[] = [];
  magazines: InventoryItem<Magazine>[] = [];
  misc: InventoryItem<MiscellanyItem>[] = [];
}

export class InventoryItem<T> {
  item: T;
  amount: number = 1;
  isCustom: boolean = false;
  isEditing: boolean = false;
  isEquipped: boolean = false;
  
  constructor(item: T) {
    this.item = item;
  }
}

export class InventorySaveData {
  weapons: InventoryItemData<Weapon>[] = [];
  ammo: InventoryItemData<Ammo>[] = [];
  armor: InventoryItemData<Armor>[] = [];
  consumables: InventoryItemData<Consumable>[] = [];
  chems: InventoryItemData<Chem>[] = [];
  magazines: InventoryItemData<Magazine>[] = [];
  misc: InventoryItemData<MiscellanyItem>[] = [];

  constructor(original: Inventory) {
    this.weapons = original.weapons.map<InventoryItemData<Weapon>>(item => new InventoryItemData<Weapon>(item, (x) => x.name));
    this.ammo = original.ammo.map<InventoryItemData<Ammo>>(item => new InventoryItemData<Ammo>(item, (x) => x.name));
    this.armor = original.armor.map<InventoryItemData<Armor>>(item => new InventoryItemData<Armor>(item, (x) => x.name));
    this.consumables = original.consumables.map<InventoryItemData<Consumable>>(item => new InventoryItemData<Consumable>(item, (x) => x.name));
    this.chems = original.chems.map<InventoryItemData<Chem>>(item => new InventoryItemData<Chem>(item, (x) => x.name));
    this.magazines = original.magazines.map<InventoryItemData<Magazine>>(item => new InventoryItemData<Magazine>(item, (x) => x.name));
    this.misc = original.misc.map<InventoryItemData<MiscellanyItem>>(item => new InventoryItemData<MiscellanyItem>(item, (x) => x.name));
  }
}

export class InventoryItemData<T> {
  item?: T;
  itemName?: string;
  amount: number;;
  isEquiped: boolean;

  constructor(original: InventoryItem<T>, nameFunc: (x: T) => string) {
    if (original.isCustom) {
      this.item = original.item;
    }
    else {
      this.itemName = nameFunc(original.item);
    }
    this.amount = original.amount;
    this.isEquiped = original.isEquipped;
  }
}
