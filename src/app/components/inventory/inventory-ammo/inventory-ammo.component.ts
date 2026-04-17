import { AfterViewInit, Component, TemplateRef, ViewChild } from '@angular/core';
import { InventoryItem } from '../../../models/inventory/inventory';
import { Ammo } from '../../../models/database/ammo';
import { TableColumn } from '../../common/table/table-column';
import { TableComponent } from '../../common/table/table.component';
import { invAmmoColumns } from './models/ammo-columns';
import { invAmmoSelectColumns } from './models/ammo-select-columns';
import { DataService } from '../../../services/data.service';
import { InventoryService } from '../../../services/inventory.service';
import { AmountCellComponent } from '../../common/amount-cell/amount-cell.component';

@Component({
  selector: 'app-inventory-ammo',
  imports: [TableComponent, AmountCellComponent],
  templateUrl: './inventory-ammo.component.html',
  styleUrl: './inventory-ammo.component.scss'
})
export class InventoryAmmoComponent implements AfterViewInit {
  get ammo(): InventoryItem<Ammo>[] { return this.inventoryService.inventory.ammo; }
  set ammo(value: InventoryItem<Ammo>[]) { this.inventoryService.inventory.ammo = value; }
  get ammoOptions(): Ammo[] { return this.dataService.ammo; }
  
  ammoTableColumns: TableColumn<InventoryItem<Ammo>>[] = invAmmoColumns;
  ammoSelectTableColumns: TableColumn<Ammo>[] = invAmmoSelectColumns;
  isSelectAmmo: boolean = false;
  @ViewChild('ammoAmount') ammoAmountTemplate?: TemplateRef<any>;
  @ViewChild('ammoTable') ammoTable?: TableComponent<InventoryItem<Ammo>>;

  constructor(private inventoryService: InventoryService, private dataService: DataService) { }

  ngAfterViewInit(): void {
    let amountColumnAmmo = this.ammoTableColumns.find(x => x.property == "amount");
    if (amountColumnAmmo)
      amountColumnAmmo.template = this.ammoAmountTemplate;
  }

  selectAmmo(ammo: Ammo) {
    this.inventoryService.addItem(ammo, "ammo", ["name", "subType"]);
    this.ammoTable?.renderRows();
    this.isSelectAmmo = false;
  }

  removeAmmo(item: InventoryItem<Ammo>) {
    this.inventoryService.removeItem(item, "ammo", ["name", "subType"]);
    this.ammoTable?.renderRows();
  }

  save() {
    this.inventoryService.save();
  }
}
