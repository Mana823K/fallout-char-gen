import { Component } from '@angular/core';
import { Weapon } from '../../../models/weapon';
import { DataService } from '../../../services/data.service';
import { WeaponMod } from '../../../models/weapon-mod';
import * as _ from 'lodash';
import { ranges } from '../../../models/range';
import { CommonModule } from '@angular/common';
import { InputComponent } from '../../form/input/input.component';
import { SelectComponent } from '../../form/select/select.component';

@Component({
  selector: 'app-weapon-mod-tool',
  templateUrl: './weapon-mod-tool.component.html',
  styleUrl: './weapon-mod-tool.component.scss',
  imports: [CommonModule, InputComponent, SelectComponent]
})
export class WeaponModToolComponent {
  get weapons(): Weapon[] { return this.dataService.weapons.filter(x => x.mods.length > 0); }
  get weaponMods(): WeaponMod[] { return this.dataService.weaponMods; }

  selectedWeapon?: Weapon;
  selectedWeaponOriginal?: Weapon;
  selectedMods: WeaponMod[] = [];

  weaponOptions: Weapon[] = [];
  weaponTypeOptions: string[] = [""];
  weaponNameFilter: string = "";
  weaponTypeFilter: string = "";

  modOptions: WeaponMod[] = [];
  modTypeOptions: string[] = [];
  modNameFilter: string = "";
  modTypeFilter: string = "";
  modEffectFilter: string = "";

  constructor(private dataService: DataService) {
    this.weaponOptions = this.weapons;
    for (let weapon of this.weapons) {
      if (!this.weaponTypeOptions.includes(weapon.type))
        this.weaponTypeOptions.push(weapon.type);
    }
  }

  weaponSelected(weapon: Weapon) {
    this.selectedWeapon = _.cloneDeep(weapon);
    this.selectedWeaponOriginal = weapon;
    window.scroll({ top: 0 });
    this.filterMods();
    this.modTypeOptions = [""];
    for (let mod of this.modOptions) {
      if (!this.modTypeOptions.includes(mod.type))
        this.modTypeOptions.push(mod.type)
    }
  }

  unselectWeapon() {
    this.selectedWeapon = undefined;
    this.selectedWeaponOriginal = undefined;
    this.selectedMods = [];
  }

  filterWeapons() {
    let result = this.weapons;

    if (this.weaponNameFilter.length > 0)
      result = result.filter(x => x.name.toLowerCase().includes(this.weaponNameFilter.toLowerCase()));
    if (this.weaponTypeFilter.length > 0)
      result = result.filter(x => x.type == this.weaponTypeFilter);

    this.weaponOptions = result;
  }

  filterMods() {
    let result = this.weaponMods.filter(x => x.weaponType == this.selectedWeapon?.type && this.selectedWeapon?.mods.find(m => m == x.name));
    if (this.modNameFilter.length > 0)
      result = result.filter(x => x.name.toLowerCase().includes(this.modNameFilter.toLowerCase()));
    if (this.modTypeFilter.length > 0)
      result = result.filter(x => x.type == this.modTypeFilter);
    if (this.modEffectFilter.length > 0)
      result = result.filter(x => x.effectText.toLowerCase().includes(this.modEffectFilter.toLowerCase()));
    this.modOptions = result.sort((a, b) => a.type > b.type ? 1 : a.type == b.type ? (a.name > b.name ? 1 : -1) : -1);
  }

  modSelected(mod: WeaponMod) {
    if (this.selectedMods.find(x => x.name == mod.name)) {
      this.removeMod(mod);
      return;
    }

    let result = this.selectedMods.filter(x => x.type != mod.type);
    result.push(mod);
    this.selectedMods = result.sort((a, b) => a.type > b.type ? 1 : -1);

    this.applyMods();
  }

