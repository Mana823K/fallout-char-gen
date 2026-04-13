import { Component, Input } from '@angular/core';
import { DataService } from '../../../services/data.service';
import { Origin } from '../../../models/character/origin';
import { SelectComponent } from '../../form/select/select.component';
import { FormsModule } from '@angular/forms';
import { Character } from '../../../models/character/character';

@Component({
  selector: 'app-origin',
  templateUrl: './origin.component.html',
  styleUrl: './origin.component.scss',
  imports: [SelectComponent, FormsModule]
})
export class OriginComponent {
  get options(): string[] { return this.dataService.origins.map(x => x.name); }

  get origin(): Origin | undefined { return this.character.origin; }
  set origin(value: string) { this.character.origin = this.dataService.origins.find(x => x.name == value) ?? this.dataService.origins[0] ?? new Origin(); }

  @Input() character = new Character();

  constructor(private dataService: DataService) { }
}
