import { Component } from '@angular/core';
import { Stats } from '../../../models/character/stats';
import { Character } from '../../../models/character/character';
import { CharacterService } from '../../../services/character.service';

@Component({
  selector: 'app-stats',
  templateUrl: './stats.component.html',
  styleUrl: './stats.component.scss'
})
export class StatsComponent {
  get character(): Character { return this.characterService.character; }
  get stats(): Stats { return this.character.stats; }

  constructor(private characterService: CharacterService) { }
}
