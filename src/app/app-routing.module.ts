import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CharacterComponent } from './components/character/character.component';
import { WeaponsComponent } from './components/database/weapons/weapons.component';
import { DatabaseComponent } from './components/database/database.component';
import { WeaponModsComponent } from './components/database/weapon-mods/weapon-mods.component';
import { ArmorComponent } from './components/database/armor/armor.component';
import { AmmoComponent } from './components/database/ammo/ammo.component';
import { ArmorModsComponent } from './components/database/armor-mods/armor-mods.component';
import { ConsumablesComponent } from './components/database/consumables/consumables.component';
import { MagazinesComponent } from './components/database/magazines/magazines.component';
import { MiscellanyComponent } from './components/database/miscellany/miscellany.component';

const routes: Routes = [
  { path: '', redirectTo: 'character', pathMatch: 'full' },
  { path: 'character', component: CharacterComponent },
  { path: 'database', redirectTo: 'database/weapons' },
  { path: 'database', component: DatabaseComponent, children: [
    { path: 'weapons', component: WeaponsComponent },
    { path: 'ammo', component: AmmoComponent },
    { path: 'weapon-mods', component: WeaponModsComponent },
    { path: 'armor', component: ArmorComponent },
    { path: 'armor-mods', component: ArmorModsComponent },
    // { path: 'consumables', component: ConsumablesComponent },
    // { path: 'magazines', component: MagazinesComponent },
    // { path: 'miscellany', component: MiscellanyComponent },
  ] },
  { path: '**', redirectTo: '' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
