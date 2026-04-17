import { Component } from '@angular/core';
import { Skill } from '../../../models/character/skill';
import { CommonModule } from '@angular/common';
import { NumberInputComponent } from '../../form/number-input/number-input.component';
import { MatCheckbox } from '@angular/material/checkbox';
import { FormsModule } from '@angular/forms';
import { MatIcon } from "@angular/material/icon";
import { Character } from '../../../models/character/character';
import { CharacterService } from '../../../services/character.service';

@Component({
  selector: 'app-skills',
  templateUrl: './skills.component.html',
  styleUrl: './skills.component.scss',
  imports: [CommonModule, NumberInputComponent, MatCheckbox, FormsModule, MatIcon]
})
export class SkillsComponent {
  get character(): Character { return this.characterService.character; }

  get skills(): Skill[] { return this.character.skills; }

  get availableTagCount(): number { return Skill.TAG_COUNT + this.characterService.extraSkillTags; }
  get tagCount(): number { return this.skills.filter(x => x.isTagged).length; }

  get availableRankPoints(): number { 
    return Skill.RANK_POINTS + this.character.special.intelligence 
    + this.character.level + this.tagCount * 2 + this.characterService.extraSkillRanks;
  }
  get totalRankPoints(): number {
    var total = 0;
    this.skills.forEach(x => total += x.ranks);
    return total;
  }
  get maxRank(): number { return this.character.level >= 3 ? Skill.MAX_RANK : Skill.STARTER_MAX_RANK; }

  constructor(private characterService: CharacterService) { }

  onTagChanged(skill: Skill) {
    if (skill.isTagged && skill.ranks < Skill.TAG_MIN_RANK) {
      skill.ranks = Skill.TAG_MIN_RANK;
    }

    this.onSkillChange();
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

  onSkillChange() {
    this.characterService.onChange();
  }
}
