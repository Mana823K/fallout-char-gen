import { AfterViewInit, Component, TemplateRef, ViewChild } from '@angular/core';
import { DataService } from '../../../services/data.service';
import { Consumable } from '../../../models/consumable';
import { FilterTypeEnum, TableColumn, TableComponent } from '../../common/table/table.component';
import { MatTooltip } from '@angular/material/tooltip';

@Component({
  selector: 'app-consumables',
  templateUrl: './consumables.component.html',
  styleUrl: './consumables.component.scss',
  imports: [TableComponent, MatTooltip]
})
export class ConsumablesComponent implements AfterViewInit {
  get consumables(): Consumable[] { return this.dataService.consumables; }

  alcoholicTooltip: string = "";

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

  @ViewChild('effects') effectsTemplate?: TemplateRef<any>;
  
  constructor(private dataService: DataService) {
    let tooltip = this.dataService.tooltips.find(x => x.name == "Alcoholic")?.description ?? "";
    this.alcoholicTooltip = "Alcoholic: " + tooltip;
  }
  
  ngAfterViewInit(): void {
    let effectsColumn = this.tableColumns.find(x => x.property == "effects");
    if (effectsColumn)
      effectsColumn.template = this.effectsTemplate;
  }

}
