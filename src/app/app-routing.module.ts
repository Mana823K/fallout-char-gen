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
import { ChemsComponent } from './components/database/chems/chems.component';
import { ToolsComponent } from './components/tools/tools.component';
import { WeaponModToolComponent } from './components/tools/weapon-mod-tool/weapon-mod-tool.component';
import { InventoryComponent } from './components/inventory/inventory.component';
import { InventoryWeaponsComponent } from './components/inventory/inventory-weapons/inventory-weapons.component';
import { InventoryArmorComponent } from './components/inventory/inventory-armor/inventory-armor.component';
import { InventoryConsumablesComponent } from './components/inventory/inventory-consumables/inventory-consumables.component';
import { InventoryChemsComponent } from './components/inventory/inventory-chems/inventory-chems.component';
import { InventoryMagazinesComponent } from './components/inventory/inventory-magazines/inventory-magazines.component';
import { InventoryMiscComponent } from './components/inventory/inventory-misc/inventory-misc.component';
import { ImportExportComponent } from './components/import-export/import-export.component';
import { GameplayComponent } from './components/gameplay/gameplay.component';

const routes: Routes = [
  { path: '', redirectTo: 'character', pathMatch: 'full' },
  { path: 'character', component: CharacterComponent },
  // { path: 'gameplay', component: GameplayComponent },
  { path: 'inventory', redirectTo: 'inventory/weapons'},
  { path: 'inventory', component: InventoryComponent, children: [
    { path: 'weapons', component: InventoryWeaponsComponent },
    { path: 'armor', component: InventoryArmorComponent },
    { path: 'consumables', component: InventoryConsumablesComponent },
    { path: 'chems', component: InventoryChemsComponent },
    { path: 'magazines', component: InventoryMagazinesComponent },
    { path: 'miscellany', component: InventoryMiscComponent },
  ] },
  { path: 'database', redirectTo: 'database/weapons' },
  { path: 'database', component: DatabaseComponent, children: [
    { path: 'weapons', component: WeaponsComponent },
    { path: 'ammo', component: AmmoComponent },
    { path: 'weapon-mods', component: WeaponModsComponent },
    { path: 'armor', component: ArmorComponent },
    { path: 'armor-mods', component: ArmorModsComponent },
    { path: 'consumables', component: ConsumablesComponent },
    { path: 'chems', component: ChemsComponent },
    { path: 'magazines', component: MagazinesComponent },
    { path: 'miscellany', component: MiscellanyComponent },
  ] },
  { path: 'tools', redirectTo: 'tools/weapon-mod' },
  { path: 'tools', component: ToolsComponent, children: [
    { path: 'weapon-mod', component: WeaponModToolComponent },
  ] },
  { path: 'import-export', component: ImportExportComponent },
  { path: '**', redirectTo: 'character' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
