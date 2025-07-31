import { Component } from '@angular/core';
import { Armor } from '../../../models/armor';
import { DataService } from '../../../services/data.service';

@Component({
  selector: 'app-armor',
  standalone: false,
  templateUrl: './armor.component.html',
  styleUrl: './armor.component.scss'
})
export class ArmorComponent {
  get armor(): Armor[] { return this.dataService.armor; }

  constructor(private dataService: DataService) { }

}
