import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { MatIcon } from '@angular/material/icon';

@Component({
  selector: 'app-sort-td',
  templateUrl: './sort-cell.component.html',
  styleUrl: './sort-cell.component.scss',
  imports: [CommonModule, MatIcon]
})
export class SortCellComponent {
  @Input() value?: boolean;
  @Output() valueChange = new EventEmitter<boolean | undefined>();

  onSort() {
    this.value = this.value == undefined ? true : this.value == true ? false : undefined;
    this.valueChange.emit(this.value);
  }
}
