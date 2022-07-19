import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BotaoSwitchComponent } from './botao-switch.component';
import { InlineSVGModule } from 'ng-inline-svg';



@NgModule({
  declarations: [BotaoSwitchComponent],
  imports: [
    CommonModule,
    InlineSVGModule
  ],
  exports: [BotaoSwitchComponent]
})
export class BotaoSwitchModule { }
