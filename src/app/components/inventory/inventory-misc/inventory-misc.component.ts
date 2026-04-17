import { AfterViewInit, Component, TemplateRef, ViewChild } from '@angular/core';
import { InventoryItem } from '../../../models/inventory/inventory';
import { MiscellanyItem } from '../../../models/database/miscellany-item';
import { DataService } from '../../../services/data.service';
import { InventoryService } from '../../../services/inventory.service';
import { TableComponent } from '../../common/table/table.component';
import { AmountCellComponent } from '../../common/amount-cell/amount-cell.component';
import { NumberInputComponent } from '../../form/number-input/number-input.component';
import { InputComponent } from '../../form/input/input.component';
import { TableColumn } from '../../common/table/table-column';
import { invMiscColumns } from './models/misc-columns';
import { invMiscSelectColumns } from './models/misc-select-columns';

@Component({
  selector: 'app-inventory-misc',
  imports: [TableComponent, AmountCellComponent, NumberInputComponent, InputComponent],
  templateUrl: './inventory-misc.component.html',
  styleUrl: './inventory-misc.component.scss'
})
export class InventoryMiscComponent implements AfterViewInit {
  get misc(): InventoryItem<MiscellanyItem>[] { return this.inventoryService.inventory.misc; }
  set misc(value: InventoryItem<MiscellanyItem>[]) { this.inventoryService.inventory.misc = value; }
  get selectOptions(): MiscellanyItem[] { return this.dataService.miscellanyItems; }

  inventoryTableColumns: TableColumn<InventoryItem<MiscellanyItem>>[] = invMiscColumns;
  selectTableColumns: TableColumn<MiscellanyItem>[] = invMiscSelectColumns;
  sortProperties = ["name"];
  
  @ViewChild('amount') amountTemplate?: TemplateRef<any>;
  @ViewChild('table') table?: TableComponent<InventoryItem<MiscellanyItem>>;

  isSelect: boolean = false;
  isAdd: boolean = false;
  newItem = new InventoryItem<MiscellanyItem>(new MiscellanyItem());

  constructor(private inventoryService: InventoryService, private dataService: DataService) { }
  
  ngAfterViewInit(): void {
    let amountColumn = this.inventoryTableColumns.find(x => x.property == "amount");
    if (amountColumn)
      amountColumn.template = this.amountTemplate;
  }

  selectItem(item: MiscellanyItem) {
    this.inventoryService.addItem(item, "misc", ["name"]);
    this.table?.renderRows();
    this.isSelect = false;
  }

  removeItem(item: InventoryItem<MiscellanyItem>) {
    this.inventoryService.removeItem(item, "misc", ["name"]);
    this.table?.renderRows();
  }

  addCustom() {
    this.newItem.isCustom = true;
    this.misc.push(this.newItem);
    this.table?.renderRows();
    this.save();
    this.cancelAddItem();
  }

  cancelAddItem() {
    if (this.isAdd)
      this.newItem = new InventoryItem<MiscellanyItem>(new MiscellanyItem());
    this.isSelect = false;
    this.isAdd = false;
  }

  save() {
    this.inventoryService.save();
  }

}
