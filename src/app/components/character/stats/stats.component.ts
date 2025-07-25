import { Component, Input } from '@angular/core';
import { Stats } from '../../../models/stats';
import { Special } from '../../../models/special';

@Component({
  selector: 'app-stats',
  standalone: false,
  templateUrl: './stats.component.html',
  styleUrl: './stats.component.scss'
})
export class StatsComponent {
  stats: Stats = new Stats();
  @Input() special: Special = new Special();

  private _level: number = 0;
  get level(): number { return this._level; }
  @Input() set level(value: number) {
    this._level = value;
    this.updateStats();
  }

  updateStats() {
    this.stats.updateStats(this.special, this.level);
  }
}
