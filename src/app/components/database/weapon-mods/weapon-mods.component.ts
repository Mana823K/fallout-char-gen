import { Component } from '@angular/core';
import { DataService } from '../../../services/data.service';
import { WeaponMod } from '../../../models/weapon-mod';

@Component({
  selector: 'app-mods',
  standalone: false,
  templateUrl: './weapon-mods.component.html',
  styleUrl: './weapon-mods.component.scss'
})
export class WeaponModsComponent {
  get weaponMods(): WeaponMod[] { return this.dataService.weaponMods; }

  constructor(private dataService: DataService) { }

}
