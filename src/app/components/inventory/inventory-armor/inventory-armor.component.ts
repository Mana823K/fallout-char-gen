import { AfterViewInit, Component, TemplateRef, ViewChild } from '@angular/core';
import { Armor } from '../../../models/database/armor';
import { InventoryItem } from '../../../models/inventory/inventory';
import { InventoryService } from '../../../services/inventory.service';
import { DataService } from '../../../services/data.service';
import { invArmorColumns } from './models/armor-columns';
import { invArmorSelectColumns } from './models/armor-select-columns';
import { TableColumn } from '../../common/table/table-column';
import { TableComponent } from '../../common/table/table.component';
import { AmountCellComponent } from '../../common/amount-cell/amount-cell.component';
import { NumberInputComponent } from '../../form/number-input/number-input.component';
import { InputComponent } from '../../form/input/input.component';
import { SelectComponent } from '../../form/select/select.component';

@Component({
  selector: 'app-inventory-armor',
  imports: [TableComponent, AmountCellComponent, NumberInputComponent, InputComponent, SelectComponent],
  templateUrl: './inventory-armor.component.html',
  styleUrl: './inventory-armor.component.scss'
})
export class InventoryArmorComponent implements AfterViewInit {
  get armor(): InventoryItem<Armor>[] { return this.inventoryService.inventory.armor; }
  set armor(value: InventoryItem<Armor>[]) { this.inventoryService.inventory.armor = value; }
  get selectOptions(): Armor[] { return this.dataService.armor; }

  inventoryTableColumns: TableColumn<InventoryItem<Armor>>[] = invArmorColumns;
  selectTableColumns: TableColumn<Armor>[] = invArmorSelectColumns;
  sortProperties = ["name"];
  
  @ViewChild('amount') amountTemplate?: TemplateRef<any>;
  @ViewChild('table') table?: TableComponent<InventoryItem<Armor>>;

  isSelect: boolean = false;
  isAdd: boolean = false;
  newItem = new InventoryItem<Armor>(new Armor());

  get types(): string[] { return this.dataService.armorTypes; }
  get locations(): string[] { return this.dataService.armorCoverLocations.filter(x => !this.newItem.item.locationCovered.includes(x)); }

  constructor(private inventoryService: InventoryService, private dataService: DataService) { }
  
  ngAfterViewInit(): void {
    let amountColumn = this.inventoryTableColumns.find(x => x.property == "amount");
    if (amountColumn)
      amountColumn.template = this.amountTemplate;
  }

  selectItem(item: Armor) {
    this.inventoryService.addItem(item, "armor", ["name"]);
    this.table?.renderRows();
    this.isSelect = false;
  }

  removeItem(item: InventoryItem<Armor>) {
    this.inventoryService.removeItem(item, "armor", ["name"]);
    this.table?.renderRows();
  }

  addCustom() {
    this.newItem.isCustom = true;
    this.newItem.item.updateTexts();
    this.armor.push(this.newItem);
    this.table?.renderRows();
    this.save();
    this.cancelAddItem();
  }

  addLocation(value: string) {
    this.newItem.item.locationCovered.push(value);
  }

  removeLocation(value: string) {
    this.newItem.item.locationCovered = this.newItem.item.locationCovered.filter(x => x != value);
  }

  cancelAddItem() {
    if (this.isAdd)
      this.newItem = new InventoryItem<Armor>(new Armor());
    this.isSelect = false;
    this.isAdd = false;
  }

  save() {
    this.inventoryService.save();
  }
}
