import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatSelectModule } from '@angular/material/select';
import { MatTooltipModule } from '@angular/material/tooltip';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SpecialAttributesComponent } from './components/character/special-attributes/special-attributes.component';
import { SkillsComponent } from './components/character/skills/skills.component';
import { StatsComponent } from './components/character/stats/stats.component';
import { PerksComponent } from './components/character/perks/perks.component';
import { OriginComponent } from './components/character/origin/origin.component';
import { SelectComponent } from './components/form/select/select.component';
import { InputComponent } from './components/form/input/input.component';
import { NumberInputComponent } from './components/form/number-input/number-input.component';
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

@NgModule({
  declarations: [
    AppComponent,
    SpecialAttributesComponent,
    SkillsComponent,
    StatsComponent,
    PerksComponent,
    OriginComponent,
    SelectComponent,
    InputComponent,
    NumberInputComponent,
    CharacterComponent,
    WeaponsComponent,
    DatabaseComponent,
    WeaponModsComponent,
    ArmorComponent,
    AmmoComponent,
    ArmorModsComponent,
    ConsumablesComponent,
    MagazinesComponent,
    MiscellanyComponent,
    ChemsComponent,
    ToolsComponent,
    WeaponModToolComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    MatIconModule,
    MatCheckboxModule,
    MatSelectModule,
    FormsModule,
    MatTooltipModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
