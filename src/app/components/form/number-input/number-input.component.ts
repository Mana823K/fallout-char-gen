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
  @Input() label?: string;
  @Input() inputName!: string;
  @Input() min?: number;
  @Input() max?: number;

  @ViewChild("input") input?: ElementRef;

  onChange(event: any) {
    let value = Number(event.target.value);
    if (this.min != undefined && value < this.min)
      this.value = this.min;
    else if (this.max != undefined && value > this.max)
      this.value = this.max;
    else
      this.value = value;

    if (this.input?.nativeElement)
      this.input.nativeElement.value = this.value;

    this.valueChange.emit(this.value);
  }
}
