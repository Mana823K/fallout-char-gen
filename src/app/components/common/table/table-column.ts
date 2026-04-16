import { TemplateRef } from "@angular/core";
import _ from "lodash";

export class TableColumn<T> {
  label: string = "";
  property: string = "";
  filterType?: FilterTypeEnum;
  filterText: string = "";
  options: string[] = [];
  isArray: boolean = false;
  isAscending?: boolean;
  align: "left" | "center" | "right" = "left";
  template?: TemplateRef<any>;

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