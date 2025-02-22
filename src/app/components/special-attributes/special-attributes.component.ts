import { Component } from '@angular/core';
import { CharacterService } from '../../services/character.service';
import { Special } from '../../models/special';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-special-attributes',
  standalone: false,
  templateUrl: './special-attributes.component.html',
  styleUrl: './special-attributes.component.scss'
})
export class SpecialAttributesComponent {
  get special(): Special { return this.characterService.special; }

  constructor(private characterService: CharacterService) { }
}
