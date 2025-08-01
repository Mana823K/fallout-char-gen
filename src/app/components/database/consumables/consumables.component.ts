import { Component } from '@angular/core';
import { DataService } from '../../../services/data.service';
import { Consumable } from '../../../models/consumable';

@Component({
  selector: 'app-consumables',
  standalone: false,
  templateUrl: './consumables.component.html',
  styleUrl: './consumables.component.scss'
})
export class ConsumablesComponent {
  get consumables(): Consumable[] { return this.dataService.consumables; }

  constructor(private dataService: DataService) { }

}
