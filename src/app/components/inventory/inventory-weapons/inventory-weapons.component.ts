import { AfterViewInit, Component, TemplateRef, ViewChild } from '@angular/core';
import { TableComponent } from '../../common/table/table.component';
import { MatTooltip } from '@angular/material/tooltip';
import { InventoryItem } from '../../../models/inventory/inventory';
import { Weapon } from '../../../models/database/weapon';
import { InventoryService } from '../../../services/inventory.service';
import { TooltipTypeEnum } from '../../../models/database/tooltip';
import { DataService } from '../../../services/data.service';
import { invWeaponColumns } from './weapon-columns';
import { invWeaponSelectColumns } from './weapon-select-columns';
import { TableColumn } from '../../common/table/table-column';
import { Ammo } from '../../../models/database/ammo';
import { CommonModule } from '@angular/common';
import { invAmmoColumns } from './ammo-columns';
import { invAmmoSelectColumns } from './ammo-select-columns';
import { AmountCellComponent } from "../../common/amount-cell/amount-cell.component";
import { InputComponent } from "../../form/input/input.component";
import { NumberInputComponent } from "../../form/number-input/number-input.component";
import { SelectComponent } from "../../form/select/select.component";
import { ranges } from '../../../models/database/range';

@Component({
  selector: 'app-inventory-weapons',
  imports: [TableComponent, MatTooltip, CommonModule, AmountCellComponent, InputComponent, NumberInputComponent, SelectComponent],
  templateUrl: './inventory-weapons.component.html',
  styleUrl: './inventory-weapons.component.scss'
})
export class InventoryWeaponsComponent implements AfterViewInit {
  showAmmoTable: boolean = false;
  get ammo(): InventoryItem<Ammo>[] { return this.inventoryService.inventory.ammo; }
  set ammo(value: InventoryItem<Ammo>[]) { this.inventoryService.inventory.ammo = value; }
  get ammoOptions(): Ammo[] { return this.dataService.ammo; }
  
  ammoTableColumns: TableColumn<InventoryItem<Ammo>>[] = invAmmoColumns;
  ammoSelectTableColumns: TableColumn<Ammo>[] = invAmmoSelectColumns;
  isSelectAmmo: boolean = false;
  @ViewChild('ammoAmount') ammoAmountTemplate?: TemplateRef<any>;
  @ViewChild('ammoTable') ammoTable?: TableComponent<InventoryItem<Ammo>>;
  
  TooltipTypeEnum = TooltipTypeEnum;
  get weapons(): InventoryItem<Weapon>[] { return this.inventoryService.inventory.weapons; }
  set weapons(value: InventoryItem<Weapon>[]) { this.inventoryService.inventory.weapons = value; }
  get weaponOptions(): Weapon[] { return this.dataService.weapons; }

  weaponTableColumns: TableColumn<InventoryItem<Weapon>>[] = invWeaponColumns;
  weaponSelectTableColumns: TableColumn<Weapon>[] = invWeaponSelectColumns;
  weaponSortProperties = ["type", "name"];
  
  @ViewChild('weaponAmount') weaponAmountTemplate?: TemplateRef<any>;
  @ViewChild('effects') effectsTemplate?: TemplateRef<any>;
  @ViewChild('qualities') qualitiesTemplate?: TemplateRef<any>;
  @ViewChild('ammoCount') ammoCountTemplate?: TemplateRef<any>;
  @ViewChild('weaponTable') weaponTable?: TableComponent<InventoryItem<Weapon>>;

  isSelectWeapon: boolean = false;
  isAddWeapon: boolean = false;
  newWeapon = new InventoryItem<Weapon>(new Weapon());

  get weaponTypes(): string[] { return this.dataService.weaponTypes; }
  get weaponEffects(): string[] { return this.dataService.weaponEffects.filter(x => !this.newWeapon.item.effects.includes(x)); }
  get weaponQualities(): string[] { return this.dataService.weaponQualities.filter(x => !this.newWeapon.item.qualities.includes(x)); }
  get damageTypes(): string[] { return this.dataService.damageTypes; }
  ranges = ranges.map(x => x.name);
  _ammoTypes: string[];
  get ammoTypes(): string[] { return this._ammoTypes.filter(x => !this.newWeapon.item.ammo.includes(x)); }

