import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MensagemValidacaoDirective } from './mensagem-validacao.directive';



@NgModule({
  declarations: [MensagemValidacaoDirective],
  imports: [
    CommonModule
  ],
  exports: [MensagemValidacaoDirective]
})
export class MensagemValidacaoModule { }
