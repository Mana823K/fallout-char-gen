import { Component } from '@angular/core';
import { GameplayService } from '../../../services/gameplay.service';
import { GameplayState } from '../../../models/gameplay/gameplay-state';
import { CharacterService } from '../../../services/character.service';
import { Stats } from '../../../models/character/stats';
import { NumberInputComponent } from "../../form/number-input/number-input.component";

@Component({
  selector: 'app-combat-sheet',
  imports: [NumberInputComponent],
  templateUrl: './combat-sheet.component.html',
  styleUrl: './combat-sheet.component.scss'
})
export class CombatSheetComponent {
  get state(): GameplayState { return this.gameplayService.state; }
  get stats(): Stats { return this.characterService.character.stats; }

  constructor(private gameplayService: GameplayService, private characterService: CharacterService) { }

}
