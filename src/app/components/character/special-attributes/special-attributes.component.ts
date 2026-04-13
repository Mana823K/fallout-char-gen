import { Component, Input } from '@angular/core';
import { Special } from '../../../models/character/special';
import { CommonModule } from '@angular/common';
import { NumberInputComponent } from '../../form/number-input/number-input.component';
import { Character } from '../../../models/character/character';

@Component({
  selector: 'app-special-attributes',
  templateUrl: './special-attributes.component.html',
  styleUrl: './special-attributes.component.scss',
  imports: [CommonModule, NumberInputComponent]
})
export class SpecialAttributesComponent {
  @Input() character = new Character();  
  get special(): Special { return this.character.special; }

  get minPoints(): number { return Special.MIN_VALUE; }
  get maxPoints(): number { return Special.MAX_VALUE; }
  get pointsLeft(): number { return Special.MAX_POINTS + this.character.extraSpecialPoints - this.special.pointsSum; }


  onSpecialChanged() {
    this.character.onChange();
  }
}
