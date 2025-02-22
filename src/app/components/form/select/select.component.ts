import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-select',
  standalone: false,
  templateUrl: './select.component.html',
  styleUrl: './select.component.scss'
})
export class SelectComponent {
  @Input() options: string[] = [];
  @Input() value: string = "";
  @Output() valueChange = new EventEmitter<string>();
  @Input() inputName!: string;


}
