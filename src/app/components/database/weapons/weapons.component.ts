import { Component } from '@angular/core';
import { DataService } from '../../../services/data.service';
import { Weapon } from '../../../models/weapon';

@Component({
  selector: 'app-weapons',
  standalone: false,
  templateUrl: './weapons.component.html',
  styleUrl: './weapons.component.scss'
})
export class WeaponsComponent {
  get weapons(): Weapon[] { return this.dataService.weapons; }

  constructor(private dataService: DataService) { }
}
