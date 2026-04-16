import { Component, EventEmitter, Input, Output } from '@angular/core';
import { InventoryItem } from '../../../models/inventory/inventory';
import { NumberInputComponent } from '../../form/number-input/number-input.component';

@Component({
  selector: 'app-amount-cell',
  imports: [NumberInputComponent],
  templateUrl: './amount-cell.component.html',
  styleUrl: './amount-cell.component.scss'
})
export class AmountCellComponent<T> {
  @Input() item!: InventoryItem<T>;
  @Input() index: number = 0;

  @Output() changed = new EventEmitter<void>();
  @Output() itemRemoved = new EventEmitter<void>();

  increaseAmount() {
    this.item.amount++;
    this.changed.emit();
  }

  decreaseAmount() {
    this.item.amount--;
    if (this.item.amount < 1) {
      this.itemRemoved.emit();
    }
    this.changed.emit();
  }

  confirmEdit() {
    this.item.isEditing = false;
    if (this.item.amount == 0) {
      this.itemRemoved.emit()
    }
    this.changed.emit();
  }
}
