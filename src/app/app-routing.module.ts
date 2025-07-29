import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CharacterComponent } from './components/character/character.component';
import { WeaponsComponent } from './components/database/weapons/weapons.component';
import { DatabaseComponent } from './components/database/database.component';
import { ModsComponent } from './components/database/mods/mods.component';
import { ArmorComponent } from './components/database/armor/armor.component';
import { ItemsComponent } from './components/database/items/items.component';
import { AmmoComponent } from './components/database/ammo/ammo.component';

const routes: Routes = [
  { path: '', redirectTo: 'character', pathMatch: 'full' },
  { path: 'character', component: CharacterComponent },
  { path: 'database', redirectTo: 'database/weapons' },
  { path: 'database', component: DatabaseComponent, children: [
    { path: 'weapons', component: WeaponsComponent },
    { path: 'ammo', component: AmmoComponent },
    { path: 'mods', component: ModsComponent },
    { path: 'armor', component: ArmorComponent },
    { path: 'items', component: ItemsComponent }
  ] },
  { path: '**', redirectTo: '' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
