import { ApplicationModule, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ExternoComponent } from './externo.component';
import { ContatoModule } from './contato/contato.module';
import { ContratoModule } from './contrato/contrato.module';
import { ProjetoModule } from './projeto/projeto.module';
import { ExternoRoutingModule } from './externo-routing.module';
import { LayoutModule } from 'src/app/core/layout/layout.module';
import { LoadingModule } from 'src/app/shared/components/loading/loading.module';
import { SnackbarModule } from 'src/app/shared/components/snackbar/snackbar.module';



@NgModule({
  declarations: [
    ExternoComponent
  ],
  imports: [
    CommonModule,
    ExternoRoutingModule,
    LayoutModule,
    LoadingModule,
    SnackbarModule
  ]
})
export class ExternoModule { }
