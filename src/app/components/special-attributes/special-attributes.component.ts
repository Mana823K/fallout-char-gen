import { Component } from '@angular/core';
import { CharacterService } from '../../services/character.service';
import { Character } from '../../models/character';

@Component({
  selector: 'app-special-attributes',
  standalone: false,
  templateUrl: './special-attributes.component.html',
  styleUrl: './special-attributes.component.scss'
})
export class SpecialAttributesComponent {
  get character(): Character { return this.characterService.character; }
  set character(value: Character) { this.characterService.character = value; }

  constructor(private characterService: CharacterService) { }
}
