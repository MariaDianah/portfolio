import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BotaoPesquisaInputComponent } from './botao-pesquisa-input.component';
import { InlineSVGModule } from 'ng-inline-svg';



@NgModule({
  declarations: [BotaoPesquisaInputComponent],
  imports: [
    CommonModule,
    InlineSVGModule
  ],
  exports: [BotaoPesquisaInputComponent]
})
export class BotaoPesquisaInputModule { }
