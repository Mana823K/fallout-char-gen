import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import * as _ from 'lodash';
import { FormsModule } from '@angular/forms';
import { MatCheckbox } from '@angular/material/checkbox';
import { InputComponent } from '../../form/input/input.component';
import { NumberInputComponent } from '../../form/number-input/number-input.component';
import { SelectComponent } from '../../form/select/select.component';
import { SortCellComponent } from '../../form/sort-cell/sort-cell.component';
import { CommonModule } from '@angular/common';
import { EditTypeEnum, FilterTypeEnum, TableColumn } from './table-column';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrl: './table.component.scss',
  imports: [InputComponent, NumberInputComponent, SelectComponent, SortCellComponent, CommonModule, FormsModule, MatCheckbox]
})
export class TableComponent<T> implements OnInit {
  private _items: T[] = [];
  get items(): T[] { return this._items; }
  @Input() set items(value: T[]) {
    this._items = value;
    this.renderRows();
  }
  @Input() columns: TableColumn<T>[] = [];
  @Input() sortProperties: string[] = [];
  @Input() editable: boolean = false;
  @Input() addable: boolean = false;
  @Input() newItemFactory?: () => T;

  @Output() rowClicked = new EventEmitter<T>();
  @Output() edited = new EventEmitter<T>();
  @Output() added = new EventEmitter<T>();

  displayedItems: T[] = [];

  isAdding: boolean = false;
  newItem?: T;

  FilterTypeEnum = FilterTypeEnum;
  EditTypeEnum = EditTypeEnum;

  ngOnInit(): void {
    this.renderRows();
  }

  isEditingRow(item: T): boolean {
    return (item as any).isEditingRow === true;
  }

  startEdit(item: T) {
    (item as any).isEditingRow = true;
  }

  confirmEdit(item: T) {
    (item as any).isEditingRow = false;
    this.edited.emit(item);
    this.renderRows();
  }

  startAdd() {
    this.newItem = this.newItemFactory ? this.newItemFactory() : ({} as T);
    this.isAdding = true;
  }

  cancelAdd() {
    this.isAdding = false;
    this.newItem = undefined;
  }

  confirmAdd() {
    if (!this.newItem)
      return;
    this.added.emit(this.newItem);
    this.isAdding = false;
    this.newItem = undefined;
  }

  onEditKeydown(event: Event, item: T) {
    if (!this.isEditingRow(item))
      return;
    event.preventDefault();
    this.confirmEdit(item);
  }

  onAddKeydown(event: Event) {
    event.preventDefault();
    this.confirmAdd();
  }

  private editKey(column: TableColumn<T>): string {
    return column.editProperty ?? column.property;
  }

  getEditValue(item: T, column: TableColumn<T>): any {
    return _.get(item, this.editKey(column));
  }

  setEditValue(item: T, column: TableColumn<T>, value: any) {
    _.set(item as object, this.editKey(column), value);
  }

  availableEditOptions(item: T, column: TableColumn<T>): string[] {
    let selected: string[] = _.get(item, this.editKey(column)) ?? [];
    return column.editOptions.filter(x => !selected.includes(x));
  }

  addEditValue(item: T, column: TableColumn<T>, value: string) {
    if (!value)
      return;
    let selected: string[] = _.get(item, this.editKey(column)) ?? [];
    if (!selected.includes(value))
      selected.push(value);
  }

  removeEditValue(item: T, column: TableColumn<T>, value: string) {
    let selected: string[] = _.get(item, this.editKey(column)) ?? [];
    _.set(item as object, this.editKey(column), selected.filter(x => x != value));
  }

  renderRows() {
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
