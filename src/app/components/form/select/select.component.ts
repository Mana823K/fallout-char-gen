import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-select',
  templateUrl: './select.component.html',
  styleUrl: './select.component.scss',
  imports: [CommonModule, FormsModule]
})
export class SelectComponent {
  @Input() options: string[] = [];
  @Input() value: string = "";
  @Output() valueChange = new EventEmitter<string>();
  @Input() inputName!: string;
}
