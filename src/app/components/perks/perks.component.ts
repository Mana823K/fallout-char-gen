import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Perk } from '../../models/perk';
import { DataService } from '../../services/data.service';
import { Special } from '../../models/special';

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
    if (!perk.isAvailable || (this.selectedCount > this.level && !perk.isSelected))
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

  getRequirementsText(perk: Perk): string {
    var result = [];

    if (perk.requiredSpecial.length > 0) {
      result.push(perk.requiredSpecial.map(x => `${x.specialName} ${x.points}`));
    }

    if (perk.requiredLevel > 0) {
      result.push(`Level ${perk.requiredLevel}+`);
    }

    return result.length > 0 ? result.join(", ") : "None";
  }
}
