import { Component } from '@angular/core';
import { DataService } from '../../../services/data.service';
import { Weapon } from '../../../models/weapon';
import { ranges } from '../../../models/range';
import { FilterTypeEnum, TableColumn } from '../../common/table/table.component';

@Component({
  selector: 'app-weapons',
  standalone: false,
  templateUrl: './weapons.component.html',
  styleUrl: './weapons.component.scss'
})
export class WeaponsComponent {
  get weapons(): Weapon[] { return this.dataService.weapons; }

  tableColumns: TableColumn<Weapon>[] = [
    new TableColumn<Weapon>({
      label: "Name",
      property: "name",
      filterType: FilterTypeEnum.Text,
    }),
    new TableColumn<Weapon>({
      label: "Weapon Type",
      property: "type",
      filterType: FilterTypeEnum.Select,
    }),
    new TableColumn<Weapon>({
      label: "Damage",
      property: "damage",
      filterType: FilterTypeEnum.Sort,
      align: "right",
      getText: (item) => { return item.damage + '\u00A0' + "CD"; }
    }),
    new TableColumn<Weapon>({
      label: "Damage Effects",
      property: "effects",
      filterType: FilterTypeEnum.Select,
    }),
    new TableColumn<Weapon>({
      label: "Damage Type",
      property: "damageType",
      filterType: FilterTypeEnum.Select,
    }),
    new TableColumn<Weapon>({
      label: "Fire Rate",
      property: "rate",
      filterType: FilterTypeEnum.Sort,
      align: "right",
    }),
    new TableColumn<Weapon>({
      label: "Range",
      property: "range",
      filterType: FilterTypeEnum.Sort,
      align: "center",
      sortFunc: this.rangeSort
    }),
    new TableColumn<Weapon>({
      label: "Qualities",
      property: "qualities",
      filterType: FilterTypeEnum.Select,
    }),
    new TableColumn<Weapon>({
      label: "Ammo",
      property: "ammo",
      filterType: FilterTypeEnum.Select,
    }),
    new TableColumn<Weapon>({
      label: "Weight",
      property: "weight",
      filterType: FilterTypeEnum.Sort,
      align: "right"
    }),
    new TableColumn<Weapon>({
      label: "Cost",
      property: "cost",
      filterType: FilterTypeEnum.Sort,
      align: "right"
    }),
    new TableColumn<Weapon>({
      label: "Rarity",
      property: "rarity",
      filterType: FilterTypeEnum.Sort,
      align: "right"
    }),
  ];

  sortProperties = ["type", "name"];

  constructor(private dataService: DataService) { }

  rangeSort(a: Weapon, b: Weapon) {
    let aRange = ranges.find(x => x.name == a.range);
    let bRange = ranges.find(x => x.name == b.range);
    return (aRange?.number ?? 0) - (bRange?.number ?? 0);
  }
}
