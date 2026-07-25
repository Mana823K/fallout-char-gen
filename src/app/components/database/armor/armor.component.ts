import { AfterViewInit, Component, TemplateRef, ViewChild } from '@angular/core';
import { Armor } from '../../../models/database/armor';
import { DataService } from '../../../services/data.service';
import { InventoryService } from '../../../services/inventory.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatIcon } from '@angular/material/icon';
import { TableColumn, FilterTypeEnum } from '../../common/table/table-column';
import { TableComponent } from '../../common/table/table.component';

@Component({
  selector: 'app-armor',
  templateUrl: './armor.component.html',
  styleUrl: './armor.component.scss',
  imports: [TableComponent, MatIcon]
})
export class ArmorComponent implements AfterViewInit {
  get armor(): Armor[] { return this.dataService.armor; }

  tableColumns: TableColumn<Armor>[] = [
    new TableColumn<Armor>({
      label: "Name",
      property: "name",
      filterType: FilterTypeEnum.Text,
    }),
    new TableColumn<Armor>({
      label: "Type",
      property: "type",
      filterType: FilterTypeEnum.Select,
    }),
    new TableColumn<Armor>({
      label: "Physical Resistance",
      property: "physicalRes",
      filterType: FilterTypeEnum.Sort,
      align: "right",
      getText: (piece) => { return piece.physicalRes > 0 ? piece.physicalRes == 999 ? 'Immune' : piece.physicalRes.toString() : '-' }
    }),
    new TableColumn<Armor>({
      label: "Energy Resistance",
      property: "energyRes",
      filterType: FilterTypeEnum.Sort,
      align: "right",
      getText: (piece) => { return piece.energyRes > 0 ? piece.energyRes == 999 ? 'Immune' : piece.energyRes.toString() : '-' }
    }),
    new TableColumn<Armor>({
      label: "Radiation Resistance",
      property: "radiationRes",
      filterType: FilterTypeEnum.Sort,
      align: "right",
      getText: (piece) => { return piece.radiationRes > 0 ? piece.radiationRes == 999 ? 'Immune' : piece.radiationRes.toString() : '-' }
    }),
    new TableColumn<Armor>({
      label: "Locations Covered",
      property: "locationCoveredText",
      filterType: FilterTypeEnum.Select,
    }),
    new TableColumn<Armor>({
      label: "Weight",
      property: "weight",
      filterType: FilterTypeEnum.Sort,
    }),
    new TableColumn<Armor>({
      label: "Cost",
      property: "cost",
      filterType: FilterTypeEnum.Sort,
    }),
    new TableColumn<Armor>({
      label: "Rarity",
      property: "rarity",
      filterType: FilterTypeEnum.Sort,
    }),
    new TableColumn<Armor>({
      label: "Owned",
      property: "add",
      filterType: FilterTypeEnum.None,
    }),
  ];

  sortProperties = ["type", "name"];

  @ViewChild('add') addTemplate?: TemplateRef<any>;

  constructor(private dataService: DataService, private inventoryService: InventoryService, private snackBar: MatSnackBar) { }

  getOwnedCount(armor: Armor): number {
    return this.inventoryService.inventory.armor.find(x => x.item.name == armor.name)?.amount ?? 0;
  }

  addToInventory(armor: Armor) {
    this.inventoryService.addItem(armor, "armor", ["name"]);
    this.snackBar.open(`Added "${armor.name}" to inventory.`, undefined, { duration: 2000 });
  }

  ngAfterViewInit(): void {
    let addColumn = this.tableColumns.find(x => x.property == "add");
    if (addColumn)
      addColumn.template = this.addTemplate;
  }

}
