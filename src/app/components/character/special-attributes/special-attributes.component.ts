import { Component } from '@angular/core';
import { Special } from '../../../models/character/special';
import { CommonModule } from '@angular/common';
import { NumberInputComponent } from '../../form/number-input/number-input.component';
import { Character } from '../../../models/character/character';
import { CharacterService } from '../../../services/character.service';

@Component({
  selector: 'app-special-attributes',
  templateUrl: './special-attributes.component.html',
  styleUrl: './special-attributes.component.scss',
  imports: [CommonModule, NumberInputComponent]
})
export class SpecialAttributesComponent {
  get character(): Character { return this.characterService.character; }
  get special(): Special { return this.character.special; }

  get minPoints(): number { return Special.MIN_VALUE; }
  get maxPoints(): number { return Special.MAX_VALUE; }
  get pointsLeft(): number { return Special.MAX_POINTS + this.characterService.extraSpecialPoints - this.special.pointsSum; }

  constructor(private characterService: CharacterService) { }

  onSpecialChanged() {
    this.characterService.onChange();
  }
}
