import { Component } from '@angular/core';
import { DataService } from '../../../services/data.service';
import { TableColumn, FilterTypeEnum } from '../../common/table/table-column';
import { TableComponent } from '../../common/table/table.component';
import { Magazine } from '../../../models/database/magazine';

@Component({
  selector: 'app-magazines',
  templateUrl: './magazines.component.html',
  styleUrl: './magazines.component.scss',
  imports: [TableComponent]
})
export class MagazinesComponent {
  get magazines(): Magazine[] { return this.dataService.magazines; }

  tableColumns: TableColumn<Magazine>[] = [
    new TableColumn<Magazine>({
      label: "Name",
      property: "name",
      filterType: FilterTypeEnum.Text,
    }),
    new TableColumn<Magazine>({
      label: "Roll",
      property: "roll",
      filterType: FilterTypeEnum.None,
      align: "right"
    }),
    new TableColumn<Magazine>({
      label: "Rare",
      property: "rare",
      filterType: FilterTypeEnum.YesNo,
      align: "center",
      getText: (magazine) => { return magazine.rare ? 'Yes' : 'No'; }
    }),
    new TableColumn<Magazine>({
      label: "Issues",
      property: "issue",
      filterType: FilterTypeEnum.Text,
    }),
    new TableColumn<Magazine>({
      label: "Issue roll",
      property: "issueRoll",
      filterType: FilterTypeEnum.None,
    }),
    new TableColumn<any>({
      label: "Effect",
      property: "effect",
      filterType: FilterTypeEnum.Text,
    }),
  ];

  sortProperties = [];
  
  constructor(private dataService: DataService) { }

}
