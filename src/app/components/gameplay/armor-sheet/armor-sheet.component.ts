import { Component } from '@angular/core';
import { GameplayService } from '../../../services/gameplay.service';
import { GameplayState } from '../../../models/gameplay/gameplay-state';
import { Armor } from '../../../models/database/armor';

@Component({
  selector: 'app-armor-sheet',
  imports: [],
  templateUrl: './armor-sheet.component.html',
  styleUrl: './armor-sheet.component.scss'
})
export class ArmorSheetComponent {
  get state(): GameplayState { return this.gameplayService.state; }
  get armor(): Armor[] { return this.gameplayService.state.armor; }

  constructor(private gameplayService: GameplayService) { }

  save() {
    this.gameplayService.save();
  }

}
