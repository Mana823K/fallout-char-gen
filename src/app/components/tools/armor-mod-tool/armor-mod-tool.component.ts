import { Component } from '@angular/core';
import { Armor } from '../../../models/database/armor';
import { DataService } from '../../../services/data.service';
import { InventoryService } from '../../../services/inventory.service';
import { InventoryItem } from '../../../models/inventory/inventory';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ArmorMod } from '../../../models/database/armor-mod';
import * as _ from 'lodash';
import { CommonModule } from '@angular/common';
import { InputComponent } from '../../form/input/input.component';
import { SelectComponent } from '../../form/select/select.component';

@Component({
  selector: 'app-armor-mod-tool',
  templateUrl: './armor-mod-tool.component.html',
  styleUrl: './armor-mod-tool.component.scss',
  imports: [CommonModule, InputComponent, SelectComponent]
})
export class ArmorModToolComponent {
  get armors(): Armor[] { return this.dataService.armor.filter(x => x.mods.length > 0); }
  get armorMods(): ArmorMod[] { return this.dataService.armorMods; }

  selectedArmor?: Armor;
  selectedArmorOriginal?: Armor;
  selectedMod?: ArmorMod;

  armorOptions: Armor[] = [];
  armorTypeOptions: string[] = [""];
  armorNameFilter: string = "";
  armorTypeFilter: string = "";

  modOptions: ArmorMod[] = [];
  modTypeOptions: string[] = [];
  modNameFilter: string = "";
  modTypeFilter: string = "";
  modEffectFilter: string = "";

  constructor(private dataService: DataService, private inventoryService: InventoryService, private snackBar: MatSnackBar) {
    this.armorOptions = this.armors;
    for (let armor of this.armors) {
      if (!this.armorTypeOptions.includes(armor.type))
        this.armorTypeOptions.push(armor.type);
    }
  }

  armorSelected(armor: Armor) {
    this.selectedArmor = _.cloneDeep(armor);
    this.selectedArmorOriginal = armor;
    window.scroll({ top: 0 });
    this.filterMods();
    this.modTypeOptions = [""];
    for (let mod of this.modOptions) {
      if (!this.modTypeOptions.includes(mod.type))
        this.modTypeOptions.push(mod.type)
    }
  }

  unselectArmor() {
    this.selectedArmor = undefined;
    this.selectedArmorOriginal = undefined;
    this.selectedMod = undefined;
  }

  filterArmors() {
    let result = this.armors;

    if (this.armorNameFilter.length > 0)
      result = result.filter(x => x.name.toLowerCase().includes(this.armorNameFilter.toLowerCase()));
    if (this.armorTypeFilter.length > 0)
      result = result.filter(x => x.type == this.armorTypeFilter);

    this.armorOptions = result;
  }

  filterMods() {
    let result = this.armorMods.filter(x => this.selectedArmor?.mods.includes(x.type));
    if (this.modNameFilter.length > 0)
      result = result.filter(x => x.name.toLowerCase().includes(this.modNameFilter.toLowerCase()));
    if (this.modTypeFilter.length > 0)
      result = result.filter(x => x.type == this.modTypeFilter);
    if (this.modEffectFilter.length > 0)
      result = result.filter(x => (x.effects ?? "").toLowerCase().includes(this.modEffectFilter.toLowerCase()));
    this.modOptions = result.sort((a, b) => a.type > b.type ? 1 : a.type == b.type ? (a.name > b.name ? 1 : -1) : -1);
  }

  modSelected(mod: ArmorMod) {
    if (this.isModSelected(mod)) {
      this.removeMod();
      return;
    }

    this.selectedMod = mod;
    this.applyMods();
  }

  applyMods() {
    if (!this.selectedArmor || !this.selectedArmorOriginal) return;

    this.selectedArmor = _.cloneDeep(this.selectedArmorOriginal);

    let mod = this.selectedMod;
    if (mod) {
      this.selectedArmor.physicalRes += mod.physicalRes;
      this.selectedArmor.energyRes += mod.energyRes;
      this.selectedArmor.radiationRes += mod.radiationRes;

      if (mod.effects) {
        if (this.selectedArmor.special)
          this.selectedArmor.special += "; " + mod.effects;
        else
          this.selectedArmor.special = mod.effects;
      }

      this.selectedArmor.weight += mod.weight;
      this.selectedArmor.cost += mod.cost;
    }

    this.selectedArmor.updateTexts();
  }

  removeMod() {
    this.selectedMod = undefined;
    this.applyMods();
  }

  isModSelected(mod: ArmorMod): boolean {
    return this.selectedMod?.name == mod.name && this.selectedMod?.type == mod.type;
  }

  addToInventory() {
    if (!this.selectedArmor) return;

    let item = new InventoryItem<Armor>(_.cloneDeep(this.selectedArmor));
    item.isCustom = true;
    this.inventoryService.inventory.armor.push(item);
    this.inventoryService.save();

    this.snackBar.open(`Added "${this.selectedArmor.name}" to inventory.`, undefined, { duration: 2000 });
  }
}
