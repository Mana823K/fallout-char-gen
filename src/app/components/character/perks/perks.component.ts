import { AfterContentInit, Component, Input, OnDestroy } from '@angular/core';
import { MatIcon } from '@angular/material/icon';
import { MatTooltip } from '@angular/material/tooltip';
import { CommonModule } from '@angular/common';
import { Perk } from '../../../models/character/perk';
import { Character } from '../../../models/character/character';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-perks',
  templateUrl: './perks.component.html',
  styleUrl: './perks.component.scss',
  imports: [CommonModule, MatIcon, MatTooltip]
})
export class PerksComponent implements AfterContentInit, OnDestroy {
  @Input() character = new Character();

  get perks(): Perk[] { return this.character.perks; };
  availablePerks: Perk[] = [];

  get ranksUsed(): number {
    let sum = 0;
    this.perks.forEach(x => { sum += x.ranks; });
    return sum;
  }
  get isLimitReached(): boolean { return this.ranksUsed >= this.character.level; }

  showAll: boolean = false;
  showDetails: boolean = false;

  subs: Subscription[] = [];

  ngAfterContentInit(): void {
    this.subs.push(this.character.perksSub.subscribe(() => this.orderPerks()));
  }

  ngOnDestroy(): void {
    this.subs.forEach(x => x.unsubscribe());
  }

  perkSelected(perk: Perk) {
    if (!perk.isAvailable || (this.isLimitReached && !perk.isSelected))
      return;

    perk.ranks = perk.isSelected ? 0 : 1;

    this.character.onChange();
    this.orderPerks();
  }

  orderPerks() {
    this.perks.sort((a, b) => {
      if (a.isAvailable && !b.isAvailable)
        return -1;
      else if (!a.isAvailable && b.isAvailable)
        return 1;

      if (a.isSelected && !b.isSelected)
        return -1;
      else if (!a.isSelected && b.isSelected)
        return 1;

      return a.name.localeCompare(b.name);
    });

    this.availablePerks = this.perks.filter(x => x.isAvailable);
  }

  addRank(perk: Perk) {
    perk.ranks++;
    this.character.onChange();
  }

  removeRank(perk: Perk) {
    perk.ranks--;

    this.character.onChange();
    if (perk.ranks == 0) {
      this.orderPerks();
    }
  }

  isAddRankDisabled(perk: Perk): boolean {
    return perk.ranks == perk.maxRanks || this.character.level < perk.requirements.level + perk.levelSteps * perk.ranks || this.isLimitReached;
  }
}
