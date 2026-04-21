import { Component } from '@angular/core';
import { GameplayState } from '../../../models/gameplay/gameplay-state';
import { CharacterService } from '../../../services/character.service';
import { GameplayService } from '../../../services/gameplay.service';
import { Special } from '../../../models/character/special';
import { NumberInputComponent } from "../../form/number-input/number-input.component";

@Component({
  selector: 'app-special-sheet',
  imports: [NumberInputComponent],
  templateUrl: './special-sheet.component.html',
  styleUrl: './special-sheet.component.scss'
})
export class SpecialSheetComponent {
  get state(): GameplayState { return this.gameplayService.state; }
  get special(): Special { return this.characterService.character.special; }

  constructor(private gameplayService: GameplayService, private characterService: CharacterService) { }

}
