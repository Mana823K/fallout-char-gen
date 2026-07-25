import { AfterViewInit, Component, TemplateRef, ViewChild } from '@angular/core';
import { DataService } from '../../../services/data.service';
import { InventoryService } from '../../../services/inventory.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatIcon } from '@angular/material/icon';
import { Consumable } from '../../../models/database/consumable';
import { MatTooltip } from '@angular/material/tooltip';
import { TableColumn, FilterTypeEnum } from '../../common/table/table-column';
import { TableComponent } from '../../common/table/table.component';

@Component({
  selector: 'app-consumables',
  templateUrl: './consumables.component.html',
  styleUrl: './consumables.component.scss',
  imports: [TableComponent, MatTooltip, MatIcon]
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
    new TableColumn<Consumable>({
      label: "Owned",
      property: "add",
      filterType: FilterTypeEnum.None,
    }),
  ];

  sortProperties = ["name"];

  @ViewChild('effects') effectsTemplate?: TemplateRef<any>;
  @ViewChild('add') addTemplate?: TemplateRef<any>;

  constructor(private dataService: DataService, private inventoryService: InventoryService, private snackBar: MatSnackBar) {
    let tooltip = this.dataService.tooltips.find(x => x.name == "Alcoholic")?.description ?? "";
    this.alcoholicTooltip = "Alcoholic: " + tooltip;
  }

  getOwnedCount(consumable: Consumable): number {
    return this.inventoryService.inventory.consumables.find(x => x.item.name == consumable.name)?.amount ?? 0;
  }

  ngAfterViewInit(): void {
    let effectsColumn = this.tableColumns.find(x => x.property == "effects");
    if (effectsColumn)
      effectsColumn.template = this.effectsTemplate;

    let addColumn = this.tableColumns.find(x => x.property == "add");
    if (addColumn)
      addColumn.template = this.addTemplate;
  }

  addToInventory(consumable: Consumable) {
    this.inventoryService.addItem(consumable, "consumables", ["name"]);
    this.snackBar.open(`Added "${consumable.name}" to inventory.`, undefined, { duration: 2000 });
  }

}
