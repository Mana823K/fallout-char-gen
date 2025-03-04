import { Component } from '@angular/core';
import { Skill } from '../../models/skill';
import { DataService } from '../../services/data.service';

@Component({
  selector: 'app-skills',
  standalone: false,
  templateUrl: './skills.component.html',
  styleUrl: './skills.component.scss'
})
export class SkillsComponent {
  skills: Skill[] = [];

  constructor(private dataService: DataService) {
    this.skills = this.dataService.skills;
  }
}
