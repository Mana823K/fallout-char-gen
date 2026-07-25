import { AfterViewInit, Component, TemplateRef, ViewChild } from '@angular/core';
import { InventoryItem } from '../../../models/inventory/inventory';
import { Consumable } from '../../../models/database/consumable';
import { InventoryService } from '../../../services/inventory.service';
import { DataService } from '../../../services/data.service';
import { TableColumn } from '../../common/table/table-column';
import { TableComponent } from '../../common/table/table.component';
import { invConsumablesColumns } from './models/consumables-columns';
import { invConsumablesSelectColumns } from './models/consumables-select-columns';
import { AmountCellComponent } from '../../common/amount-cell/amount-cell.component';

@Component({
  selector: 'app-inventory-consumables',
  imports: [TableComponent, AmountCellComponent],
  templateUrl: './inventory-consumables.component.html',
  styleUrl: './inventory-consumables.component.scss'
})
export class InventoryConsumablesComponent implements AfterViewInit {
  get consumables(): InventoryItem<Consumable>[] { return this.inventoryService.inventory.consumables; }
  set consumables(value: InventoryItem<Consumable>[]) { this.inventoryService.inventory.consumables = value; }
  get selectOptions(): Consumable[] { return this.dataService.consumables; }

  inventoryTableColumns: TableColumn<InventoryItem<Consumable>>[] = invConsumablesColumns;
  selectTableColumns: TableColumn<Consumable>[] = invConsumablesSelectColumns;
  sortProperties = ["name"];

  @ViewChild('amount') amountTemplate?: TemplateRef<any>;
  @ViewChild('table') table?: TableComponent<InventoryItem<Consumable>>;

  isSelect: boolean = false;
  newItemFactory = () => new InventoryItem<Consumable>(new Consumable());

  constructor(private inventoryService: InventoryService, private dataService: DataService) { }

  ngAfterViewInit(): void {
    let amountColumn = this.inventoryTableColumns.find(x => x.property == "amount");
    if (amountColumn)
      amountColumn.template = this.amountTemplate;
  }

  selectItem(item: Consumable) {
    this.inventoryService.addItem(item, "consumables", ["name"]);
    this.table?.renderRows();
    this.isSelect = false;
  }

  removeItem(item: InventoryItem<Consumable>) {
    this.inventoryService.removeItem(item, "consumables", ["name"]);
    this.table?.renderRows();
  }

  addCustom(item: InventoryItem<Consumable>) {
    item.isCustom = true;
    this.consumables.push(item);
    this.table?.renderRows();
    this.save();
  }

  save() {
    this.inventoryService.save();
  }
}
