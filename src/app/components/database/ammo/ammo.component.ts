import { AfterViewInit, Component, TemplateRef, ViewChild } from '@angular/core';
import { Ammo } from '../../../models/database/ammo';
import { DataService } from '../../../services/data.service';
import { InventoryService } from '../../../services/inventory.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatIcon } from '@angular/material/icon';
import { TableColumn, FilterTypeEnum } from '../../common/table/table-column';
import { TableComponent } from '../../common/table/table.component';

@Component({
  selector: 'app-ammo',
  templateUrl: './ammo.component.html',
  styleUrl: './ammo.component.scss',
  imports: [TableComponent, MatIcon]
})
export class AmmoComponent implements AfterViewInit {
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
    new TableColumn<Ammo>({
      label: "Owned",
      property: "add",
      filterType: FilterTypeEnum.None,
    }),
  ];

  sortProperties = ["name", "subType"];

  @ViewChild('add') addTemplate?: TemplateRef<any>;

  constructor(private dataService: DataService, private inventoryService: InventoryService, private snackBar: MatSnackBar) { }

  getOwnedCount(ammo: Ammo): number {
    return this.inventoryService.inventory.ammo.find(x => x.item.name == ammo.name)?.amount ?? 0;
  }

  addToInventory(ammo: Ammo) {
    this.inventoryService.addItem(ammo, "ammo", ["name"]);
    this.snackBar.open(`Added "${ammo.name}" to inventory.`, undefined, { duration: 2000 });
  }

  ngAfterViewInit(): void {
    let addColumn = this.tableColumns.find(x => x.property == "add");
    if (addColumn)
      addColumn.template = this.addTemplate;
  }

}
