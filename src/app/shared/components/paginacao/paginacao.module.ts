import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PaginacaoComponent } from './paginacao.component';
import { InlineSVGModule } from 'ng-inline-svg';
import { FormsModule } from '@angular/forms';



@NgModule({
  declarations: [PaginacaoComponent],
  imports: [
    CommonModule,
    InlineSVGModule,
    FormsModule
  ],
  exports: [PaginacaoComponent]
})
export class PaginacaoModule { }
