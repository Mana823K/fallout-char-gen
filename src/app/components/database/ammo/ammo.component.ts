import { Component } from '@angular/core';
import { Ammo } from '../../../models/ammo';
import { DataService } from '../../../services/data.service';
import { FilterTypeEnum, TableColumn } from '../../common/table/table.component';

@Component({
  selector: 'app-ammo',
  standalone: false,
  templateUrl: './ammo.component.html',
  styleUrl: './ammo.component.scss'
})
export class AmmoComponent {
  get ammos(): Ammo[] { return this.dataService.ammo; }

  tableColumns: TableColumn<Ammo>[] = [
    new TableColumn<Ammo>({
      label: "Name",
      property: "name",
      filterType: FilterTypeEnum.Text,
    }),
    new TableColumn<Ammo>({
      label: "Sub Type",
      property: "subType",
      filterType: FilterTypeEnum.Text,
    }),
    new TableColumn<Ammo>({
      label: "Quantity Found",
      property: "name",
      filterType: FilterTypeEnum.None,
      getText: Ammo.getQuantityText,
      align: "right"
    }),
    new TableColumn<Ammo>({
      label: "Weight",
      property: "weight",
      filterType: FilterTypeEnum.Sort,
      align: "right"
    }),
    new TableColumn<Ammo>({
      label: "Cost",
      property: "cost",
      filterType: FilterTypeEnum.Sort,
      align: "right"
    }),
    new TableColumn<Ammo>({
      label: "Rarity",
      property: "rarity",
      filterType: FilterTypeEnum.Sort,
      align: "right"
    }),
    new TableColumn<Ammo>({
      label: "Notes",
      property: "notes",
      filterType: FilterTypeEnum.None,
    }),
  ];

  sortProperties = ["name", "subType"];

  constructor(private dataService: DataService) { }

}
