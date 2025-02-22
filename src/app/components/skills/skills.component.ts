import { Component } from '@angular/core';
import { CharacterService } from '../../services/character.service';
import { Skill } from '../../models/skill';

@Component({
  selector: 'app-skills',
  standalone: false,
  templateUrl: './skills.component.html',
  styleUrl: './skills.component.scss'
})
export class SkillsComponent {
  get skills(): Skill[] { return this.characterService.skills; }
  set skills(value: Skill[]) { this.characterService.skills = value; }

  constructor(private characterService: CharacterService) { }
}
