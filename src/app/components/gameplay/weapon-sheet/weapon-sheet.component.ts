import { Component } from '@angular/core';
import { GameplayState } from '../../../models/gameplay/gameplay-state';
import { Weapon } from '../../../models/database/weapon';
import { CharacterService } from '../../../services/character.service';
import { GameplayService } from '../../../services/gameplay.service';

@Component({
  selector: 'app-weapon-sheet',
  imports: [],
  templateUrl: './weapon-sheet.component.html',
  styleUrl: './weapon-sheet.component.scss'
})
export class WeaponSheetComponent {
  get state(): GameplayState { return this.gameplayService.state; }
  get weapons(): Weapon[] { return this.gameplayService.state.markedWeapons; }

  constructor(private gameplayService: GameplayService, private characterService: CharacterService) { }

  save() {
    this.gameplayService.save();
  }

}
