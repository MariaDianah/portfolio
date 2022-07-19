import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CaixaComponent } from './caixa.component';



@NgModule({
  declarations: [CaixaComponent],
  imports: [
    CommonModule
  ],
  exports: [CaixaComponent]
})
export class CaixaModule { }
