import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ExternoComponent } from './externo.component';

const routes: Routes = [
  {
    path: '',
    component: ExternoComponent,
    children: [
      {
        path: '',
        loadChildren: () =>
        import('./apresentacao/apresentacao.module').then((m) => m.ApresentacaoModule),
      },
      {
        path: 'contato',
        loadChildren: () =>
        import('./contato/contato.module').then((m) => m.ContatoModule),
      },
      {
        path: 'contrato',
        loadChildren: () =>
        import('./contrato/contrato.module').then((m) => m.ContratoModule),
      },
      {
        path: 'projeto',
        loadChildren: () =>
        import('./projeto/projeto.module').then((m) => m.ProjetoModule),
      },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ExternoRoutingModule { }
