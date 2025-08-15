import { Component } from '@angular/core';
import { Weapon } from '../../../models/weapon';
import { DataService } from '../../../services/data.service';
import { WeaponMod } from '../../../models/weapon-mod';
import * as _ from 'lodash';

@Component({
  selector: 'app-weapon-mod-tool',
  standalone: false,
  templateUrl: './weapon-mod-tool.component.html',
  styleUrl: './weapon-mod-tool.component.scss'
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
    this.modOptions = result;
  }

  modSelected(mod: WeaponMod) {
    if (this.selectedMods.find(x => x.name == mod.name)) {
      this.removeMod(mod);
      return;
    }
    this.selectedMods = this.selectedMods.filter(x => x.type != mod.type)
    this.selectedMods.push(mod);
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
        if (!this.selectedWeapon.effects.includes(effect))
          this.selectedWeapon.effects.push(effect);
      }
      // todo: piercing 1

      if (mod.removedEffects) {
        this.selectedWeapon.effects = this.selectedWeapon.effects.filter(x => !mod.removedEffects?.includes(x))
      }

      for (let quality of mod.gainedQualities ?? []) {
        if (!this.selectedWeapon.qualities.includes(quality))
          this.selectedWeapon.qualities.push(quality);
      }
      // todo: recoil (x)

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

class Range {
  name: string = "";
  number: number = 0;
}

const ranges: Range[] = [
  { name: "S", number: 1 },
  { name: "M", number: 2 },
  { name: "L", number: 3 },
  { name: "XL", number: 4 },
]
