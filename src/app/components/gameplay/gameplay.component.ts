import { Component } from '@angular/core';
import { LevelSheetComponent } from "./level-sheet/level-sheet.component";
import { SpecialSheetComponent } from "./special-sheet/special-sheet.component";
import { SkillsSheetComponent } from "./skills-sheet/skills-sheet.component";
import { CombatSheetComponent } from "./combat-sheet/combat-sheet.component";
import { WeaponSheetComponent } from "./weapon-sheet/weapon-sheet.component";
import { ArmorSheetComponent } from "./armor-sheet/armor-sheet.component";
import { PerksSheetComponent } from "./perks-sheet/perks-sheet.component";
import { GameplayService } from '../../services/gameplay.service';

@Component({
  selector: 'app-gameplay',
  imports: [LevelSheetComponent, SpecialSheetComponent, SkillsSheetComponent, CombatSheetComponent, WeaponSheetComponent, ArmorSheetComponent, PerksSheetComponent],
  templateUrl: './gameplay.component.html',
  styleUrl: './gameplay.component.scss'
})
export class GameplayComponent {

  constructor(private gameplayService: GameplayService) {
    this.gameplayService.updateCombatState();
  }
}
