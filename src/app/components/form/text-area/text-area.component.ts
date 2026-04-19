import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-text-area',
  templateUrl: './text-area.component.html',
  styleUrl: './text-area.component.scss',
  imports: [FormsModule]
})
export class TextAreaComponent {
  @Input() value: string = "";
  @Output() valueChange = new EventEmitter<string>();
  @Input() inputName!: string;

}
