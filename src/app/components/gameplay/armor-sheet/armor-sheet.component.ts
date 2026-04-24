import { Component } from '@angular/core';
import { GameplayService } from '../../../services/gameplay.service';
import { GameplayState } from '../../../models/gameplay/gameplay-state';
import { EquippedArmor } from '../../../models/gameplay/equipped-armor';
import { Armor } from '../../../models/database/armor';
import { InventoryItem } from '../../../models/inventory/inventory';
import { InventoryService } from '../../../services/inventory.service';
import { CombatState } from '../../../models/gameplay/combat-state';

@Component({
  selector: 'app-armor-sheet',
  imports: [],
  templateUrl: './armor-sheet.component.html',
  styleUrl: './armor-sheet.component.scss'
})
export class ArmorSheetComponent {
  readonly legOnlyLocations = ["Legs"];
  readonly armOnlyLocations = ["Arms"];
  readonly oneSidedLocations = [this.legOnlyLocations, this.armOnlyLocations];
  
  get armor(): EquippedArmor[] { return this.gameplayService.state.armor; }
  get combatSate(): CombatState { return this.gameplayService.state.combatState; }
  get availableArmor(): InventoryItem<Armor>[] { return this.inventoryService.inventory.armor; }

  isEdit: boolean = false;

  constructor(private gameplayService: GameplayService, private inventoryService: InventoryService) { }

  save() {
    this.gameplayService.save();
  }

  editArmor() {
    this.isEdit = true;
  }
}
