import { Component } from '@angular/core';
import { CharacterService } from '../../../services/character.service';
import { GameplayService } from '../../../services/gameplay.service';
import { GameplayState } from '../../../models/gameplay/gameplay-state';
import { Perk } from '../../../models/character/perk';
import { Origin } from '../../../models/character/origin';

@Component({
  selector: 'app-perks-sheet',
  imports: [],
  templateUrl: './perks-sheet.component.html',
  styleUrl: './perks-sheet.component.scss'
})
export class PerksSheetComponent {
  get state(): GameplayState { return this.gameplayService.state; }
  get origin(): Origin | undefined { return this.characterService.character.origin; }
  perks: Perk[];

  constructor(private gameplayService: GameplayService, private characterService: CharacterService) {
    this.perks = this.characterService.character.perks.filter(x => x.isSelected);
  }

  save() {
    this.gameplayService.save();
  }

}
