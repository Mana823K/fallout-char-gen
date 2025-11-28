import { Component, Input } from '@angular/core';
import * as _ from 'lodash';

@Component({
  selector: 'app-table',
  standalone: false,
  templateUrl: './table.component.html',
  styleUrl: './table.component.scss'
})
export class TableComponent<T> {
  @Input() items: T[] = [];
  @Input() columns: TableColumn<T>[] = [];

  FilterTypeEnum = FilterTypeEnum;
}

export class TableColumn<T> {
  label: string = "";
  property: string = "";
  filterType?: FilterTypeEnum;
  filterText: string = "";
  options: [] = [];
  isAscending?: boolean;
  align: "left" | "center" | "right" = "left";

  filterFunc: (items: T[]) => T[] = (items) => {
    return items.filter(x => _.get(x, this.property) == this.filterText)
  };
  
  sortFunc: (items: T[]) => void = (items) => {
    if (this.isAscending != undefined) {
      items.sort((a, b) => this.isAscending ? _.get(a, this.property) - _.get(b, this.property) : _.get(b, this.property) - _.get(a, this.property));
    }
  };

  getText: (item: T) => string = (item) => {
    return _.get(item, this.property);
  }
}

export enum FilterTypeEnum {
  Text,
  Sort,
  Select,
  YesNo
}