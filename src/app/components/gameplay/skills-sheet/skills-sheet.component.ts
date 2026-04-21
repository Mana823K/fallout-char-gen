import { Component } from '@angular/core';
import { Skill } from '../../../models/character/skill';
import { GameplayState } from '../../../models/gameplay/gameplay-state';
import { CharacterService } from '../../../services/character.service';
import { GameplayService } from '../../../services/gameplay.service';

@Component({
  selector: 'app-skills-sheet',
  imports: [],
  templateUrl: './skills-sheet.component.html',
  styleUrl: './skills-sheet.component.scss'
})
export class SkillsSheetComponent {
  get state(): GameplayState { return this.gameplayService.state; }
  get skills(): Skill[] { return this.characterService.character.skills; }

  constructor(private gameplayService: GameplayService, private characterService: CharacterService) { }

}
