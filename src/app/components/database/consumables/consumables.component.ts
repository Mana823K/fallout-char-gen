import { Component } from '@angular/core';
import { DataService } from '../../../services/data.service';
import { Consumable } from '../../../models/consumable';
import { FilterTypeEnum, TableColumn, TableComponent } from '../../common/table/table.component';

@Component({
  selector: 'app-consumables',
  templateUrl: './consumables.component.html',
  styleUrl: './consumables.component.scss',
  imports: [TableComponent]
})
export class ConsumablesComponent {
  get consumables(): Consumable[] { return this.dataService.consumables; }

  tableColumns: TableColumn<Consumable>[] = [
    new TableColumn<Consumable>({
      label: "Name",
      property: "name",
      filterType: FilterTypeEnum.Text,
    }),
    new TableColumn<Consumable>({
      label: "Type",
      property: "type",
      filterType: FilterTypeEnum.Select,
    }),
    new TableColumn<Consumable>({
      label: "HP Heal",
      property: "heal",
      filterType: FilterTypeEnum.Sort,
      align: "right"
    }),
    new TableColumn<Consumable>({
      label: "Effects",
      property: "effects",
      filterType: FilterTypeEnum.Text,
    }),
    new TableColumn<Consumable>({
      label: "Irradiated",
      property: "irradiated",
      filterType: FilterTypeEnum.YesNo,
      align: "center",
      getText: (item) => { return item.irradiated ? 'O': '' }
    }),
    new TableColumn<Consumable>({
      label: "Weight",
      property: "weight",
      filterType: FilterTypeEnum.Sort,
      align: "right"
    }),
    new TableColumn<Consumable>({
      label: "Cost",
      property: "cost",
      filterType: FilterTypeEnum.Sort,
      align: "right"
    }),
    new TableColumn<Consumable>({
      label: "Rarity",
      property: "rarity",
      filterType: FilterTypeEnum.Sort,
      align: "right"
    }),
  ];

  sortProperties = ["name"];

  constructor(private dataService: DataService) { }

}
