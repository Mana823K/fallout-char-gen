import { Component } from '@angular/core';
import { StatsComponent } from './stats/stats.component';
import { PerksComponent } from './perks/perks.component';
import { OriginComponent } from './origin/origin.component';
import { NumberInputComponent } from '../form/number-input/number-input.component';
import { SpecialAttributesComponent } from './special-attributes/special-attributes.component';
import { SkillsComponent } from './skills/skills.component';
import { CommonModule } from '@angular/common';
import { Character } from '../../models/character/character';
import { CharacterService } from '../../services/character.service';

@Component({
  selector: 'app-character',
  templateUrl: './character.component.html',
  styleUrl: './character.component.scss',
  imports: [CommonModule, OriginComponent, NumberInputComponent, StatsComponent, SpecialAttributesComponent, PerksComponent, SkillsComponent]
})
export class CharacterComponent {
  get character(): Character { return this.characterService.character; }

  constructor(private characterService: CharacterService) { }
}