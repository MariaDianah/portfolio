import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MensagemComponent } from './mensagem.component';
import { InlineSVGModule } from 'ng-inline-svg';



@NgModule({
  declarations: [
    MensagemComponent
  ],
  imports: [
    CommonModule,
    InlineSVGModule
  ],
  exports: [
    MensagemComponent
  ]
})
export class MensagemModule { }
