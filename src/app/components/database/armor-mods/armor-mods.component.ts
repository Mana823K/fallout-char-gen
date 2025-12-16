import { Component } from '@angular/core';
import { DataService } from '../../../services/data.service';
import { ArmorMod } from '../../../models/armor-mod';
import { FilterTypeEnum, TableColumn, TableComponent } from '../../common/table/table.component';

@Component({
  selector: 'app-armor-mods',
  templateUrl: './armor-mods.component.html',
  styleUrl: './armor-mods.component.scss',
  imports: [TableComponent]
})
export class ArmorModsComponent {
  get armorMods(): ArmorMod[] { return this.dataService.armorMods; }

  tableColumns: TableColumn<ArmorMod>[] = [
    new TableColumn<ArmorMod>({
      label: "Name",
      property: "name",
      filterType: FilterTypeEnum.Text,
    }),
    new TableColumn<ArmorMod>({
      label: "Type",
      property: "type",
      filterType: FilterTypeEnum.Select,
    }),
    new TableColumn<ArmorMod>({
      label: "Physical Resistance",
      property: "physicalRes",
      filterType: FilterTypeEnum.Sort,
      align: "right",
      getText: (mod) => { return `${mod.physicalRes > 0 ? '+' : ''}${mod.physicalRes == 0 ? '-' : mod.physicalRes}` }
    }),
    new TableColumn<ArmorMod>({
      label: "Energy Resistance",
      property: "energyRes",
      filterType: FilterTypeEnum.Sort,
      align: "right",
      getText: (mod) => { return `${mod.energyRes > 0 ? '+' : ''}${mod.energyRes == 0 ? '-' : mod.energyRes}` }
    }),
    new TableColumn<ArmorMod>({
      label: "Radiation Resistance",
      property: "radiationRes",
      filterType: FilterTypeEnum.Sort,
      align: "right",
      getText: (mod) => { return `${mod.radiationRes > 0 ? '+' : ''}${mod.radiationRes == 0 ? '-' : mod.radiationRes}` }
    }),
    new TableColumn<ArmorMod>({
      label: "Effects",
      property: "effects",
      filterType: FilterTypeEnum.Text,
    }),
    new TableColumn<ArmorMod>({
      label: "Weight",
      property: "weight",
      filterType: FilterTypeEnum.Sort,
      align: "right",
      getText: (mod) => { return `${mod.weight > 0 ? '+' : ''}${mod.weight == 0 ? '-' : mod.weight}` }
    }),
    new TableColumn<ArmorMod>({
      label: "Cost",
      property: "cost",
      filterType: FilterTypeEnum.Sort,
      align: "right",
      getText: (mod) => { return `${mod.cost > 0 ? '+' : ''}${mod.cost == 0 ? '-' : mod.cost}` }
    }),
    new TableColumn<ArmorMod>({
      label: "Perks",
      property: "perks",
      filterType: FilterTypeEnum.Select,
    }),
  ];

  sortProperties = ["type", "name"];

  constructor(private dataService: DataService) { }

}
