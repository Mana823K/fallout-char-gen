import { NgModule } from '@angular/core';
import { BrowserModule, provideClientHydration, withEventReplay } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatSelectModule } from '@angular/material/select';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SpecialAttributesComponent } from './components/special-attributes/special-attributes.component';
import { SkillsComponent } from './components/skills/skills.component';
import { StatsComponent } from './components/stats/stats.component';
import { PerksComponent } from './components/perks/perks.component';
import { OriginComponent } from './components/origin/origin.component';
import { SelectComponent } from './components/form/select/select.component';

@NgModule({
  declarations: [
    AppComponent,
    SpecialAttributesComponent,
    SkillsComponent,
    StatsComponent,
    PerksComponent,
    OriginComponent,
    SelectComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    MatIconModule,
    MatCheckboxModule,
    MatSelectModule,
    FormsModule
  ],
  providers: [
    provideClientHydration(withEventReplay())
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
