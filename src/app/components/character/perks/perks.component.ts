import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Perk } from '../../../models/perk';
import { DataService } from '../../../services/data.service';
import { Special } from '../../../models/special';

@Component({
  selector: 'app-perks',
  standalone: false,
  templateUrl: './perks.component.html',
  styleUrl: './perks.component.scss'
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

  get selectedCount(): number { return this.perks.filter(x => x.isSelected).length; }

  showAll: boolean = false;
  showDetails: boolean = false;

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
    this.perks.forEach(x => {
      x.updateAvailability(this.special, this.level);
      x.isSelected = x.isAvailable ? x.isSelected : false;
    });
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

  this.availablePerks = this.perks.filter(x => x.isAvailable);
  }
}
