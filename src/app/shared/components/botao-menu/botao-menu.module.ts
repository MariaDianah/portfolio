import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BotaoMenuComponent } from './botao-menu.component';
import { InlineSVGModule } from 'ng-inline-svg';



@NgModule({
  declarations: [BotaoMenuComponent],
  imports: [
    CommonModule,
    InlineSVGModule
  ],
  exports: [BotaoMenuComponent]
})
export class BotaoMenuModule { }
