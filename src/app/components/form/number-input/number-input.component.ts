import { Component, ElementRef, EventEmitter, Input, Output, ViewChild } from '@angular/core';

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

  @ViewChild("input") input?: ElementRef;

  onChange(value: number) {
    if (this.min != undefined && value < this.min)
      value = this.min;
    if (this.max != undefined && value > this.max)
      value = this.max;

    if (this.input?.nativeElement)
      this.input.nativeElement.value = value
    this.valueChange.emit(value);
  }
}
