import { AfterViewInit, Component, TemplateRef, ViewChild } from '@angular/core';
import { TableComponent } from '../../common/table/table.component';
import { AmountCellComponent } from '../../common/amount-cell/amount-cell.component';
import { NumberInputComponent } from '../../form/number-input/number-input.component';
import { InputComponent } from '../../form/input/input.component';
import { SelectComponent } from '../../form/select/select.component';
import { InventoryItem } from '../../../models/inventory/inventory';
import { Chem } from '../../../models/database/chem';
import { InventoryService } from '../../../services/inventory.service';
import { DataService } from '../../../services/data.service';
import { TableColumn } from '../../common/table/table-column';
import { invChemsColumns } from './models/chem-columns';
import { invChemsSelectColumns } from './models/chem-select-columns';

@Component({
  selector: 'app-inventory-chems',
  imports: [TableComponent, AmountCellComponent, NumberInputComponent, InputComponent, SelectComponent],
  templateUrl: './inventory-chems.component.html',
  styleUrl: './inventory-chems.component.scss'
})
export class InventoryChemsComponent implements AfterViewInit {
  get chems(): InventoryItem<Chem>[] { return this.inventoryService.inventory.chems; }
  set chems(value: InventoryItem<Chem>[]) { this.inventoryService.inventory.chems = value; }
  get selectOptions(): Chem[] { return this.dataService.chems; }

  inventoryTableColumns: TableColumn<InventoryItem<Chem>>[] = invChemsColumns;
  selectTableColumns: TableColumn<Chem>[] = invChemsSelectColumns;
  sortProperties = ["name"];
  
  @ViewChild('amount') amountTemplate?: TemplateRef<any>;
  @ViewChild('table') table?: TableComponent<InventoryItem<Chem>>;

  isSelect: boolean = false;
  isAdd: boolean = false;
  newItem = new InventoryItem<Chem>(new Chem());

  durations: string[] = ["Instant", "Lasting", "Brief"];

  constructor(private inventoryService: InventoryService, private dataService: DataService) { }
  
  ngAfterViewInit(): void {
    let amountColumn = this.inventoryTableColumns.find(x => x.property == "amount");
    if (amountColumn)
      amountColumn.template = this.amountTemplate;
  }

  selectItem(item: Chem) {
    this.inventoryService.addItem(item, "chems", ["name"]);
    this.table?.renderRows();
    this.isSelect = false;
  }

  removeItem(item: InventoryItem<Chem>) {
    this.inventoryService.removeItem(item, "chems", ["name"]);
    this.table?.renderRows();
  }

  addCustom() {
    this.newItem.isCustom = true;
    this.chems.push(this.newItem);
    this.table?.renderRows();
    this.save();
    this.cancelAddItem();
  }

  cancelAddItem() {
    if (this.isAdd)
      this.newItem = new InventoryItem<Chem>(new Chem());
    this.isSelect = false;
    this.isAdd = false;
  }

  save() {
    this.inventoryService.save();
  }
}
