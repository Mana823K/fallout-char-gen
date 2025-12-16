import { Component } from '@angular/core';
import { DataService } from '../../../services/data.service';
import { MiscellanyItem } from '../../../models/miscellany-item';
import { FilterTypeEnum, TableColumn, TableComponent } from '../../common/table/table.component';

@Component({
  selector: 'app-miscellany',
  templateUrl: './miscellany.component.html',
  styleUrl: './miscellany.component.scss',
  imports: [TableComponent]
})
export class MiscellanyComponent {
  get items(): MiscellanyItem[] { return this.dataService.miscellanyItems; }

  tableColumns: TableColumn<MiscellanyItem>[] = [
    new TableColumn<MiscellanyItem>({
      label: "Name",
      property: "name",
      filterType: FilterTypeEnum.Text,
    }),
    new TableColumn<MiscellanyItem>({
      label: "Effects",
      property: "effects",
      filterType: FilterTypeEnum.Text,
    }),
    new TableColumn<MiscellanyItem>({
      label: "Weight",
      property: "weight",
      filterType: FilterTypeEnum.Sort,
      align: "right"
    }),
    new TableColumn<MiscellanyItem>({
      label: "Cost",
      property: "cost",
      filterType: FilterTypeEnum.Sort,
      align: "right"
    }),
    new TableColumn<MiscellanyItem>({
      label: "Rarity",
      property: "rarity",
      filterType: FilterTypeEnum.Sort,
      align: "right"
    }),
  ];

  sortProperties = ["name"];
  
  constructor(private dataService: DataService) { }

}
