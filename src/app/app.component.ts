import { Component, ViewChild } from '@angular/core';
import { Special } from './models/special';
import { StatsComponent } from './components/stats/stats.component';
import { PerksComponent } from './components/perks/perks.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  standalone: false,
  styleUrl: './app.component.scss'
})
export class AppComponent {
  @ViewChild('statsComponent') statsComponent?: StatsComponent;
  @ViewChild('perksComponent') perksComponent?: PerksComponent;

  special: Special = new Special();
  level: number = 0;

  onSpecialChanged(special: Special) {
    this.special = special;
    this.statsComponent?.updateStats();
    this.perksComponent?.updatePerks();
  }
}
