import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { Inventory } from '../../models/inventory/inventory';
import { InventoryService } from '../../services/inventory.service';
import { CharacterService } from '../../services/character.service';

@Component({
  selector: 'app-inventory',
  imports: [RouterModule, CommonModule],
  templateUrl: './inventory.component.html',
  styleUrl: './inventory.component.scss'
})
export class InventoryComponent {
  inventory = new Inventory();

  get inventoryWeight(): number { return this.inventoryService.weight; }
  get carryWeight(): number { return this.characterService.character.stats.carryWeight; }

  get selectedTable(): string { return this.router.url.split("/").pop() ?? ""; }

  constructor(private router: Router,
              private route: ActivatedRoute,
              private inventoryService: InventoryService,
              private characterService: CharacterService) { }

  navigateTo(path: string) {
    this.router.navigate([path], {relativeTo: this.route});
  }

}
