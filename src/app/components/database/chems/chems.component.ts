import { AfterViewInit, Component, TemplateRef, ViewChild } from '@angular/core';
import { DataService } from '../../../services/data.service';
import { InventoryService } from '../../../services/inventory.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatIcon } from '@angular/material/icon';
import { Chem } from '../../../models/database/chem';
import { TableColumn, FilterTypeEnum } from '../../common/table/table-column';
import { TableComponent } from '../../common/table/table.component';

@Component({
  selector: 'app-chems',
  templateUrl: './chems.component.html',
  styleUrl: './chems.component.scss',
  imports: [TableComponent, MatIcon]
})
export class ChemsComponent implements AfterViewInit {
  get chems(): Chem[] { return this.dataService.chems; }

  tableColumns: TableColumn<Chem>[] = [
    new TableColumn<Chem>({
      label: "Name",
      property: "name",
      filterType: FilterTypeEnum.Text,
    }),
    new TableColumn<Chem>({
      label: "Effects",
      property: "effects",
      filterType: FilterTypeEnum.Text,
    }),
    new TableColumn<Chem>({
      label: "Duration",
      property: "duration",
      filterType: FilterTypeEnum.Select,
    }),
    new TableColumn<Chem>({
      label: "Addictive?",
      property: "addictive",
      filterType: FilterTypeEnum.Sort,
      align: "center",
      getText: (chem) => { return chem.addictive > 0 ? 'Yes ' + chem.addictive  : 'No' }
    }),
    new TableColumn<Chem>({
      label: "Cost",
      property: "cost",
      filterType: FilterTypeEnum.Sort,
      align: "right"
    }),
    new TableColumn<Chem>({
      label: "Rarity",
      property: "rarity",
      filterType: FilterTypeEnum.Sort,
      align: "right"
    }),
    new TableColumn<Chem>({
      label: "Owned",
      property: "add",
      filterType: FilterTypeEnum.None,
    }),
  ];

  sortProperties = ["name"];

  @ViewChild('add') addTemplate?: TemplateRef<any>;

  constructor(private dataService: DataService, private inventoryService: InventoryService, private snackBar: MatSnackBar) { }

  getOwnedCount(chem: Chem): number {
    return this.inventoryService.inventory.chems.find(x => x.item.name == chem.name)?.amount ?? 0;
  }

  addToInventory(chem: Chem) {
    this.inventoryService.addItem(chem, "chems", ["name"]);
    this.snackBar.open(`Added "${chem.name}" to inventory.`, undefined, { duration: 2000 });
  }

  ngAfterViewInit(): void {
    let addColumn = this.tableColumns.find(x => x.property == "add");
    if (addColumn)
      addColumn.template = this.addTemplate;
  }

}
