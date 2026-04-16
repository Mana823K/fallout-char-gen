import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { Inventory } from '../../models/inventory/inventory';
import { DataService } from '../../services/data.service';
import { InventoryService } from '../../services/inventory.service';

@Component({
  selector: 'app-inventory',
  imports: [RouterModule, CommonModule],
  templateUrl: './inventory.component.html',
  styleUrl: './inventory.component.scss'
})
export class InventoryComponent {
  inventory = new Inventory();

  get selectedTable(): string { return this.router.url.split("/").pop() ?? ""; }

  constructor(private router: Router, private route: ActivatedRoute, private inventoryService: InventoryService) {
    this.inventoryService.init();
  }

  navigateTo(path: string) {
    this.router.navigate([path], {relativeTo: this.route});
  }

}
