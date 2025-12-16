import { Component, Input, OnInit } from '@angular/core';
import * as _ from 'lodash';
import { InputComponent } from '../../form/input/input.component';
import { SelectComponent } from '../../form/select/select.component';
import { SortCellComponent } from '../../form/sort-cell/sort-cell.component';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrl: './table.component.scss',
  imports: [InputComponent, SelectComponent, SortCellComponent, CommonModule]
})
export class TableComponent<T> implements OnInit {
  @Input() items: T[] = [];
  @Input() columns: TableColumn<T>[] = [];
  @Input() sortProperties: string[] = [];

  displayedItems: T[] = [];
  
  FilterTypeEnum = FilterTypeEnum;
  
  ngOnInit(): void {
    this.displayedItems = this.items.slice();
    this.sort();
    this.setFilterOptions();
  }

  filter() {
    let result = this.items.slice();

    for (var column of this.columns) {
      if (column.filterText.length == 0)
        continue;

      if (column.filterFunc) {
        result = column.filterFunc(result);
      }
      else {
        switch (column.filterType) {
          case FilterTypeEnum.Text:
            result = result.filter(x => _.get(x, column.property).toLowerCase().includes(column.filterText.toLowerCase()));    
            break;
          case FilterTypeEnum.Select:
            if (column.filterText.length > 0) {
              if (column.isArray)
                result = result.filter(x => _.get(x, column.property).includes(column.filterText));
              else
                result = result.filter(x => _.get(x, column.property) == column.filterText);
            }
            break;
          case FilterTypeEnum.YesNo:
            // todo
            break;      
          default:
            break;
        }
      }
    }

    this.displayedItems = result;
  }

  setFilterOptions() {
    for (var column of this.columns) {
      if (this.items[0] != undefined)
        column.isArray = _.isArray(_.get(this.items[0], column.property));

      if (column.filterType == FilterTypeEnum.Select) {
        if (column.isArray)
          column.options = [...new Set(['', ...this.items.flatMap(x => _.get(x, column.property))])];
        else
          column.options = [...new Set(['', ...this.items.map(x => _.get(x, column.property))])];

      }
    }
  }

  defaultSort(a: T, b: T): number {
    for (let property of this.sortProperties) {
      let aValue = _.get(a, property);
      let bValue = _.get(b, property);
      
      if (aValue != bValue) {
        return aValue > bValue ? 1 : -1;
      }
    }
    return 0;
  }


  sort() {
    if (this.sortProperties.length > 0)
      this.displayedItems.sort(this.defaultSort.bind(this));
    
    for (var colunm of this.columns) {
      if (colunm.filterType == FilterTypeEnum.Sort && colunm.isAscending != undefined) {
        this.displayedItems.sort((a,b) => colunm.sortFunc(a,b) * (colunm.isAscending ? 1 : -1));
      }
    }
  }
}

export class TableColumn<T> {
  label: string = "";
  property: string = "";
  filterType?: FilterTypeEnum;
  filterText: string = "";
  options: string[] = [];
  isArray: boolean = false;
  isAscending?: boolean;
  align: "left" | "center" | "right" = "left";

  filterFunc?: (items: T[]) => T[];
  
  /** for ascending */
  sortFunc: (a: T, b: T) => number = (a,b) => {
    return _.get(a, this.property) - _.get(b, this.property);
  }

  getText: (item: T) => string = (item) => {
    let value = _.get(item, this.property);
    return this.isArray ? value.join(", ") : value;
  }

  constructor(params: Partial<TableColumn<T>>) {
    Object.assign(this, params);
  }
}

export enum FilterTypeEnum {
  Text,
  Sort,
  Select,
  YesNo,
  None
}