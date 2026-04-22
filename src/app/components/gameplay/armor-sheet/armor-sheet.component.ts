import { Component } from '@angular/core';
import { GameplayService } from '../../../services/gameplay.service';
import { GameplayState } from '../../../models/gameplay/gameplay-state';
import { Armor } from '../../../models/database/armor';
import { InventoryService } from '../../../services/inventory.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-armor-sheet',
  imports: [],
  templateUrl: './armor-sheet.component.html',
  styleUrl: './armor-sheet.component.scss'
})
export class ArmorSheetComponent {
  get state(): GameplayState { return this.gameplayService.state; }
  armor: Armor[];

  constructor(private gameplayService: GameplayService, private inventoryService: InventoryService, private router: Router) {
    this.armor = this.inventoryService.inventory.armor.filter(x => x.isEquipped).map(x => x.item);
  }

  save() {
    this.gameplayService.save();
  }

  navigateToInventory() {
    this.router.navigate(["inventory", "armor"]);
  }
}
