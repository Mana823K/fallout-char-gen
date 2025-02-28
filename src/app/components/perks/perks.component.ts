import { Component } from '@angular/core';
import { CharacterService } from '../../services/character.service';
import { DataService } from '../../services/data.service';
import { Perk } from '../../models/perk';

@Component({
  selector: 'app-perks',
  standalone: false,
  templateUrl: './perks.component.html',
  styleUrl: './perks.component.scss'
})
export class PerksComponent {
  get perks(): Perk[] { return this.characterService.perks; }
  set perks(value: Perk[]) { this.characterService.perks = value; }

  constructor(private characterService: CharacterService) {
    this.orderPerks();
  }

  perkSelected(perk: Perk) {
    if (!perk.isAvailable) return;

    perk.isSelected = !perk.isSelected;

    this.orderPerks();
  }

  orderPerks() {
    this.perks.sort((a, b) => {
      if (a.isAvailable && !b.isAvailable)
        return -1;
      if (a.isSelected && !b.isSelected)
        return -1;
      return a.name.localeCompare(b.name);
    }); // todo: not work
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
