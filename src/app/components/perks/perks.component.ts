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
  get perkOptions(): Perk[] { return this.dataService.perks; }
  get perks(): Perk[] { return this.characterService.perks; }
  set perks(value: Perk[]) { this.characterService.perks = value; }

  constructor(private characterService: CharacterService, private dataService: DataService) { }

  getRequirements(perk: Perk): string {
    var result = "";

    if (perk.requiredSpecial.length > 0) {
      result += perk.requiredSpecial.map(x => `${x.specialName} ${x.points}`).join(", ");
    }

    if (perk.requiredLevel > 0) {
      result += `, Level ${perk.requiredLevel}+`;
    }

    return result.length > 0 ? result : "None";
  }
}
