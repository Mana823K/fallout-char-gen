import { Component } from '@angular/core';
import { DataService } from '../../../services/data.service';
import { WeaponMod } from '../../../models/weapon-mod';
import { FilterTypeEnum, TableColumn, TableComponent } from '../../common/table/table.component';

@Component({
  selector: 'app-mods',
  templateUrl: './weapon-mods.component.html',
  styleUrl: './weapon-mods.component.scss',
  imports: [TableComponent]
})
export class WeaponModsComponent {
  get weaponMods(): WeaponMod[] { return this.dataService.weaponMods; }

  tableColumns: TableColumn<WeaponMod>[] = [
    new TableColumn<WeaponMod>({
      label: "Name",
      property: "name",
      filterType: FilterTypeEnum.Text,
    }),
    new TableColumn<WeaponMod>({
      label: "Prefix",
      property: "prefix",
      filterType: FilterTypeEnum.Text,
    }),
    new TableColumn<WeaponMod>({
      label: "Weapon Type",
      property: "weaponType",
      filterType: FilterTypeEnum.Select,
    }),
    new TableColumn<WeaponMod>({
      label: "Type",
      property: "type",
      filterType: FilterTypeEnum.Select,
    }),
    new TableColumn<WeaponMod>({
      label: "Effects",
      property: "effectText",
      filterType: FilterTypeEnum.Text,
    }),
    new TableColumn<WeaponMod>({
      label: "Weight",
      property: "weightChange",
      filterType: FilterTypeEnum.Sort,
      align: "right",
      getText: (mod) => { return `${mod.weightChange > 0 ? '+': ''}${mod.weightChange == 0 ? '-' : mod.weightChange}` }
    }),
    new TableColumn<WeaponMod>({
      label: "Cost",
      property: "costChange",
      filterType: FilterTypeEnum.Sort,
      align: "right",
      getText: (mod) => { return `${mod.costChange > 0 ? '+': ''}${mod.costChange == 0 ? '-' : mod.costChange}` }
    }),
    new TableColumn<WeaponMod>({
      label: "Perk",
      property: "perks",
      filterType: FilterTypeEnum.Select,
    }),
  ];

  sortProperties = ["weaponType", "type", "name"];

  constructor(private dataService: DataService) { }

}
