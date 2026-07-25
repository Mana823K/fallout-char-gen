import { AfterViewInit, Component, TemplateRef, ViewChild } from '@angular/core';
import { DataService } from '../../../services/data.service';
import { InventoryService } from '../../../services/inventory.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatIcon } from '@angular/material/icon';
import { MiscellanyItem } from '../../../models/database/miscellany-item';
import { TableColumn, FilterTypeEnum } from '../../common/table/table-column';
import { TableComponent } from '../../common/table/table.component';

@Component({
  selector: 'app-miscellany',
  templateUrl: './miscellany.component.html',
  styleUrl: './miscellany.component.scss',
  imports: [TableComponent, MatIcon]
})
export class MiscellanyComponent implements AfterViewInit {
  get items(): MiscellanyItem[] { return this.dataService.miscellanyItems; }

  tableColumns: TableColumn<MiscellanyItem>[] = [
    new TableColumn<MiscellanyItem>({
      label: "Name",
      property: "name",
      filterType: FilterTypeEnum.Text,
    }),
    new TableColumn<MiscellanyItem>({
      label: "Effects",
      property: "effects",
      filterType: FilterTypeEnum.Text,
    }),
    new TableColumn<MiscellanyItem>({
      label: "Weight",
      property: "weight",
      filterType: FilterTypeEnum.Sort,
      align: "right"
    }),
    new TableColumn<MiscellanyItem>({
      label: "Cost",
      property: "cost",
      filterType: FilterTypeEnum.Sort,
      align: "right"
    }),
    new TableColumn<MiscellanyItem>({
      label: "Rarity",
      property: "rarity",
      filterType: FilterTypeEnum.Sort,
      align: "right"
    }),
    new TableColumn<MiscellanyItem>({
      label: "Owned",
      property: "add",
      filterType: FilterTypeEnum.None,
    }),
  ];

  sortProperties = ["name"];

  @ViewChild('add') addTemplate?: TemplateRef<any>;

  constructor(private dataService: DataService, private inventoryService: InventoryService, private snackBar: MatSnackBar) { }

  getOwnedCount(item: MiscellanyItem): number {
    return this.inventoryService.inventory.misc.find(x => x.item.name == item.name)?.amount ?? 0;
  }

  addToInventory(item: MiscellanyItem) {
    this.inventoryService.addItem(item, "misc", ["name"]);
    this.snackBar.open(`Added "${item.name}" to inventory.`, undefined, { duration: 2000 });
  }

  ngAfterViewInit(): void {
    let addColumn = this.tableColumns.find(x => x.property == "add");
    if (addColumn)
      addColumn.template = this.addTemplate;
  }

}
