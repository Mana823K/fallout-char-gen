import { Component } from '@angular/core';
import { DataService } from '../../../services/data.service';
import { FilterTypeEnum, TableColumn, TableComponent } from '../../common/table/table.component';

@Component({
  selector: 'app-magazines',
  templateUrl: './magazines.component.html',
  styleUrl: './magazines.component.scss',
  imports: [TableComponent]
})
export class MagazinesComponent {
  magazines: any[] = [];

  tableColumns: TableColumn<any>[] = [
    new TableColumn<any>({
      label: "Name",
      property: "name",
      filterType: FilterTypeEnum.Text,
    }),
    new TableColumn<any>({
      label: "Roll",
      property: "roll",
      filterType: FilterTypeEnum.None,
      align: "right"
    }),
    new TableColumn<any>({
      label: "Rare",
      property: "rare",
      filterType: FilterTypeEnum.YesNo,
      align: "center",
      getText: (magazine) => { return magazine.rare ? 'Yes' : 'No'; }
    }),
    new TableColumn<any>({
      label: "Perk",
      property: "perk",
      filterType: FilterTypeEnum.Text,
    }),
    new TableColumn<any>({
      label: "Issues",
      property: "issue",
      filterType: FilterTypeEnum.Text,
    }),
    new TableColumn<any>({
      label: "Issue roll",
      property: "issueRoll",
      filterType: FilterTypeEnum.None,
    }),
    new TableColumn<any>({
      label: "Issue effect",
      property: "effect",
      filterType: FilterTypeEnum.Text,
    }),
  ];

  sortProperties = [];
  
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
