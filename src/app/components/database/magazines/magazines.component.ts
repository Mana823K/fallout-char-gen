import { AfterViewInit, Component, TemplateRef, ViewChild } from '@angular/core';
import { DataService } from '../../../services/data.service';
import { InventoryService } from '../../../services/inventory.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatIcon } from '@angular/material/icon';
import { TableColumn, FilterTypeEnum } from '../../common/table/table-column';
import { TableComponent } from '../../common/table/table.component';
import { Magazine } from '../../../models/database/magazine';

@Component({
  selector: 'app-magazines',
  templateUrl: './magazines.component.html',
  styleUrl: './magazines.component.scss',
  imports: [TableComponent, MatIcon]
})
export class MagazinesComponent implements AfterViewInit {
  get magazines(): Magazine[] { return this.dataService.magazines; }

  tableColumns: TableColumn<Magazine>[] = [
    new TableColumn<Magazine>({
      label: "Name",
      property: "name",
      filterType: FilterTypeEnum.Text,
    }),
    new TableColumn<Magazine>({
      label: "Roll",
      property: "roll",
      filterType: FilterTypeEnum.None,
      align: "right"
    }),
    new TableColumn<Magazine>({
      label: "Rare",
      property: "rare",
      filterType: FilterTypeEnum.YesNo,
      align: "center",
      getText: (magazine) => { return magazine.rare ? 'Yes' : 'No'; }
    }),
    new TableColumn<Magazine>({
      label: "Issues",
      property: "issue",
      filterType: FilterTypeEnum.Text,
    }),
    new TableColumn<Magazine>({
      label: "Issue roll",
      property: "issueRoll",
      filterType: FilterTypeEnum.None,
    }),
    new TableColumn<any>({
      label: "Effect",
      property: "effect",
      filterType: FilterTypeEnum.Text,
    }),
    new TableColumn<Magazine>({
      label: "Owned",
      property: "add",
      filterType: FilterTypeEnum.None,
    }),
  ];

  sortProperties = [];

  @ViewChild('add') addTemplate?: TemplateRef<any>;

  constructor(private dataService: DataService, private inventoryService: InventoryService, private snackBar: MatSnackBar) { }

  getOwnedCount(magazine: Magazine): number {
    return this.inventoryService.inventory.magazines.find(x => x.item.name == magazine.name)?.amount ?? 0;
  }

  addToInventory(magazine: Magazine) {
    this.inventoryService.addItem(magazine, "magazines", ["name"]);
    this.snackBar.open(`Added "${magazine.name}" to inventory.`, undefined, { duration: 2000 });
  }

  ngAfterViewInit(): void {
    let addColumn = this.tableColumns.find(x => x.property == "add");
    if (addColumn)
      addColumn.template = this.addTemplate;
  }

}
