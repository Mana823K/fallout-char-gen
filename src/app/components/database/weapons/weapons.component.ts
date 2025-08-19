import { Component } from '@angular/core';
import { DataService } from '../../../services/data.service';
import { Weapon } from '../../../models/weapon';
import { ranges } from '../../../models/range';

@Component({
  selector: 'app-weapons',
  standalone: false,
  templateUrl: './weapons.component.html',
  styleUrl: './weapons.component.scss'
})
export class WeaponsComponent {
  weapons: Weapon[] = [];

  nameFilter: string = "";
  typeOptions: string[] = [];
  typeFilter: string = "";
  effectsOptions: string[] = [];
  effectsFilter: string = "";
  damageTypeOptions: string[] = [];
  damageTypeFilter: string = "";
  qualitiesOptions: string[] = [];
  qualitiesFilter: string = "";
  ammoOptions: string[] = [];
  ammoFilter: string = "";

  damageAscending?: boolean;
  fireRateAscending?: boolean;
  rangeAscending?: boolean;
  weightAscending?: boolean;
  costAscending?: boolean;
  rarityAscending?: boolean;

  constructor(private dataService: DataService) {
    this.weapons = this.dataService.weapons;
    this.sort();
    this.setFilterOptions();
  }

  setFilterOptions() {
    this.typeOptions = [""];
    this.damageTypeOptions = [""];
    this.effectsOptions = [""];
    this.qualitiesOptions = [""];
    this.ammoOptions = [""];
    for (let weapon of this.weapons) {
      if (!this.typeOptions.includes(weapon.type)) {
        this.typeOptions.push(weapon.type);
      }

      if (!this.damageTypeOptions.includes(weapon.damageType))
        this.damageTypeOptions.push(weapon.damageType);

      for (let effect of weapon.effects) {
        if (!this.effectsOptions.includes(effect))
          this.effectsOptions.push(effect);
      }

      for (let quality of weapon.qualities) {
        if (!this.qualitiesOptions.includes(quality))
          this.qualitiesOptions.push(quality);
      }

      for (let ammo of weapon.ammo) {
        if (!this.ammoOptions.includes(ammo))
          this.ammoOptions.push(ammo);
      }
    }
  }

  filter() {
    let result = this.dataService.weapons;

    if (this.nameFilter.length > 0) result = result.filter(x => x.name.toLowerCase().includes(this.nameFilter.toLowerCase()));
    if (this.typeFilter.length > 0) result = result.filter(x => x.type == this.typeFilter);
    if (this.effectsFilter.length > 0) result = result.filter(x => x.effects.includes(this.effectsFilter));
    if (this.damageTypeFilter.length > 0) result = result.filter(x => x.damageType == this.damageTypeFilter);
    if (this.qualitiesFilter.length > 0) result = result.filter(x => x.qualities.includes(this.qualitiesFilter));
    if (this.ammoFilter.length > 0) result = result.filter(x => x.ammo.includes(this.ammoFilter));

    this.weapons = result;
    this.setFilterOptions();
  }

  sort() {
    this.weapons.sort((a, b) => a.type == b.type ? (a.name > b.name ? 1 : -1) : a.type > b.type ? 1  : -1);

    if (this.damageAscending != undefined) {
      this.weapons.sort((a, b) => this.damageAscending ? a.damage - b.damage : b.damage - a.damage);
    }
    if (this.fireRateAscending != undefined) {
      this.weapons.sort((a, b) => this.fireRateAscending ? a.rate - b.rate : b.rate - a.rate);
    }
    if (this.rangeAscending != undefined) {
      this.weapons.sort((a, b) => {
        let aRange = ranges.find(x => x.name == a.range);
        let bRange = ranges.find(x => x.name == b.range);
        return this.rangeAscending ? (aRange?.number ?? 0) - (bRange?.number ?? 0) : (bRange?.number ?? 0) - (aRange?.number ?? 0);
      });
    }
    if (this.weightAscending != undefined) {
      this.weapons.sort((a, b) => this.weightAscending ? a.weight - b.weight : b.weight - a.weight);
    }
    if (this.costAscending != undefined) {
      this.weapons.sort((a, b) => this.costAscending ? a.cost - b.cost : b.cost - a.cost);
    }
    if (this.rarityAscending != undefined) {
      this.weapons.sort((a, b) => this.rarityAscending ? a.rarity - b.rarity : b.rarity - a.rarity);
    }
  }
}
