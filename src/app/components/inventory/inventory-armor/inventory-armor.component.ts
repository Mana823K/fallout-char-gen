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
import { MatIcon } from '@angular/material/icon';

@Component({
  selector: 'app-inventory-armor',
  imports: [TableComponent, AmountCellComponent, NumberInputComponent, InputComponent, SelectComponent, MatIcon],
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
  @ViewChild('equip') equipTemplate?: TemplateRef<any>;
  @ViewChild('table') table?: TableComponent<InventoryItem<Armor>>;

  isSelect: boolean = false;
  isAdd: boolean = false;
  newItem = new InventoryItem<Armor>(new Armor());

  get types(): string[] { return this.dataService.armorTypes; }
  get locations(): string[] { return this.dataService.armorCoverLocations.filter(x => !this.newItem.item.locationCovered.includes(x)); }

  headCoverCl: number = 0;
  armsCoverCl: number = 0;
  torsoCoverCl: number = 0;
  legsCoverCl: number = 0;
  headCover: number = 0;
  armsCover: number = 0;
  torsoCover: number = 0;
  legsCover: number = 0;

  constructor(private inventoryService: InventoryService, private dataService: DataService) {
    this.sort();
    this.updateCoverCount();
  }

  ngAfterViewInit(): void {
    let amountColumn = this.inventoryTableColumns.find(x => x.property == "amount");
    if (amountColumn)
      amountColumn.template = this.amountTemplate;

    let equipColumn = this.inventoryTableColumns.find(x => x.property == "equip");
    if (equipColumn)
      equipColumn.template = this.equipTemplate;
  }

  sort() {
    this.armor.sort((a, b) => {
      if (a.isEquipped == b.isEquipped) {
        return a.item.name > b.item.name ? 1 : -1;
      }
      else {
        return a.isEquipped ? -1 : 1;
      }
    });
  }

  updateCoverCount() {
    let head = this.armor.filter(x => x.isEquipped && x.item.locationCovered.includes("Head"));
    this.headCover = head.filter(x => x.item.type != "Clothing").length;
    this.headCoverCl = head.filter(x => x.item.type == "Clothing").length;

    let arms = this.armor.filter(x => x.isEquipped && x.item.locationCovered.includes("Arms"));
    this.armsCover = arms.filter(x => x.item.type != "Clothing").length;
    this.armsCoverCl = arms.filter(x => x.item.type == "Clothing").length;

    let torso = this.armor.filter(x => x.isEquipped && x.item.locationCovered.includes("Torso"));
    this.torsoCover = torso.filter(x => x.item.type != "Clothing").length;
    this.torsoCoverCl = torso.filter(x => x.item.type == "Clothing").length;

    let legs = this.armor.filter(x => x.isEquipped && x.item.locationCovered.includes("Legs"));
    this.legsCover = legs.filter(x => x.item.type != "Clothing").length;
    this.legsCoverCl = legs.filter(x => x.item.type == "Clothing").length;
  }

  selectItem(item: Armor) {
    this.inventoryService.addItem(item, "armor", ["name"]);
    this.sort();
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
    this.sort();
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

  equipArmor(item: InventoryItem<Armor>) {
    item.isEquipped = !item.isEquipped;

    this.sort();
    this.save();
    this.table?.renderRows();
    this.updateCoverCount();
  }
}
