import { NgModule } from '@angular/core';
import { BrowserModule, provideClientHydration, withEventReplay } from '@angular/platform-browser';
import { MatIconModule } from '@angular/material/icon';
import { MatCheckboxModule } from '@angular/material/checkbox';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SpecialAttributesComponent } from './components/special-attributes/special-attributes.component';
import { SkillsComponent } from './components/skills/skills.component';
import { StatsComponent } from './components/stats/stats.component';
import { PerksComponent } from './components/perks/perks.component';
import { OriginComponent } from './components/origin/origin.component';

@NgModule({
  declarations: [
    AppComponent,
    SpecialAttributesComponent,
    SkillsComponent,
    StatsComponent,
    PerksComponent,
    OriginComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    MatIconModule,
    MatCheckboxModule
  ],
  providers: [
    provideClientHydration(withEventReplay())
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
