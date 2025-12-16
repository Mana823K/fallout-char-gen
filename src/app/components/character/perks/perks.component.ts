import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Perk, PerkSaveData } from '../../../models/perk';
import { DataService } from '../../../services/data.service';
import { Special } from '../../../models/special';
import { MatIcon } from '@angular/material/icon';
import { MatTooltip } from '@angular/material/tooltip';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-perks',
  templateUrl: './perks.component.html',
  styleUrl: './perks.component.scss',
  imports: [CommonModule, MatIcon, MatTooltip]
})
export class PerksComponent implements OnInit {
  readonly STORAGE_NAME = "Perks";

  perks: Perk[] = [];
  availablePerks: Perk[] = [];

  @Input() special: Special = new Special();

  private _level: number = 0;
  get level(): number { return this._level; }
  @Input() set level(value: number) {
    this._level = value;
    this.updatePerks();
  }

  @Output() perksChanged = new EventEmitter<Perk[]>();

  get ranksUsed(): number {
    let sum = 0;
    this.perks.forEach(x => { sum += x.ranks; });
    return sum;
  }
  get isLimitReached(): boolean { return this.ranksUsed >= this.level; }

  showAll: boolean = false;
  showDetails: boolean = false;

  constructor(private dataService: DataService) {
    this.perks = this.dataService.perks;

    var storedData = localStorage.getItem(this.STORAGE_NAME);
    var savedPerks = storedData ? JSON.parse(storedData) : [];
    for (let savedPerk of savedPerks) {
      let perk = this.perks.find(x => x.name == savedPerk.name);
      if (perk) {
        perk.ranks = savedPerk.ranks ?? 0;
      }
    }
  }

  ngOnInit(): void {
    this.updatePerks();
    this.perksChanged.emit(this.perks);
  }

  updatePerks() {
    this.perks.forEach(x => {
      x.updateAvailability(this.special, this.level);
      if (!x.isAvailable) {
        x.ranks = 0;
      }
    });
    this.orderPerks();
  }

  onPerksChanged() {
    let saveData: PerkSaveData[] = [];
    for (let perk of this.perks) {
      if (perk.isSelected)
        saveData.push({
          name: perk.name,
          ranks: perk.ranks
        });
    }
    localStorage.setItem(this.STORAGE_NAME, JSON.stringify(saveData));
    this.perksChanged.emit(this.perks);
  }

  perkSelected(perk: Perk) {
    if (!perk.isAvailable || (this.isLimitReached && !perk.isSelected))
      return;

    perk.ranks = perk.isSelected ? 0 : 1;

    this.onPerksChanged();
    this.orderPerks();
  }

  orderPerks() {
    this.perks.sort((a, b) => {
      if (a.isAvailable && !b.isAvailable)
        return -1;
      else if (!a.isAvailable && b.isAvailable)
        return 1;

      if (a.isSelected && !b.isSelected)
        return -1;
      else if (!a.isSelected && b.isSelected)
        return 1;

      return a.name.localeCompare(b.name);
    });

    this.availablePerks = this.perks.filter(x => x.isAvailable);
  }

  addRank(perk: Perk) {
    perk.ranks++;
    this.onPerksChanged();
  }

  removeRank(perk: Perk) {
    perk.ranks--;

    this.onPerksChanged();
    if (perk.ranks == 0) {
      this.orderPerks();
    }
  }

  isAddRankDisabled(perk: Perk): boolean {
    return perk.ranks == perk.maxRanks || this.level < perk.requirements.level + perk.levelSteps * perk.ranks || this.isLimitReached;
  }
}
