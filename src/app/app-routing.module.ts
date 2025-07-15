import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CharacterComponent } from './components/character/character.component';
import { WeaponsComponent } from './components/weapons/weapons.component';

const routes: Routes = [
  { path: '', redirectTo: 'character', pathMatch: 'full' },
  { path: 'character', component: CharacterComponent },
  { path: 'weapons', component: WeaponsComponent },
  { path: '**', redirectTo: '' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
