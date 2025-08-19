import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-sort-td',
  standalone: false,
  templateUrl: './sort-cell.component.html',
  styleUrl: './sort-cell.component.scss'
})
export class SortCellComponent {
  @Input() value?: boolean;
  @Output() valueChange = new EventEmitter<boolean | undefined>();

  onSort() {
    this.value = this.value == undefined ? true : this.value == true ? false : undefined;
    this.valueChange.emit(this.value);
  }
}
