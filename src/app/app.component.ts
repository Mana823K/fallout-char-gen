import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { InventoryService } from './services/inventory.service';
import { CharacterService } from './services/character.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  standalone: false,
  styleUrl: './app.component.scss'
})
export class AppComponent {
  get selectedTab(): string { return this.router.url.split("/")[1] ?? ""; }

  constructor(private router: Router, private inventoryService: InventoryService, private characterService: CharacterService) {
    characterService.init();
    this.inventoryService.init();
  }

  navigateTo(path: string) {
    this.router.navigate([path]);
  }
}
