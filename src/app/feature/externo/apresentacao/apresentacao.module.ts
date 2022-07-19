import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ApresentacaoComponent } from './apresentacao.component';
import { CaixaModule } from 'src/app/shared/components/caixa/caixa.module';
import { ApresentacaoRoutingModule } from './apresentacao-routing.module';



@NgModule({
  declarations: [
    ApresentacaoComponent
  ],
  imports: [
    CommonModule,
    CaixaModule,
    ApresentacaoRoutingModule
  ]
})
export class ApresentacaoModule { }
