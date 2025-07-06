import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Skill, SkillSaveData } from '../../../models/skill';
import { DataService } from '../../../services/data.service';
import { Special } from '../../../models/special';

@Component({
  selector: 'app-skills',
  standalone: false,
  templateUrl: './skills.component.html',
  styleUrl: './skills.component.scss'
})
export class SkillsComponent implements OnInit {
  readonly STORAGE_NAME = "Skills";
  readonly DEF_TAG_COUNT = 3;
  readonly DEF_RANK_POINTS = 9;

  skills: Skill[] = [];

  @Input() special: Special = new Special();
  @Input() level: number = 0;
  @Output() skillChanged = new EventEmitter<Skill[]>();

  get availableTagCount(): number { return this.DEF_TAG_COUNT; }
  get tagCount(): number { return this.skills.filter(x => x.isTagged).length; }

  get availableRankPoints(): number { return this.DEF_RANK_POINTS + this.special.intelligence + this.level + this.tagCount * 2; }
  get totalRankPoints(): number {
    var total = 0;
    this.skills.forEach(x => total += x.ranks);
    return total;
  }
  get maxRank(): number { return this.level >= 3 ? 6 : 3; }

  constructor(private dataService: DataService) {
    this.skills = this.dataService.skills;

    var storedData = localStorage.getItem(this.STORAGE_NAME);
    if (storedData) {
      var storedSkills = JSON.parse(storedData);
      this.skills.forEach(skill => {
        var saved = storedSkills.find((x: SkillSaveData) => x.name == skill.name);
        skill.isTagged = saved.isTagged;
        skill.ranks = saved.ranks;
      });
    }
  }

  ngOnInit(): void {
    this.skillChanged.emit(this.skills);
  }

  onTagChanged(skill: Skill) {
    if (skill.isTagged && skill.ranks < 2) {
      skill.ranks = 2;
    }

    this.onSkillChange();
  }

  onSkillChange() {
    localStorage.setItem(this.STORAGE_NAME, JSON.stringify(this.skills.map(x => new SkillSaveData(x))));
    this.skillChanged.emit(this.skills);
  }

  decreaseRank(skill: Skill) {
    if (skill.ranks <= skill.minRank) {
      return;
    }
    skill.ranks--;
    this.onSkillChange();
  }

  increaseRank(skill: Skill) {
    if (skill.ranks >= this.maxRank) {
      return;
    }
    skill.ranks++;
    this.onSkillChange();
  }
}
