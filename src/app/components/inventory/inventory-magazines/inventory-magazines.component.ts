import { AfterViewInit, Component, TemplateRef, ViewChild } from '@angular/core';
import { InventoryItem } from '../../../models/inventory/inventory';
import { Magazine } from '../../../models/database/magazine';
import { InventoryService } from '../../../services/inventory.service';
import { DataService } from '../../../services/data.service';
import { TableColumn } from '../../common/table/table-column';
import { invMagazineColumns } from './models/magazine-columns';
import { invMagazineSelectColumns } from './models/magazine-select-columns';
import { TableComponent } from '../../common/table/table.component';
import { AmountCellComponent } from '../../common/amount-cell/amount-cell.component';
import { NumberInputComponent } from '../../form/number-input/number-input.component';
import { InputComponent } from '../../form/input/input.component';
import { SelectComponent } from '../../form/select/select.component';

@Component({
  selector: 'app-inventory-magazines',
  imports: [TableComponent, AmountCellComponent, NumberInputComponent, InputComponent],
  templateUrl: './inventory-magazines.component.html',
  styleUrl: './inventory-magazines.component.scss'
})
export class InventoryMagazinesComponent implements AfterViewInit{
  get magazines(): InventoryItem<Magazine>[] { return this.inventoryService.inventory.magazines; }
  set magazines(value: InventoryItem<Magazine>[]) { this.inventoryService.inventory.magazines = value; }
  get selectOptions(): Magazine[] { return this.dataService.magazines; }

  inventoryTableColumns: TableColumn<InventoryItem<Magazine>>[] = invMagazineColumns;
  selectTableColumns: TableColumn<Magazine>[] = invMagazineSelectColumns;
  sortProperties = ["name"];
  
  @ViewChild('amount') amountTemplate?: TemplateRef<any>;
  @ViewChild('table') table?: TableComponent<InventoryItem<Magazine>>;

  isSelect: boolean = false;
  isAdd: boolean = false;
  newItem = new InventoryItem<Magazine>(new Magazine());

  constructor(private inventoryService: InventoryService, private dataService: DataService) { }

  ngAfterViewInit(): void {
    let amountColumn = this.inventoryTableColumns.find(x => x.property == "amount");
    if (amountColumn)
      amountColumn.template = this.amountTemplate;
  }

  selectItem(item: Magazine) {
    this.inventoryService.addItem(item, "magazines", ["name", "issue"]);
    this.table?.renderRows();
    this.isSelect = false;
  }

  removeItem(item: InventoryItem<Magazine>) {
    this.inventoryService.removeItem(item, "magazines", ["name", "issue"]);
    this.table?.renderRows();
  }

  addCustom() {
    this.newItem.isCustom = true;
    this.magazines.push(this.newItem);
    this.table?.renderRows();
    this.save();
    this.cancelAddItem();
  }

  cancelAddItem() {
    if (this.isAdd)
      this.newItem = new InventoryItem<Magazine>(new Magazine());
    this.isSelect = false;
    this.isAdd = false;
  }

  save() {
    this.inventoryService.save();
  }
}
