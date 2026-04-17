import { Injectable } from "@angular/core";
import { DataService } from "./data.service";
import { Inventory, InventoryItem, InventoryItemData, InventorySaveData } from "../models/inventory/inventory";
import _ from "lodash";

@Injectable({
  providedIn: "root"
})
export class InventoryService {
  inventory = new Inventory();

  constructor(private dataService: DataService) { }

  init() {
    const storedData = localStorage.getItem(Inventory.STORAGE_NAME)
    if (storedData) {
      let saveData: InventorySaveData = JSON.parse(storedData);
      this.inventory.weapons = saveData.weapons.flatMap(x => this.initItem(x, this.dataService.weapons, y => y.name));
      this.inventory.ammo = saveData.ammo.flatMap(x => this.initItem(x, this.dataService.ammo, y => y.name));
      this.inventory.armor = saveData.armor.flatMap(x => this.initItem(x, this.dataService.armor, y => y.name));
      this.inventory.consumables = saveData.consumables.flatMap(x => this.initItem(x, this.dataService.consumables, y => y.name));
      this.inventory.chems = saveData.chems.flatMap(x => this.initItem(x, this.dataService.chems, y => y.name));
      this.inventory.magazines = saveData.magazines.flatMap(x => this.initItem(x, this.dataService.magazines, y => y.name));
      this.inventory.misc = saveData.misc.flatMap(x => this.initItem(x, this.dataService.miscellanyItems, y => y.name));
    }
  }

  initItem<T>(savedItem: InventoryItemData<T>, dataList: T[], nameFunc: (x: T) => string): InventoryItem<T> | [] {
    let result;
    if (savedItem.itemName) {
      let listItem = dataList.find(x => nameFunc(x) == savedItem.itemName);
      if (!listItem) return [];
      result = new InventoryItem<T>(listItem);
    }
    else if (savedItem.item) {
      result = new InventoryItem<T>(savedItem.item);
      result.isCustom = true;
    }
    else {
      return [];
    }
    result.amount = savedItem.amount
    return result;
  }

  save() {
    let saveData = new InventorySaveData(this.inventory);
    localStorage.setItem(Inventory.STORAGE_NAME, JSON.stringify(saveData));
  }

  addItem<T>(item: T, listName: keyof Inventory, matchProperties: (keyof T)[]) {
    let list: any [] = this.inventory[listName];
    let existingItem = list.find(x => {
      for (let property of matchProperties) {
        if (_.get(x.item, property) != item[property])
          return false;
      }
      return true;
    });

    if (existingItem) {
      existingItem.amount++;
    }
    else {
      let newItem = new InventoryItem<T>(item);
      list.push(newItem);
    }
    this.save();
  }

  removeItem<T>(item: InventoryItem<T>, listName: keyof Inventory, matchProperties: (keyof T)[]) {
    let filteredList: any[] = this.inventory[listName].filter(x => {
      for (let property of matchProperties) {
        if (item.item[property] != _.get(x.item, property))
          return true;
      }
      return false;
    })
    this.inventory[listName] = filteredList;
    this.save();
  }
}
