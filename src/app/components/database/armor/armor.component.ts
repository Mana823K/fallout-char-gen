import { Component } from '@angular/core';
import { Armor } from '../../../models/armor';
import { DataService } from '../../../services/data.service';
import { FilterTypeEnum, TableColumn } from '../../common/table/table.component';

@Component({
  selector: 'app-armor',
  standalone: false,
  templateUrl: './armor.component.html',
  styleUrl: './armor.component.scss'
})
export class ArmorComponent {
  get armor(): Armor[] { return this.dataService.armor; }
  
  tableColumns: TableColumn<Armor>[] = [
    new TableColumn<Armor>({
      label: "Name",
      property: "name",
      filterType: FilterTypeEnum.Text,
    }),
    new TableColumn<Armor>({
      label: "Type",
      property: "type",
      filterType: FilterTypeEnum.Select,
    }),
    new TableColumn<Armor>({
      label: "Physical Resistance",
      property: "physicalRes",
      filterType: FilterTypeEnum.Sort,
      align: "right",
      getText: (piece) => { return piece.physicalRes > 0 ? piece.physicalRes == 999 ? 'Immune' : piece.physicalRes.toString() : '-' }
    }),
    new TableColumn<Armor>({
      label: "Energy Resistance",
      property: "energyRes",
      filterType: FilterTypeEnum.Sort,
      align: "right",
      getText: (piece) => { return piece.energyRes > 0 ? piece.energyRes == 999 ? 'Immune' : piece.energyRes.toString() : '-' }
    }),
    new TableColumn<Armor>({
      label: "Radiation Resistance",
      property: "radiationRes",
      filterType: FilterTypeEnum.Sort,
      align: "right",
      getText: (piece) => { return piece.radiationRes > 0 ? piece.radiationRes == 999 ? 'Immune' : piece.radiationRes.toString() : '-' }
    }),
    new TableColumn<Armor>({
      label: "Locations Covered",
      property: "locationCoveredText",
      filterType: FilterTypeEnum.Select,
    }),
    new TableColumn<Armor>({
      label: "Weight",
      property: "weight",
      filterType: FilterTypeEnum.Sort,
    }),
    new TableColumn<Armor>({
      label: "Cost",
      property: "cost",
      filterType: FilterTypeEnum.Sort,
    }),
    new TableColumn<Armor>({
      label: "Rarity",
      property: "rarity",
      filterType: FilterTypeEnum.Sort,
    }),
  ];

  sortProperties = ["type", "name"];

  constructor(private dataService: DataService) { }

}
