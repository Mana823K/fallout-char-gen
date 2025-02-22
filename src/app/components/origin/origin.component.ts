import { Component } from '@angular/core';
import { DataService } from '../../services/data.service';
import { Origin } from '../../models/origin';
import { CharacterService } from '../../services/character.service';

@Component({
  selector: 'app-origin',
  standalone: false,
  templateUrl: './origin.component.html',
  styleUrl: './origin.component.scss'
})
export class OriginComponent {
  get options(): string[] { return this.dataService.origins.map(x => x.name); }
  get origin(): Origin  { return this.characterService.origin; }
  set origin(value: string) { this.characterService.origin = this.dataService.origins.find(x => x.name == value) ?? new Origin() }

  constructor(private dataService: DataService, private characterService: CharacterService) { }

}
