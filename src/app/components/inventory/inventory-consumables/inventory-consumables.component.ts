import { Component, TemplateRef, ViewChild } from '@angular/core';
import { InventoryItem } from '../../../models/inventory/inventory';
import { Consumable } from '../../../models/database/consumable';
import { InventoryService } from '../../../services/inventory.service';
import { DataService } from '../../../services/data.service';
import { TableColumn } from '../../common/table/table-column';
import { TableComponent } from '../../common/table/table.component';
import { invConsumablesColumns } from './models/consumables-columns';
import { invConsumablesSelectColumns } from './models/consumables-select-columns';
import { NumberInputComponent } from '../../form/number-input/number-input.component';
import { InputComponent } from '../../form/input/input.component';
import { SelectComponent } from '../../form/select/select.component';
import { AmountCellComponent } from '../../common/amount-cell/amount-cell.component';
import { MatCheckbox } from "@angular/material/checkbox";
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-inventory-consumables',
  imports: [TableComponent, NumberInputComponent, InputComponent, SelectComponent, AmountCellComponent, MatCheckbox, FormsModule],
  templateUrl: './inventory-consumables.component.html',
  styleUrl: './inventory-consumables.component.scss'
})
export class InventoryConsumablesComponent {
  get consumables(): InventoryItem<Consumable>[] { return this.inventoryService.inventory.consumables; }
  set consumables(value: InventoryItem<Consumable>[]) { this.inventoryService.inventory.consumables = value; }
  get selectOptions(): Consumable[] { return this.dataService.consumables; }

  inventoryTableColumns: TableColumn<InventoryItem<Consumable>>[] = invConsumablesColumns;
  selectTableColumns: TableColumn<Consumable>[] = invConsumablesSelectColumns;
  sortProperties = ["name"];
  
  @ViewChild('amount') amountTemplate?: TemplateRef<any>;
  @ViewChild('table') table?: TableComponent<InventoryItem<Consumable>>;

  isSelect: boolean = false;
  isAdd: boolean = false;
  newItem = new InventoryItem<Consumable>(new Consumable());

  types: string[] = ["Beverage", "Food"]

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

  addCustom() {
    this.newItem.isCustom = true;
    this.consumables.push(this.newItem);
    this.table?.renderRows();
    this.save();
    this.cancelAddItem();
  }

  cancelAddItem() {
    if (this.isAdd)
      this.newItem = new InventoryItem<Consumable>(new Consumable());
    this.isSelect = false;
    this.isAdd = false;
  }

  save() {
    this.inventoryService.save();
  }
}
