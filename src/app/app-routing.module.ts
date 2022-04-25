import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PokemonDetailComponent } from './pages/pokemon-detail/pokemon-detail.component';
import { TopComponent } from './pages/top/top.component';

const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    component: TopComponent,
  },
  {
    path: 'pokemon/:id',
    component: PokemonDetailComponent,
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
