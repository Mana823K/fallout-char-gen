import { Component } from '@angular/core';
import { DataService } from '../../../services/data.service';
import { Chem } from '../../../models/chem';
import { FilterTypeEnum, TableColumn, TableComponent } from '../../common/table/table.component';

@Component({
  selector: 'app-chems',
  templateUrl: './chems.component.html',
  styleUrl: './chems.component.scss',
  imports: [TableComponent]
})
export class ChemsComponent {
  get chems(): Chem[] { return this.dataService.chems; }

  tableColumns: TableColumn<Chem>[] = [
    new TableColumn<Chem>({
      label: "Name",
      property: "name",
      filterType: FilterTypeEnum.Text,
    }),
    new TableColumn<Chem>({
      label: "Effects",
      property: "effects",
      filterType: FilterTypeEnum.Text,
    }),
    new TableColumn<Chem>({
      label: "Duration",
      property: "duration",
      filterType: FilterTypeEnum.Select,
    }),
    new TableColumn<Chem>({
      label: "Addictive?",
      property: "addictive",
      filterType: FilterTypeEnum.Sort,
      align: "center",
      getText: (chem) => { return chem.addictive > 0 ? 'Yes ' + chem.addictive  : 'No' }
    }),
    new TableColumn<Chem>({
      label: "Cost",
      property: "cost",
      filterType: FilterTypeEnum.Sort,
      align: "right"
    }),
    new TableColumn<Chem>({
      label: "Rarity",
      property: "rarity",
      filterType: FilterTypeEnum.Sort,
      align: "right"
    }),
  ];

  sortProperties = ["name"];
  
  constructor(private dataService: DataService) { }

}
