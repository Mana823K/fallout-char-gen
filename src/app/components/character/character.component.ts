import { Component, ViewChild } from '@angular/core';
import { Special } from '../../models/special';
import { StatsComponent } from './stats/stats.component';
import { PerksComponent } from './perks/perks.component';
import { Perk } from '../../models/perk';
import { OriginComponent } from './origin/origin.component';
import { NumberInputComponent } from '../form/number-input/number-input.component';
import { SpecialAttributesComponent } from './special-attributes/special-attributes.component';
import { SkillsComponent } from './skills/skills.component';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-character',
  templateUrl: './character.component.html',
  styleUrl: './character.component.scss',
  imports: [CommonModule, OriginComponent, NumberInputComponent, StatsComponent, SpecialAttributesComponent, PerksComponent, SkillsComponent]
})
export class CharacterComponent {
  readonly LEVEL_STORAGE_NAME = "Level";
  @ViewChild('statsComponent') statsComponent?: StatsComponent;
  @ViewChild('perksComponent') perksComponent?: PerksComponent;

  special: Special = new Special();
  level: number = 0;

  extraSpecialPoints: number = 0;
  extraSkillTags: number = 0;
  extraSkillRanks: number = 0;
  hpModifier: number = 1;
  carryWeightModifier: number = 0;

  constructor() {
    var storedLevel = Number.parseInt(localStorage.getItem(this.LEVEL_STORAGE_NAME) ?? "");
    this.level = Number.isNaN(storedLevel) ? 0 : storedLevel;
  }

  onSpecialChanged(special: Special) {
    this.special = special;
    this.statsComponent?.updateStats();
    this.perksComponent?.updatePerks();
  }

  onLevelChanged() {
    localStorage.setItem(this.LEVEL_STORAGE_NAME, this.level.toString());
  }

  onPerksChanged(perks: Perk[]) {
    let specialPerk = perks.find(x => x.name == "INTENSE TRAINING");
    if (specialPerk) {
      this.extraSpecialPoints = specialPerk.ranks;
    }

    let hpPerk = perks.find(x => x.name == "LIFE GIVER");
    if (hpPerk) {
      this.hpModifier = hpPerk.ranks + 1;
    }

    let skillPerk = perks.find(x => x.name == "SKILLED");
    if (skillPerk) {
      this.extraSkillRanks = skillPerk.ranks * 2;
    }

    let carryWeightPerk = perks.find(x => x.name == "STRONG BACK");
    if (carryWeightPerk) {
      this.carryWeightModifier = carryWeightPerk.ranks * 25;
    }

    let tagPerk = perks.find(x => x.name == "TAG!");
    if (tagPerk) {
      this.extraSkillTags = tagPerk.ranks;
    }
  }
}
