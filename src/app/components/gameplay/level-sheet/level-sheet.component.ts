import { Component } from '@angular/core';
import { GameplayService } from '../../../services/gameplay.service';
import { CharacterService } from '../../../services/character.service';
import { GameplayState } from '../../../models/gameplay/gameplay-state';
import { Character } from '../../../models/character/character';
import { NumberInputComponent } from '../../form/number-input/number-input.component';

@Component({
  selector: 'app-level-sheet',
  imports: [NumberInputComponent],
  templateUrl: './level-sheet.component.html',
  styleUrl: './level-sheet.component.scss'
})
export class LevelSheetComponent {
  get state(): GameplayState { return this.gameplayService.state; }
  get character(): Character { return this.characterService.character; }

  constructor(private gameplayService: GameplayService, private characterService: CharacterService) { }
  
  save() {
    this.gameplayService.save();
  }
}
