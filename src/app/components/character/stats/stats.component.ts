import { Component, Input } from '@angular/core';
import { Stats } from '../../../models/stats';
import { Special } from '../../../models/special';

@Component({
  selector: 'app-stats',
  templateUrl: './stats.component.html',
  styleUrl: './stats.component.scss'
})
export class StatsComponent {
  stats: Stats = new Stats();
  @Input() special: Special = new Special();

  private _hpModifier: number = 0;
  get hpModifier(): number { return this._hpModifier; }
  @Input() set hpModifier(value: number) {
    this._hpModifier = value;
    this.updateStats();
  }

  private _carryWeightModifier: number = 0;
  get carryWeightModifier(): number { return this._carryWeightModifier; }
  @Input() set carryWeightModifier(value: number) {
    this._carryWeightModifier = value;
    this.updateStats();
  }

  private _level: number = 0;
  get level(): number { return this._level; }
  @Input() set level(value: number) {
    this._level = value;
    this.updateStats();
  }

  updateStats() {
    this.stats.updateStats(this.special, this.level, this.hpModifier, this.carryWeightModifier);
  }
}