  constructor(private inventoryService: InventoryService, private dataService: DataService) {
    this._ammoTypes = [...new Set([...this.dataService.ammo.map(x => x.name)])];
  }

  ngAfterViewInit(): void {
    let amountColumnAmmo = this.ammoTableColumns.find(x => x.property == "amount");
    if (amountColumnAmmo)
      amountColumnAmmo.template = this.ammoAmountTemplate;
    let amountColumnWeapon = this.weaponTableColumns.find(x => x.property == "amount");
    if (amountColumnWeapon)
      amountColumnWeapon.template = this.weaponAmountTemplate;

    let effectsColumn = this.weaponTableColumns.find(x => x.property == "item.effects");
    if (effectsColumn)
      effectsColumn.template = this.effectsTemplate;
    
    let qualitiesColumn = this.weaponTableColumns.find(x => x.property == "item.qualities");
    if (qualitiesColumn)
      qualitiesColumn.template = this.qualitiesTemplate;

    let ammoCountColumn = this.weaponTableColumns.find(x => x.property == "ammoCount");
    if (ammoCountColumn)
      ammoCountColumn.template = this.ammoCountTemplate;
  }

  getTooltip(effect: string, type: TooltipTypeEnum): string {
    let tooltips = this.dataService.tooltips.filter(x => x.type == type);
    return tooltips.find(x => x.name == effect.replace(/\s\([0-9]+\)/gm, "").replace(/\s[0-9]+/gm, ""))?.description ?? "";
  }

  getAmmoCount(weapon: Weapon) {
    let result = [];
    for (let ammoType of weapon.ammo) {
      let count = 0
      this.ammo.filter(x => x.item.name == ammoType).forEach(x => count += x.amount);
      result.push(count);
    }
    return result.length > 0 ? result.join(" + ") : "0";
  }
  
  selectAmmo(ammo: Ammo) {
    let existingItem = this.ammo.find(x => x.item.name == ammo.name && x.item.subType == ammo.subType);
    if (existingItem) {
      existingItem.amount++;
    }
    else {
      let newItem = new InventoryItem<Ammo>(ammo);
      this.ammo.push(newItem);
      this.ammoTable?.renderRows();
    }
    this.isSelectAmmo = false;
    this.save();
  }

  selectWeapon(weapon: Weapon) {
    let existingItem = this.weapons.find(x => x.item.name == weapon.name);
    if (existingItem) {
      existingItem.amount++;
    }
    else {
      let newItem = new InventoryItem<Weapon>(weapon);
      this.weapons.push(newItem);
      this.weaponTable?.renderRows();
    }
    this.isSelectWeapon = false;
    this.save();
  }

  removeAmmo(item: InventoryItem<Ammo>) {
    this.ammo = this.ammo.filter(x => x.item.name != item.item.name);
    this.ammoTable?.renderRows();
  }

  removeWeapon(item: InventoryItem<Weapon>) {
    this.weapons = this.weapons.filter(x => x.item.name != item.item.name);
    this.weaponTable?.renderRows();
  }

  addCustomWeapon() {
    this.newWeapon.isCustom = true;
    this.weapons.push(this.newWeapon);
    this.weaponTable?.renderRows();
    this.save();
    this.cancelAddWeapon();
  }

  addProperty(value: string, property: "Effect" | "Quality" | "Ammo") {
    switch (property) {
      case "Effect":
        this.newWeapon.item.effects.push(value);
        break;
      case "Quality":
        this.newWeapon.item.qualities.push(value);
        break;
      case "Ammo":
        this.newWeapon.item.ammo.push(value);
        break;
      default:
        break;
    }
  }

  removeProperty(value: string, property: "Effect" | "Quality" | "Ammo") {
    switch (property) {
      case "Effect":
        this.newWeapon.item.effects = this.newWeapon.item.effects.filter(x => x != value);
        break;
      case "Quality":
        this.newWeapon.item.qualities = this.newWeapon.item.qualities.filter(x => x != value);
        break;
      case "Ammo":
        this.newWeapon.item.ammo = this.newWeapon.item.ammo.filter(x => x != value);
        break;
      default:
        break;
    }
  }

  cancelAddWeapon() {
    if (this.isAddWeapon)
      this.newWeapon = new InventoryItem<Weapon>(new Weapon());
    this.isSelectWeapon = false;
    this.isAddWeapon = false;
  }

  save() {
    this.inventoryService.save();
  }
}
