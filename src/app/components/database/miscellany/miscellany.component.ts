import { Component } from '@angular/core';
import { DataService } from '../../../services/data.service';
import { MiscellanyItem } from '../../../models/miscellany-item';

@Component({
  selector: 'app-miscellany',
  standalone: false,
  templateUrl: './miscellany.component.html',
  styleUrl: './miscellany.component.scss'
})
export class MiscellanyComponent {
  get items(): MiscellanyItem[] { return this.dataService.miscellanyItems; }

  constructor(private dataService: DataService) { }

}
