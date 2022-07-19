import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PaginaNaoEncontradaComponent } from './shared/components/pagina-nao-encontrada/pagina-nao-encontrada.component';

const routes: Routes = [
  {
    path: '',
    loadChildren: () => import('./feature/externo/externo.module').then((m) => m.ExternoModule)
  },
  {
    path: '',
    redirectTo: '',
    pathMatch: 'full'
  },
  {
    path: '**',
    component: PaginaNaoEncontradaComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
