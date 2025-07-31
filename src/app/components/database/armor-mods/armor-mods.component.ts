import { Component } from '@angular/core';
import { DataService } from '../../../services/data.service';
import { ArmorMod } from '../../../models/armor-mod';

@Component({
  selector: 'app-armor-mods',
  standalone: false,
  templateUrl: './armor-mods.component.html',
  styleUrl: './armor-mods.component.scss'
})
export class ArmorModsComponent {
  get armorMods(): ArmorMod[] { return this.dataService.armorMods; }

  constructor(private dataService: DataService) { }

}
