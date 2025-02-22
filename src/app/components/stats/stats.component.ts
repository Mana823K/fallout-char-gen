import { Component } from '@angular/core';
import { CharacterService } from '../../services/character.service';
import { Stats } from '../../models/stats';

@Component({
  selector: 'app-stats',
  standalone: false,
  templateUrl: './stats.component.html',
  styleUrl: './stats.component.scss'
})
export class StatsComponent {
  get stats(): Stats { return this.characterService.stats; }
  set stats(value: Stats) { this.characterService.stats = value; }

  constructor(private characterService: CharacterService) { }
}
