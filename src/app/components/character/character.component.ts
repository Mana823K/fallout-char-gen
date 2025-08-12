import { Component, ViewChild } from '@angular/core';
import { Special } from '../../models/special';
import { StatsComponent } from './stats/stats.component';
import { PerksComponent } from './perks/perks.component';
import { Perk } from '../../models/perk';

@Component({
  selector: 'app-character',
  standalone: false,
  templateUrl: './character.component.html',
  styleUrl: './character.component.scss'
})
export class CharacterComponent {
  readonly LEVEL_STORAGE_NAME = "Level";
  @ViewChild('statsComponent') statsComponent?: StatsComponent;
  @ViewChild('perksComponent') perksComponent?: PerksComponent;

  special: Special = new Special();
  level: number = 0;

  extraSpecialPoints: number = 0;
  extraSkillTags: number = 0;
  extraSkillLevels: number = 0;

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
  }
}
