import { Component } from '@angular/core';
import { CharacterService } from '../../services/character.service';
import { Special } from '../../models/character/special';
import { Character } from '../../models/character/character';
import { Skill } from '../../models/character/skill';
import { Stats } from '../../models/character/stats';

@Component({
  selector: 'app-gameplay',
  imports: [],
  templateUrl: './gameplay.component.html',
  styleUrl: './gameplay.component.scss'
})
export class GameplayComponent {
  get character(): Character { return this.characterService.character; }
  get special(): Special { return this.characterService.character.special; }
  get skills(): Skill[] { return this.characterService.character.skills; }
  get stats(): Stats { return this.characterService.character.stats; }

  constructor(private characterService: CharacterService) { }
}