  applyMods() {
    if (!this.selectedWeapon || !this.selectedWeaponOriginal) return;

    this.selectedWeapon = _.cloneDeep(this.selectedWeaponOriginal);

    let fixDamage = this.selectedMods.find(x => x.fixDamage != undefined)?.fixDamage;
    if (fixDamage)
      this.selectedWeapon.damage = fixDamage;

    for (let mod of this.selectedMods) {
      if (mod.damageChange) this.selectedWeapon.damage += mod.damageChange;
      if (mod.ammo) this.selectedWeapon.ammo = [mod.ammo];
      if (mod.newDamageType) this.selectedWeapon.damageType = mod.newDamageType;
      if (mod.fireRateChange) this.selectedWeapon.rate += mod.fireRateChange;
      if (mod.rangeChange) {
        let originalNumber = ranges.find(x => x.name == this.selectedWeapon?.range)?.number ?? 0;
        let newRange = ranges.find(x => x.number == originalNumber + (mod.rangeChange ?? 0))?.name;
        this.selectedWeapon.range = newRange ?? this.selectedWeapon.range;
      }
      for (let effect of mod.gainedEffects ?? []) {
        if (effect.startsWith("Piercing")) {
          let existingEffect = this.selectedWeapon.effects.find(x => x.startsWith("Piercing"));
          if (!existingEffect) {
            this.selectedWeapon.effects.push(effect);
          }
          else {
            let value = Number.parseInt(effect.split(" ").pop() ?? "0");
            let existingValue = Number.parseInt(existingEffect.split(" ").pop() ?? "0");
            this.selectedWeapon.effects = this.selectedWeapon.effects.filter(x => !x.startsWith("Piercing"));
            this.selectedWeapon.effects.push("Piercing " + (value + existingValue));
          }
        }
        else if (!this.selectedWeapon.effects.includes(effect))
          this.selectedWeapon.effects.push(effect);
      }

      if (mod.removedEffects) {
        this.selectedWeapon.effects = this.selectedWeapon.effects.filter(x => !mod.removedEffects?.includes(x))
      }

      for (let quality of mod.gainedQualities ?? []) {
        if (quality.startsWith("Recoil")) {
          this.selectedWeapon.qualities = this.selectedWeapon.qualities.filter(x => !x.startsWith("Recoil"));
          this.selectedWeapon.qualities.push(quality);
        }
        else if (!this.selectedWeapon.qualities.includes(quality))
          this.selectedWeapon.qualities.push(quality);

        let accurateIndex = this.selectedWeapon.qualities.findIndex(x => x == "Accurate");
        let inaccurateIndex = this.selectedWeapon.qualities.findIndex(x => x == "Inaccurate");
        if (accurateIndex >= 0 && inaccurateIndex >= 0) {
          this.selectedWeapon.qualities.splice(accurateIndex, 1);
          this.selectedWeapon.qualities.splice(inaccurateIndex, 1);
        }

        let reliableIndex = this.selectedWeapon.qualities.findIndex(x => x == "Reliable");
        let unreliableIndex = this.selectedWeapon.qualities.findIndex(x => x == "Unreliable");
        if (reliableIndex >= 0 && unreliableIndex >= 0) {
          this.selectedWeapon.qualities.splice(reliableIndex, 1);
          this.selectedWeapon.qualities.splice(unreliableIndex, 1);
        }
      }

      if (mod.removedQualities) {
        this.selectedWeapon.qualities = this.selectedWeapon.qualities.filter(x => !mod.removedQualities?.includes(x))
      }

      if (mod.effects) {
        if (this.selectedWeapon.special)
          this.selectedWeapon.special += "; " + mod.effects;
        else
          this.selectedWeapon.special = mod.effects;
      }

      this.selectedWeapon.weight += mod.weightChange;
      this.selectedWeapon.cost += mod.costChange;
    }

    this.selectedWeapon.updateTexts();
  }

  removeMod(mod: WeaponMod) {
    this.selectedMods = this.selectedMods.filter(x => x.name != mod.name);
    this.applyMods();
  }

  isModSelected(mod: WeaponMod): boolean {
    return !!this.selectedMods.find(x => x.name == mod.name);
  }
}
