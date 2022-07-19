import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ExternoComponent } from './externo.component';
import { ExternoRoutingModule } from './externo-routing.module';
import { LayoutModule } from 'src/app/core/layout/layout.module';
import { LoadingModule } from 'src/app/shared/components/loading/loading.module';
import { SnackbarModule } from 'src/app/shared/components/snackbar/snackbar.module';
import { RodapeModule } from 'src/app/core/rodape/rodape.module';



@NgModule({
  declarations: [
    ExternoComponent
  ],
  imports: [
    CommonModule,
    ExternoRoutingModule,
    LayoutModule,
    RodapeModule,
    LoadingModule,
    SnackbarModule
  ]
})
export class ExternoModule { }
