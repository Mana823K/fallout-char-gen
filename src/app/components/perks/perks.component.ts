import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Perk, PerkRequirement } from '../../models/perk';
import { DataService } from '../../services/data.service';
import { Special } from '../../models/special';
import { SpecialEnum } from '../../models/special-enum';

@Component({
  selector: 'app-perks',
  standalone: false,
  templateUrl: './perks.component.html',
  styleUrl: './perks.component.scss'
})
export class PerksComponent implements OnInit {
  readonly STORAGE_NAME = "Perks";

  perks: Perk[] = [];
  @Input() special: Special = new Special();
  @Input() level: number = 0;

  @Output() perksChanged = new EventEmitter<Perk[]>();

  get selectedCount(): number { return this.perks.filter(x => x.isSelected).length; }

  constructor(private dataService: DataService) {
    this.perks = this.dataService.perks;

    var storedData = localStorage.getItem(this.STORAGE_NAME);
    var selectedNames: string[] = storedData?.split(";") ?? [];
    this.perks.forEach(x => {
      x.isSelected = selectedNames.includes(x.name);
    });
  }

  ngOnInit(): void {
    this.perks.forEach(x => {
      x.updateAvailability(this.special, this.level);
    });

    this.orderPerks();
    this.perksChanged.emit(this.perks);
  }

  updatePerks() {
    this.perks.forEach(x => x.updateAvailability(this.special, this.level));
    this.orderPerks();
  }

  onPerksChanged() {
    localStorage.setItem(this.STORAGE_NAME, this.perks.flatMap(x => x.isSelected ? x.name : []).join(";"));
    this.perksChanged.emit(this.perks);
  }

  perkSelected(perk: Perk) {
    if (!perk.isAvailable || (this.selectedCount >= this.level && !perk.isSelected))
      return;

    perk.isSelected = !perk.isSelected;

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
  }

  getRequirementsText(requirements: PerkRequirement): string {
    var result = [];

    if (requirements.str > 0) {
      result.push(`${SpecialEnum.STR} ${requirements.str}`)
    }
    if (requirements.per > 0) {
      result.push(`${SpecialEnum.PER} ${requirements.per}`)
    }
    if (requirements.end > 0) {
      result.push(`${SpecialEnum.END} ${requirements.end}`)
    }
    if (requirements.cha > 0) {
      result.push(`${SpecialEnum.CHA} ${requirements.cha}`)
    }
    if (requirements.int > 0) {
      result.push(`${SpecialEnum.INT} ${requirements.int}`)
    }
    if (requirements.agi > 0) {
      result.push(`${SpecialEnum.AGI} ${requirements.agi}`)
    }
    if (requirements.lck > 0) {
      result.push(`${SpecialEnum.LCK} ${requirements.lck}`)
    }
    if (requirements.other && requirements.other.length > 0) {
      result.push(requirements.other)
    }
    if (requirements.level > 0) {
      result.push(`Level ${requirements.level}+`)
    }

    return result.length > 0 ? result.join(", ") : "None";
  }
}
