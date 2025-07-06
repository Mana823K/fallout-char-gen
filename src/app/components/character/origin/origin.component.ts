import { Component, EventEmitter, Output } from '@angular/core';
import { DataService } from '../../../services/data.service';
import { Origin } from '../../../models/origin';

@Component({
  selector: 'app-origin',
  standalone: false,
  templateUrl: './origin.component.html',
  styleUrl: './origin.component.scss'
})
export class OriginComponent {
  readonly STORAGE_NAME = "Origin";
  get options(): string[] { return this.dataService.origins.map(x => x.name); }

  _origin: Origin = new Origin();
  get origin(): Origin  { return this._origin; }
  set origin(value: string) { this._origin = this.dataService.origins.find(x => x.name == value) ?? this.dataService.origins[0] ?? new Origin(); }

  @Output() originChanged = new EventEmitter<Origin>();

  constructor(private dataService: DataService) {
    this.origin = localStorage.getItem(this.STORAGE_NAME) ?? "";
    this.originChanged.emit(this.origin);
  }

  onOriginChanged() {
    localStorage.setItem(this.STORAGE_NAME, this.origin.name);
    this.originChanged.emit(this.origin);
  }
}
