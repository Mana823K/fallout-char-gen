import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Special, SpecialData } from '../../models/special';

@Component({
  selector: 'app-special-attributes',
  standalone: false,
  templateUrl: './special-attributes.component.html',
  styleUrl: './special-attributes.component.scss'
})
export class SpecialAttributesComponent implements OnInit {
  readonly STORAGE_NAME = "Special";
  special: Special = new Special();

  @Output() specialChanged = new EventEmitter<Special>();

  constructor() {
    var specialData = localStorage.getItem(this.STORAGE_NAME);
    this.special = specialData ? Special.map(JSON.parse(specialData)) : new Special();
  }

  ngOnInit(): void {
    this.specialChanged.emit(this.special);
  }

  onSpecialChanged() {
    localStorage.setItem(this.STORAGE_NAME, JSON.stringify(new SpecialData(this.special)));
    this.specialChanged.emit(this.special);
  }
}
