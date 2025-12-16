import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-input',
  templateUrl: './input.component.html',
  styleUrl: './input.component.scss',
  imports: [FormsModule]
})
export class InputComponent {
  @Input() value: string = "";
  @Output() valueChange = new EventEmitter<string>();
  @Input() inputName!: string;
}
