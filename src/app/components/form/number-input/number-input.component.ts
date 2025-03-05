import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-number-input',
  standalone: false,
  templateUrl: './number-input.component.html',
  styleUrl: './number-input.component.scss'
})
export class NumberInputComponent {
  @Input() value: number = 0;
  @Output() valueChange = new EventEmitter<number>();
  @Input() inputName!: string;
  @Input() min?: number;
  @Input() max?: number;

  onChange(value: number) {
    if (this.min != undefined && this.value < this.min)
      this.value = this.min;
    if (this.max != undefined && this.value > this.max)
      this.value = this.max;
    this.valueChange.emit(value);

    // todo: fix
  }
}
