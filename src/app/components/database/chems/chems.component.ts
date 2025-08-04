import { Component } from '@angular/core';
import { DataService } from '../../../services/data.service';
import { Chem } from '../../../models/chem';

@Component({
  selector: 'app-chems',
  standalone: false,
  templateUrl: './chems.component.html',
  styleUrl: './chems.component.scss'
})
export class ChemsComponent {
  get chems(): Chem[] { return this.dataService.chems; }

  constructor(private dataService: DataService) { }

}
