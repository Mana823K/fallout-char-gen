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
  get options(): Origin[] { return this.dataService.origins; }
  get selectedOrigin(): Origin  { return this.characterService.character.origin; }
  set selectedOrigin(value: string) { this.characterService.character.origin = this.options.find(x => x.name == value) ?? new Origin() }

  constructor(private dataService: DataService, private characterService: CharacterService) { }
}
