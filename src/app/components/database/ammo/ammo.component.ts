import { Component } from '@angular/core';
import { Ammo } from '../../../models/ammo';
import { DataService } from '../../../services/data.service';

@Component({
  selector: 'app-ammo',
  standalone: false,
  templateUrl: './ammo.component.html',
  styleUrl: './ammo.component.scss'
})
export class AmmoComponent {
  get ammos(): Ammo[] { return this.dataService.ammo; }

  constructor(private dataService: DataService) { }

}
