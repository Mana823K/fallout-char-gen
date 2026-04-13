import { Component, Input } from '@angular/core';
import { Stats } from '../../../models/character/stats';
import { Character } from '../../../models/character/character';

@Component({
  selector: 'app-stats',
  templateUrl: './stats.component.html',
  styleUrl: './stats.component.scss'
})
export class StatsComponent {
  @Input() character = new Character();
  get stats(): Stats { return this.character.stats; }
}
