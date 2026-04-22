import { AfterViewInit, Component, TemplateRef, ViewChild } from '@angular/core';
import { DataService } from '../../../services/data.service';
import { Weapon } from '../../../models/database/weapon';
import { Tooltip, TooltipTypeEnum } from '../../../models/database/tooltip';
import { TableColumn, FilterTypeEnum } from '../../common/table/table-column';
import { TableComponent } from '../../common/table/table.component';
import { TooltipedListCellComponent } from "../../common/tooltiped-list-cell/tooltiped-list-cell.component";

@Component({
  selector: 'app-weapons',
  templateUrl: './weapons.component.html',
  styleUrl: './weapons.component.scss',
  imports: [TableComponent, TooltipedListCellComponent]
})
export class WeaponsComponent implements AfterViewInit {
  get weapons(): Weapon[] { return this.dataService.weapons; }
  get tooltips(): Tooltip[] { return this.dataService.tooltips; }
  TooltipTypeEnum = TooltipTypeEnum;

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
      sortFunc: Weapon.rangeSort
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

  @ViewChild('effects') effectsTemplate?: TemplateRef<any>;
  @ViewChild('qualities') qualitiesTemplate?: TemplateRef<any>;

  constructor(private dataService: DataService) { }

  ngAfterViewInit(): void {
    let effectsColumn = this.tableColumns.find(x => x.property == "effects");
    if (effectsColumn)
      effectsColumn.template = this.effectsTemplate;

    let qualitiesColumn = this.tableColumns.find(x => x.property == "qualities");
    if (qualitiesColumn)
      qualitiesColumn.template = this.qualitiesTemplate;
  }
}
