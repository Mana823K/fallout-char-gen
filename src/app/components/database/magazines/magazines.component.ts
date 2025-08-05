import { Component } from '@angular/core';
import { DataService } from '../../../services/data.service';

@Component({
  selector: 'app-magazines',
  standalone: false,
  templateUrl: './magazines.component.html',
  styleUrl: './magazines.component.scss'
})
export class MagazinesComponent {
  magazines: any[] = [];

  constructor(private dataService: DataService) {
    for (var magazineData of this.dataService.magazines) {
      this.magazines.push(magazineData);
      for (var issue of magazineData.issues) {
        this.magazines.push({
          name: "",
          roll: "",
          perk: "",
          issue: issue.name,
          issueRoll: issue.roll.join(", "),
          effect: issue.effect
        })
      }
    }
  }

}
